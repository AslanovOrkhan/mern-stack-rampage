import { Outlet } from "react-router";
import AdminNavbar from "./Navbar";
import Sidebar from "./Sidebar";

const AdminLayout = () => {
  return (
    <div>
      <AdminNavbar />
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
