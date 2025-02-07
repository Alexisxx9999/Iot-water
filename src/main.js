// main.js

import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import "@fortawesome/fontawesome-free/css/all.css";
createApp(App).use(router).mount("#app");
/*  */
/* METRICAS DE SEGURIDAD PARA LA APP */

// Protección contra Clickjacking
if (window.top !== window.self) {
  console.warn("Protección contra clickjacking activada.");
  window.top.location = window.self.location;
}

// Deshabilitar consola en producción
if (process.env.NODE_ENV === "production") {
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
}
// Bloquear eval() y setTimeout con cadenas
window.eval = () => {
  throw new Error("Uso de eval() bloqueado por seguridad.");
};

window.setTimeout = (fn, delay) => {
  if (typeof fn === "string") {
    throw new Error("Uso de setTimeout() con cadenas bloqueado por seguridad.");
  }
  return setTimeout(fn, delay);
};
/* Registra errores en un sistema externo para detectar intentos de ataque. */
window.onerror = function (message, source, lineno, colno, error) {
  console.error("Error detectado:", { message, source, lineno, colno, error });
  // Puedes enviar estos errores a un servicio de monitoreo como Sentry
};
