import ClientLayout from "../layouts/client";
import Home from "../pages/client/Home";
import Login from "../pages/shared/Login";

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
       {
        path: 'login',
        element: <Login />,
      },
    ],
  },
];

export default ROUTES;
