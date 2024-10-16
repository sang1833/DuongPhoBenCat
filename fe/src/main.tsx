import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import StreetDetail from "./components/StreetDetail/StreetDetail.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <StreetDetail />
      }
    ]
  }
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
