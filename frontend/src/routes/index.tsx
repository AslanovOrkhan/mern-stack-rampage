import ClientLayout from "../layouts/client";
import Home from "../pages/client/Home";

const ROUTES = [
  // client
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
];

export default ROUTES;
