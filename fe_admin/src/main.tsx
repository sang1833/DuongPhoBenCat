import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import App from "./App.tsx";
import "./css/style.css";
import "./css/leafletConfig.css";
import initializeApp from "./app/init";
import i18n from "./locales/i18n";

initializeApp();

createRoot(document.getElementById("root")!).render(
  <I18nextProvider i18n={i18n}>
    <App />
  </I18nextProvider>
);
