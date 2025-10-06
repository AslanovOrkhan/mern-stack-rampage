import BrandManagement from "@/pages/admin/BrandsManagement";
import AdminLayout from "../layouts/admin";
import ClientLayout from "../layouts/client";
import CategoryPage from "../pages/admin/CategoryPage";
import Dashboard from "../pages/admin/Dashboard";
import Orders from "../pages/admin/Orders";
import ProductManagement from "../pages/admin/ProductManagement";
import UserProfile from "../pages/admin/UserProfile";
import ContactInfo from "../pages/client/Contact";
import Home from "../pages/client/Home";
import Register from "../pages/client/Register";
import Login from "../pages/shared/Login";
import ProductManagementDetail from "@/pages/admin/ProductManagementDetail";
import BrandsPage from "../pages/client/BrandsPage";

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
        path: "brands",
        element: <BrandsPage />,
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
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "categories",
        element: <CategoryPage />,
      },
      {
        path: "products-management",
        element: <ProductManagement />,
      },
      {
        path: "products-management/:id",
        element: <ProductManagementDetail />,
      },
      {
        path: "brand-management",
        element: <BrandManagement />,
      },
    ],
  },
];

export default ROUTES;
