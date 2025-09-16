import ClientLayout from "../layouts/client";
import ContactInfo from "../pages/client/Contact";
import Home from "../pages/client/Home";
import Register from "../pages/client/Register";
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
        path: "contact",
        element: <ContactInfo />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
];

export default ROUTES;
