import AdminLayout from "../layouts/admin";
import ClientLayout from "../layouts/client";
import Dashboard from "../pages/admin/Dashboard";
import UserProfile from "../pages/admin/UserProfile";
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
  // admin
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "user-profile",
        element: <UserProfile />,
      },
    ],
  }
];

export default ROUTES;
