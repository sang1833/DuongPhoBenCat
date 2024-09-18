import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import { Street } from "@pages";
import { MapProvider } from "@contexts";
import { InterceptPage, StreetDetail } from "@pages";

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
          path: "street-detail",
          element: (
            <MapProvider>
              <StreetDetail />
            </MapProvider>
          )
        },
        {
          path: "intercept",
          element: <InterceptPage />
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
};

export default App;
