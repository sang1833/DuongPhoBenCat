import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import { Street } from "@pages";
import { MapProvider } from "@contexts";
import { InterceptPage } from "@pages";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <DefaultLayout />,
      children: [
        {
          path: "street",
          element: (
            <MapProvider>
              <Street />
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
