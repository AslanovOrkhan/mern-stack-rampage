import { Outlet } from "react-router";
import AdminNavbar from "./Navbar";
import Sidebar from "./Sidebar";

const AdminLayout = () => {

  return (
    <div className="w-full h-screen overflow-hidden grid transition-all duration-300 grid-cols-[250px_1fr]" >
      <Sidebar/>
      <div className="bg-white flex flex-col items-start justify-start w-full">
        <AdminNavbar/>
        <div className="admin-content w-full h-screen bg-[#111827] overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
