import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App.tsx";
import "./index.css";
import StreetInfoCard from "./components/StreetDetail/StreetInfo.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/street/:streetId/:streetName",
        element: <StreetInfoCard />
      }
    ]
  }
]);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
