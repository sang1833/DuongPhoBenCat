import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import { Street } from "@pages";
import { MapProvider } from "@contexts";
import {
  InterceptPage,
  StreetDetail,
  StreetCreate,
  NotFoundPage
} from "@pages";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <DefaultLayout />,
      children: [
        {
          path: "street",
          element: <Street />
        },
        {
          path: "street-detail/:streetId",
          element: (
            <MapProvider>
              <StreetDetail />
            </MapProvider>
          )
        },
        {
          path: "street-create",
          element: <StreetCreate />
        },
        {
          path: "intercept",
          element: <InterceptPage />
        },
        {
          path: "*",
          element: <NotFoundPage />
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
};

export default App;
