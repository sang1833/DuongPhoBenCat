import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { I18nextProvider } from "react-i18next";
import App from "./App.tsx";
import "react-toastify/dist/ReactToastify.css";
import "./css/style.css";
import "./css/leafletConfig.css";
import i18n from "./locales/i18n";
import store from "./app/store";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <App />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </I18nextProvider>
  </Provider>
);
