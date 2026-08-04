import "dotenv/config";

import crypto from "node:crypto";
import cors from "cors";
import express from "express";
import {
  MercadoPagoConfig,
  Payment,
  Preference
} from "mercadopago";

const app = express();
const PORT = Number(process.env.PORT || 3000);

const FRONTEND_URL =
  process.env.FRONTEND_URL || "http://localhost:5500";

const BACKEND_URL =
  process.env.BACKEND_URL || `http://localhost:${PORT}`;

if (!process.env.MP_ACCESS_TOKEN) {
  console.error("Falta MP_ACCESS_TOKEN en backend/.env");
  process.exit(1);
}

const mercadoPagoClient = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
  options: {
    timeout: 10_000
  }
});

const preferenceClient = new Preference(mercadoPagoClient);
const paymentClient = new Payment(mercadoPagoClient);

app.disable("x-powered-by");

app.use(
  cors({
    origin(origin, callback) {
      const allowedOrigins = [
        FRONTEND_URL,
        "http://127.0.0.1:5500",
        "http://localhost:5500"
      ];

      // Permite herramientas locales sin encabezado Origin.
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error(`Origen no permitido: ${origin}`)
      );
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
  })
);

app.use(express.json({ limit: "1mb" }));

function sanitizeText(value, fallback = "") {
  if (typeof value !== "string") {
    return fallback;
  }

  return value.trim().slice(0, 250);
}

function parsePositiveInteger(value, fallback = 1) {
  const number = Number.parseInt(value, 10);

  if (!Number.isFinite(number) || number < 1) {
    return fallback;
  }

  return Math.min(number, 100);
}

function parsePositivePrice(value) {
  const number = Number(value);

  if (!Number.isFinite(number) || number <= 0) {
    throw new Error("El precio del producto no es válido");
  }

  return Math.round(number * 100) / 100;
}

function validateCartItems(items) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("El carrito está vacío");
  }

  if (items.length > 100) {
    throw new Error("El carrito tiene demasiados productos");
  }

  return items.map((item, index) => {
    const id = sanitizeText(
      String(item.id || `producto-${index + 1}`)
    );

    const title = sanitizeText(
      item.title || item.name,
      "Producto"
    );

    const description = sanitizeText(
      item.description || item.variant || ""
    );

    return {
      id,
      title,
      description,
      quantity: parsePositiveInteger(
        item.quantity ?? item.cantidad,
        1
      ),
      unit_price: parsePositivePrice(
        item.unit_price ??
        item.priceARS ??
        item.price
      ),
      currency_id: "ARS"
    };
  });
}

app.get("/", (_request, response) => {
  response.json({
    ok: true,
    service: "Argentina World Store Backend",
    mercadoPago: "configured",
    environment: process.env.NODE_ENV || "development"
  });
});

app.get("/api/health", (_request, response) => {
  response.json({
    ok: true,
    timestamp: new Date().toISOString()
  });
});

app.post(
  "/api/mercadopago/preferencia",
  async (request, response) => {
    try {
      const items = validateCartItems(request.body?.items);

      const customer = request.body?.customer || {};

      const externalReference =
        `AWS-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;

      const preferenceBody = {
        items,

        external_reference: externalReference,

        back_urls: {
          success: `${FRONTEND_URL}/pago-exitoso.html`,
          pending: `${FRONTEND_URL}/pago-pendiente.html`,
          failure: `${FRONTEND_URL}/pago-error.html`
        },

        auto_return: "approved",

        statement_descriptor: "ARGENTINA STORE",

        metadata: {
          store: "Argentina World Store",
          created_at: new Date().toISOString()
        }
      };

      if (customer.email) {
        preferenceBody.payer = {
          name: sanitizeText(customer.name),
          surname: sanitizeText(customer.surname),
          email: sanitizeText(customer.email)
        };
      }

      /*
       * Mercado Pago necesita una URL pública para enviar
       * notificaciones. En localhost se omite temporalmente.
       */
      if (
        BACKEND_URL.startsWith("https://") &&
        !BACKEND_URL.includes("localhost")
      ) {
        preferenceBody.notification_url =
          `${BACKEND_URL}/api/mercadopago/webhook`;
      }

      const preference = await preferenceClient.create({
        body: preferenceBody
      });

      return response.status(201).json({
        ok: true,
        preferenceId: preference.id,
        checkoutUrl: preference.init_point,
        sandboxCheckoutUrl: preference.sandbox_init_point,
        externalReference
      });
    } catch (error) {
      console.error(
        "Error al crear la preferencia de Mercado Pago:",
        error
      );

      return response.status(400).json({
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "No se pudo iniciar Mercado Pago"
      });
    }
  }
);

app.post(
  "/api/mercadopago/webhook",
  async (request, response) => {
    /*
     * Mercado Pago espera una respuesta rápida.
     * Contestamos primero y luego consultamos el pago.
     */
    response.sendStatus(200);

    try {
      const paymentId =
        request.query["data.id"] ||
        request.query.id ||
        request.body?.data?.id;

      if (!paymentId) {
        console.log("Webhook recibido sin ID de pago");
        return;
      }

      const payment = await paymentClient.get({
        id: paymentId
      });

      console.log("Notificación de Mercado Pago:", {
        paymentId: payment.id,
        status: payment.status,
        statusDetail: payment.status_detail,
        externalReference: payment.external_reference,
        transactionAmount: payment.transaction_amount,
        currencyId: payment.currency_id,
        payerEmail: payment.payer?.email
      });

      if (payment.status === "approved") {
        /*
         * Próximo paso:
         * guardar el pedido aprobado en una base de datos,
         * descontar stock y enviar el correo de confirmación.
         */
        console.log(
          `Pago aprobado: ${payment.external_reference}`
        );
      }
    } catch (error) {
      console.error(
        "Error procesando el webhook de Mercado Pago:",
        error
      );
    }
  }
);

app.use((error, _request, response, _next) => {
  console.error("Error del servidor:", error);

  response.status(500).json({
    ok: false,
    error: "Error interno del servidor"
  });
});

app.listen(PORT, () => {
  console.log("");
  console.log("Argentina World Store Backend");
  console.log(`Servidor: http://localhost:${PORT}`);
  console.log(`Frontend permitido: ${FRONTEND_URL}`);
  console.log("Mercado Pago: configurado");
  console.log("");
});