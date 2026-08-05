
(function () {
  "use strict";

  let client = null;
  let currentUser = null;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  function prefix() {
    return location.pathname.includes("/productos/") ||
      location.pathname.includes("/subcategorias/")
      ? "../"
      : "";
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function setMessage(text, type = "") {
    const box = $("#authMessage");
    if (!box) return;
    box.textContent = text || "";
    box.className = "auth-message";
    if (type) box.classList.add(type);
    box.hidden = !text;
  }

  function setBusy(form, busy) {
    if (!form) return;

    // No deshabilitar los campos antes de leer FormData:
    // los controles disabled no se incluyen en el formulario.
    $$("button", form).forEach((button) => {
      button.disabled = busy;
    });

    const submit = $('button[type="submit"]', form);
    if (submit) {
      submit.dataset.originalText ||= submit.textContent;
      submit.textContent = busy ? "Procesando…" : submit.dataset.originalText;
    }
  }

  function registrationFields() {
    return `
      <div class="auth-grid">
        <label class="auth-field">
          <span>Nombre</span>
          <input name="first_name" autocomplete="given-name" required>
        </label>
        <label class="auth-field">
          <span>Apellido</span>
          <input name="last_name" autocomplete="family-name" required>
        </label>
        <label class="auth-field auth-full">
          <span>Mail</span>
          <input name="email" type="email" autocomplete="email" required>
        </label>
        <label class="auth-field">
          <span>Contraseña</span>
          <input name="password" type="password" autocomplete="new-password"
                 minlength="8" required>
        </label>
        <label class="auth-field">
          <span>Repetir contraseña</span>
          <input name="password_confirmation" type="password"
                 autocomplete="new-password" minlength="8" required>
        </label>
        <label class="auth-field">
          <span>País</span>
          <input name="country" autocomplete="country-name" required>
        </label>
        <label class="auth-field">
          <span>Provincia / Estado</span>
          <input name="province_state" autocomplete="address-level1" required>
        </label>
        <label class="auth-field">
          <span>Ciudad</span>
          <input name="city" autocomplete="address-level2" required>
        </label>
        <label class="auth-field">
          <span>Código postal</span>
          <input name="postal_code" autocomplete="postal-code" required>
        </label>
        <label class="auth-field auth-full">
          <span>Calle y número</span>
          <input name="street" autocomplete="street-address" required>
        </label>
        <label class="auth-field">
          <span>Teléfono / Celular</span>
          <input name="phone" type="tel" autocomplete="tel" required>
        </label>
        <label class="auth-field">
          <span>Documento</span>
          <input name="document_number" inputmode="numeric" required>
        </label>
      </div>
      <label class="auth-consent">
        <input name="privacy_acceptance" type="checkbox" required>
        <span>Acepto que estos datos se utilicen para administrar mi cuenta,
        pedidos, pagos y envíos.</span>
      </label>
      <button class="auth-primary" type="submit">Crear cuenta</button>
      <button class="auth-secondary auth-switch-login" type="button">
        Ya tengo una cuenta
      </button>
    `;
  }

  function loginFields() {
    return `
      <label class="auth-field">
        <span>Mail</span>
        <input name="email" type="email" autocomplete="email" required>
      </label>
      <label class="auth-field">
        <span>Contraseña</span>
        <input id="loginPassword" name="password" type="password"
               autocomplete="current-password" required>
      </label>
      <label class="auth-password-row">
        <input id="showPassword" type="checkbox"> Mostrar contraseña
      </label>
      <button class="auth-link auth-forgot" type="button">
        ¿Olvidaste tu contraseña?
      </button>
      <button class="auth-primary" type="submit">Ingresar</button>
      <div class="auth-divider"></div>
      <p>¿Todavía no tenés usuario?</p>
      <button class="auth-secondary auth-switch-register" type="button">
        Registrarme
      </button>
    `;
  }

  function injectDrawer() {
    $$(".auth-drawer").forEach((drawer) => {
      drawer.innerHTML = `
        <button aria-label="Cerrar" class="auth-close" type="button">×</button>
        <section class="auth-view auth-login-view">
          <h2>Iniciar sesión</h2>
          <h3>Ingresá con tu mail y contraseña</h3>
          <form class="auth-form">${loginFields()}</form>
        </section>

        <section class="auth-view auth-register-view" hidden>
          <h2>Crear una cuenta</h2>
          <p class="auth-intro">
            Completá tus datos para facilitar compras, pagos y envíos.
          </p>
          <form class="register-form">${registrationFields()}</form>
        </section>

        <section class="auth-view auth-account-view" hidden>
          <h2>Mi cuenta</h2>
          <div class="auth-account-card">
            <strong id="accountName">Usuario</strong>
            <span id="accountEmail"></span>
          </div>
          <button class="auth-primary auth-logout" type="button">
            Cerrar sesión
          </button>
        </section>

        <p id="authMessage" class="auth-message" hidden></p>
      `;
    });
  }

  function showView(name) {
    $$(".auth-login-view").forEach((el) => (el.hidden = name !== "login"));
    $$(".auth-register-view").forEach((el) => (el.hidden = name !== "register"));
    $$(".auth-account-view").forEach((el) => (el.hidden = name !== "account"));
    setMessage("");
  }

  function updateLoginButtons(user) {
    const metadata = user?.user_metadata || {};
    const firstName = metadata.first_name || "";
    const label = user ? (firstName ? `Hola, ${firstName}` : "Mi cuenta") : "Iniciar sesión";

    $$(".login-btn").forEach((button) => {
      const textTarget = button.querySelector('[data-i18n="login"]') || button;
      if (textTarget) textTarget.textContent = label;
      button.classList.toggle("is-authenticated", Boolean(user));
    });

    $("#accountName")?.replaceChildren(
      document.createTextNode(
        [metadata.first_name, metadata.last_name].filter(Boolean).join(" ") || "Usuario"
      )
    );
    if ($("#accountEmail")) $("#accountEmail").textContent = user?.email || "";
  }

  function openAppropriateView() {
    showView(currentUser ? "account" : "login");
  }

  async function initializeClient() {
    try {
      const response = await fetch(prefix() + "api/auth-config", { cache: "no-store" });
      const config = await response.json();

      if (!config.configured) {
        setMessage(
          "Falta configurar SUPABASE_URL y SUPABASE_PUBLISHABLE_KEY en el archivo .env.",
          "error"
        );
        return;
      }

      if (!window.supabase?.createClient) {
        throw new Error("No se pudo cargar la biblioteca de Supabase.");
      }

      client = window.supabase.createClient(
        config.supabaseUrl,
        config.supabasePublishableKey,
        {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true
          }
        }
      );

      const { data } = await client.auth.getSession();
      currentUser = data.session?.user || null;
      updateLoginButtons(currentUser);

      client.auth.onAuthStateChange((_event, session) => {
        currentUser = session?.user || null;
        updateLoginButtons(currentUser);
        if (document.getElementById("authOverlay")?.classList.contains("open")) {
          openAppropriateView();
        }
      });
    } catch (error) {
      console.error("Supabase:", error);
      setMessage(error.message || "No se pudo iniciar Supabase.", "error");
    }
  }

  async function register(form) {
    if (!client) throw new Error("Supabase todavía no está configurado.");

    const values = Object.fromEntries(new FormData(form).entries());

    if (values.password !== values.password_confirmation) {
      throw new Error("Las contraseñas no coinciden.");
    }

    const clean = (value) => String(value ?? "").trim();

    const metadata = {
      first_name: clean(values.first_name),
      last_name: clean(values.last_name),
      country: clean(values.country),
      province_state: clean(values.province_state),
      city: clean(values.city),
      postal_code: clean(values.postal_code),
      street: clean(values.street),
      phone: clean(values.phone),
      document_number: clean(values.document_number)
    };

    const { data, error } = await client.auth.signUp({
      email: String(values.email ?? "").trim(),
      password: String(values.password ?? ""),
      options: {
        data: metadata,
        emailRedirectTo: `${location.origin}/index.html`
      }
    });

    if (error) throw error;

    form.reset();

    if (data.session) {
      currentUser = data.user;
      updateLoginButtons(currentUser);
      showView("account");
      setMessage("Cuenta creada correctamente.", "success");
    } else {
      showView("login");
      setMessage(
        "Cuenta creada. Revisá tu correo y confirmá el registro antes de ingresar.",
        "success"
      );
    }
  }

  async function login(form) {
    if (!client) throw new Error("Supabase todavía no está configurado.");

    const values = Object.fromEntries(new FormData(form).entries());
    const { data, error } = await client.auth.signInWithPassword({
      email: String(values.email ?? "").trim(),
      password: String(values.password ?? "")
    });

    if (error) throw error;

    currentUser = data.user;
    updateLoginButtons(currentUser);
    showView("account");
    setMessage("Sesión iniciada correctamente.", "success");
  }
    });

    if (error) throw error;
  }

  async function forgotPassword() {
    if (!client) throw new Error("Supabase todavía no está configurado.");

    const email =
      $('.auth-form input[name="email"]')?.value.trim() ||
      prompt("Ingresá tu mail");

    if (!email) return;

    const { error } = await client.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/index.html`
    });

    if (error) throw error;
    setMessage("Te enviamos un correo para restablecer la contraseña.", "success");
  }

  async function logout() {
    if (!client) return;
    const { error } = await client.auth.signOut();
    if (error) throw error;
    currentUser = null;
    updateLoginButtons(null);
    showView("login");
    setMessage("Sesión cerrada.", "success");
  }

  document.addEventListener("click", async (event) => {
    if (event.target.closest(".login-btn")) {
      setTimeout(openAppropriateView, 0);
    }

    if (event.target.closest(".auth-switch-register")) {
      showView("register");
    }

    if (event.target.closest(".auth-switch-login")) {
      showView("login");
    } catch (error) {
        setMessage(error.message, "error");
      }
    }

    if (event.target.closest(".auth-forgot")) {
      try {
        await forgotPassword();
      } catch (error) {
        setMessage(error.message, "error");
      }
    }

    if (event.target.closest(".auth-logout")) {
      try {
        await logout();
      } catch (error) {
        setMessage(error.message, "error");
      }
    }
  });

  document.addEventListener("change", (event) => {
    if (event.target.id === "showPassword") {
      const password = $("#loginPassword");
      if (password) password.type = event.target.checked ? "text" : "password";
    }
  });

  document.addEventListener("submit", async (event) => {
    if (!event.target.matches(".auth-form,.register-form")) return;

    event.preventDefault();
    const form = event.target;

    try {
      setMessage("");
      setBusy(form, true);
      if (form.matches(".register-form")) {
        await register(form);
      } else {
        await login(form);
      }
    } catch (error) {
      console.error(error);
      setMessage(error.message || "No se pudo completar la operación.", "error");
    } finally {
      setBusy(form, false);
    }
  });

  injectDrawer();
  initializeClient();
})();
