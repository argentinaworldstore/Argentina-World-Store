import "dotenv/config";

import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import crypto from "node:crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT || 3000);
const PUBLIC_URL = String(
  process.env.PUBLIC_URL || `http://localhost:${PORT}`
).replace(/\/$/, "");

const PAYPAL_ENVIRONMENT =
  String(process.env.PAYPAL_ENVIRONMENT || "live").toLowerCase();

const PAYPAL_API =
  PAYPAL_ENVIRONMENT === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

app.disable("x-powered-by");
app.use(express.json({ limit: "1mb" }));
app.use(express.static(__dirname));

function loadProducts() {
  const source = fs.readFileSync(
    path.join(__dirname, "productos.js"),
    "utf8"
  );

  return JSON.parse(
    source
      .replace(/^\s*window\.PRODUCTOS\s*=\s*/, "")
      .replace(/;\s*$/, "")
  );
}

const products = loadProducts();
const productsById = new Map(
  products.map((product) => [String(product.id), product])
);

function normalizeCart(rawItems) {
  if (!Array.isArray(rawItems) || rawItems.length === 0) {
    throw new Error("El carrito está vacío.");
  }

  return rawItems.map((item) => {
    const product = productsById.get(String(item.id));

    if (!product) {
      throw new Error(`Producto inválido: ${item.id}`);
    }

    const quantity = Math.max(
      1,
      Math.min(99, Math.floor(Number(item.quantity) || 1))
    );

    return { product, quantity };
  });
}

function getArgentinaPrice(product) {
  const price = Number(product.basePriceARS);

  if (!Number.isFinite(price) || price <= 0) {
    throw new Error(
      `${product.name} no tiene un precio argentino válido.`
    );
  }

  return price;
}

function getForeignPriceARS(product) {
  const price = Number(
    product.foreignPriceARS ||
    Number(product.basePriceARS || 0) * 2
  );

  if (!Number.isFinite(price) || price <= 0) {
    throw new Error(
      `${product.name} no tiene un precio exterior válido.`
    );
  }

  return price;
}

function getUsdRate() {
  const rate = Number(process.env.ARS_PER_USD);

  if (!Number.isFinite(rate) || rate <= 0) {
    throw new Error(
      "Configurá ARS_PER_USD en el archivo .env."
    );
  }

  return rate;
}

function paypalMoney(value) {
  return (Math.round(value * 100) / 100).toFixed(2);
}

async function getPayPalAccessToken() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_CLIENT_SECRET;

  if (
    !clientId ||
    !secret ||
    clientId.includes("PEGAR_") ||
    secret.includes("PEGAR_") ||
    clientId.includes("TU_") ||
    secret.includes("TU_")
  ) {
    throw new Error(
      "Faltan PAYPAL_CLIENT_ID y PAYPAL_CLIENT_SECRET en .env."
    );
  }

  const credentials = Buffer.from(
    `${clientId}:${secret}`
  ).toString("base64");

  const response = await fetch(
    `${PAYPAL_API}/v1/oauth2/token`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type":
          "application/x-www-form-urlencoded"
      },
      body: "grant_type=client_credentials"
    }
  );

  const data = await response.json();

  if (!response.ok || !data.access_token) {
    throw new Error(
      data.error_description ||
      "PayPal no aceptó las credenciales."
    );
  }

  return data.access_token;
}



app.get("/api/auth-config", (_request, response) => {
  const supabaseUrl = String(process.env.SUPABASE_URL || "").trim();
  const supabasePublishableKey = String(
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    ""
  ).trim();

  response.json({
    supabaseUrl,
    supabasePublishableKey,
    configured: Boolean(
      supabaseUrl &&
      supabasePublishableKey &&
      !supabaseUrl.includes("TU_") &&
      !supabasePublishableKey.includes("TU_") &&
      !supabaseUrl.includes("PEGAR_") &&
      !supabasePublishableKey.includes("PEGAR_")
    )
  });
});

app.get("/api/store-config", (_request, response) => {
  const arsPerUsd = Number(process.env.ARS_PER_USD);
  const paypalConfigured = Boolean(
    process.env.PAYPAL_CLIENT_ID &&
    process.env.PAYPAL_CLIENT_SECRET &&
    !process.env.PAYPAL_CLIENT_ID.includes("TU_") &&
    !process.env.PAYPAL_CLIENT_SECRET.includes("TU_") &&
    !process.env.PAYPAL_CLIENT_ID.includes("PEGAR_") &&
    !process.env.PAYPAL_CLIENT_SECRET.includes("PEGAR_")
  );

  response.json({
    currency: "USD",
    arsPerUsd:
      Number.isFinite(arsPerUsd) && arsPerUsd > 0
        ? arsPerUsd
        : null,
    paypalEnvironment: PAYPAL_ENVIRONMENT,
    paypalConfigured
  });
});

app.get("/api/health", (_request, response) => {
  response.json({
    ok: true,
    store: "Argentina World Store",
    mercadoPago: "production",
    paypal: PAYPAL_ENVIRONMENT,
    products: products.length
  });
});

/* =========================
   MERCADO PAGO — ARGENTINA
   ========================= */

app.post(
  "/api/checkout/mercadopago",
  async (request, response) => {
    try {
      const token =
        process.env.MP_ACCESS_TOKEN ||
        process.env.MERCADOPAGO_ACCESS_TOKEN;

      if (
        !token ||
        token.includes("PEGAR_") ||
        token.includes("TU_")
      ) {
        return response.status(503).json({
          error:
            "Falta MP_ACCESS_TOKEN de producción en .env."
        });
      }

      const countryCode = String(
        request.body?.countryCode || "AR"
      ).toUpperCase();

      if (countryCode !== "AR") {
        return response.status(400).json({
          error:
            "Mercado Pago está habilitado para Argentina."
        });
      }

      const cart = normalizeCart(request.body?.items);

      const preference = {
        items: cart.map(({ product, quantity }) => ({
          id: String(product.id),
          title: String(product.name),
          quantity,
          currency_id: "ARS",
          unit_price: getArgentinaPrice(product)
        })),
        external_reference:
          `AWS-MP-${Date.now()}-${crypto
            .randomBytes(3)
            .toString("hex")}`,
        statement_descriptor: "ARG WORLD STORE"
      };

      /*
       * Las URLs automáticas se agregan cuando PUBLIC_URL
       * es una dirección HTTPS publicada.
       */
      if (PUBLIC_URL.startsWith("https://")) {
        preference.back_urls = {
          success:
            `${PUBLIC_URL}/pago-resultado.html?provider=mercadopago&result=success`,
          pending:
            `${PUBLIC_URL}/pago-resultado.html?provider=mercadopago&result=pending`,
          failure:
            `${PUBLIC_URL}/pago-resultado.html?provider=mercadopago&result=failure`
        };

        preference.auto_return = "approved";
        preference.notification_url =
          `${PUBLIC_URL}/api/webhooks/mercadopago`;
      }

      const mpResponse = await fetch(
        "https://api.mercadopago.com/checkout/preferences",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(preference)
        }
      );

      const data = await mpResponse.json();

      if (!mpResponse.ok) {
        throw new Error(
          data?.message ||
          "Mercado Pago rechazó la preferencia."
        );
      }

      return response.status(201).json({
        provider: "mercadopago",
        checkoutUrl: data.init_point,
        preferenceId: data.id
      });
    } catch (error) {
      console.error("Mercado Pago:", error);

      return response.status(400).json({
        error:
          error instanceof Error
            ? error.message
            : "No se pudo iniciar Mercado Pago."
      });
    }
  }
);

/* =========================
   PAYPAL — EXTERIOR EN USD
   ========================= */

app.post(
  "/api/checkout/paypal",
  async (request, response) => {
    try {
      const countryCode = String(
        request.body?.countryCode || "US"
      ).toUpperCase();

      if (countryCode === "AR") {
        return response.status(400).json({
          error:
            "Para Argentina corresponde Mercado Pago."
        });
      }

      const cart = normalizeCart(request.body?.items);
      const arsPerUsd = getUsdRate();

      const itemTotalUsd = cart.reduce(
        (sum, { product, quantity }) =>
          sum +
          (getForeignPriceARS(product) / arsPerUsd) *
            quantity,
        0
      );

      const amount = paypalMoney(itemTotalUsd);

      if (Number(amount) <= 0) {
        throw new Error(
          "El total exterior no es válido."
        );
      }

      const accessToken =
        await getPayPalAccessToken();

      const orderReference =
        `AWS-PP-${Date.now()}-${crypto
          .randomBytes(3)
          .toString("hex")}`;

      const paypalResponse = await fetch(
        `${PAYPAL_API}/v2/checkout/orders`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            "PayPal-Request-Id": orderReference
          },
          body: JSON.stringify({
            intent: "CAPTURE",
            purchase_units: [
              {
                reference_id: orderReference,
                description:
                  "Compra en Argentina World Store",
                amount: {
                  currency_code: "USD",
                  value: amount
                }
              }
            ],
            payment_source: {
              paypal: {
                experience_context: {
                  brand_name:
                    "Argentina World Store",
                  user_action: "PAY_NOW",
                  shipping_preference:
                    "GET_FROM_FILE",
                  return_url:
                    `${PUBLIC_URL}/paypal-retorno.html`,
                  cancel_url:
                    `${PUBLIC_URL}/pago-resultado.html?provider=paypal&result=cancelled`
                }
              }
            }
          })
        }
      );

      const data = await paypalResponse.json();

      if (!paypalResponse.ok) {
        throw new Error(
          data?.message ||
          "PayPal rechazó la orden."
        );
      }

      const approvalUrl = data.links?.find(
        (link) =>
          link.rel === "payer-action" ||
          link.rel === "approve"
      )?.href;

      if (!approvalUrl) {
        throw new Error(
          "PayPal no devolvió el enlace de aprobación."
        );
      }

      return response.status(201).json({
        provider: "paypal",
        orderId: data.id,
        checkoutUrl: approvalUrl,
        currency: "USD",
        amount
      });
    } catch (error) {
      console.error("PayPal:", error);

      return response.status(400).json({
        error:
          error instanceof Error
            ? error.message
            : "No se pudo iniciar PayPal."
      });
    }
  }
);

app.post(
  "/api/paypal/capture/:orderId",
  async (request, response) => {
    try {
      const orderId = String(
        request.params.orderId || ""
      ).trim();

      if (!orderId) {
        return response.status(400).json({
          error: "Falta el número de orden PayPal."
        });
      }

      const accessToken =
        await getPayPalAccessToken();

      const paypalResponse = await fetch(
        `${PAYPAL_API}/v2/checkout/orders/${encodeURIComponent(
          orderId
        )}/capture`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            "PayPal-Request-Id":
              `CAPTURE-${orderId}`
          },
          body: "{}"
        }
      );

      const data = await paypalResponse.json();

      if (!paypalResponse.ok) {
        throw new Error(
          data?.message ||
          "No se pudo capturar el pago PayPal."
        );
      }

      if (data.status !== "COMPLETED") {
        throw new Error(
          `PayPal devolvió el estado ${data.status}.`
        );
      }

      return response.json({
        ok: true,
        status: data.status,
        orderId: data.id,
        payer: data.payer || null,
        purchaseUnits: data.purchase_units || []
      });
    } catch (error) {
      console.error("Captura PayPal:", error);

      return response.status(400).json({
        error:
          error instanceof Error
            ? error.message
            : "No se pudo confirmar PayPal."
      });
    }
  }
);

app.post(
  "/api/webhooks/mercadopago",
  (request, response) => {
    console.log(
      "Webhook Mercado Pago:",
      request.body
    );

    response.sendStatus(200);
  }
);

app.post(
  "/api/webhooks/paypal",
  (request, response) => {
    console.log("Webhook PayPal:", request.body);
    response.sendStatus(200);
  }
);

app.listen(PORT, () => {
  console.log("");
  console.log("Argentina World Store");
  console.log(`Tienda: ${PUBLIC_URL}`);
  console.log("Argentina: Mercado Pago");
  console.log(
    `Exterior: PayPal ${PAYPAL_ENVIRONMENT.toUpperCase()} en USD`
  );
  console.log("");
});
