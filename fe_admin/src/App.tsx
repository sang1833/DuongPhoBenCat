import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import { MapProvider } from "@contexts";
import {
  InterceptPage,
  StreetDetail,
  StreetCreate,
  NotFoundPage,
  Street,
  StreetType,
  StreetTypeCreate,
  StreetTypeDetail
} from "@pages";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <DefaultLayout />,
      children: [
        {
          path: "map/street-type",
          element: <StreetType />
        },
        {
          path: "map/street-type-detail/:streetTypeId",
          element: <StreetTypeDetail />
        },
        {
          path: "map/street-type-create",
          element: <StreetTypeCreate />
        },
        {
          path: "map/street",
          element: <Street />
        },
        {
          path: "map/street-detail/:streetId",
          element: (
            <MapProvider>
              <StreetDetail />
            </MapProvider>
          )
        },
        {
          path: "map/street-create",
          element: (
            <MapProvider>
              <StreetCreate />
            </MapProvider>
          )
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
