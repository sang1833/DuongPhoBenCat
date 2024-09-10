import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./css/style.css";
import "./css/leafletConfig.css";
import initializeApp from "./app/init";

initializeApp();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <App />
  </StrictMode>
);
