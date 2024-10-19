import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./index.css";
import App from "./App.tsx";
import DefaultLayout from "./pages/DefaultLayout.tsx";
import StreetInfoCard from "./components/StreetDetail/StreetInfo.tsx";
import OnDevelopPage from "./pages/OnDevelopPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <App />,
        children: [
          {
            path: "/street/:streetId/:streetName",
            element: <StreetInfoCard />
          }
        ]
      },
      {
        path: "/on-develop",
        element: <OnDevelopPage />
      },
      {
        path: "*",
        element: <Navigate to="/" />
      }
    ]
  }
]);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
