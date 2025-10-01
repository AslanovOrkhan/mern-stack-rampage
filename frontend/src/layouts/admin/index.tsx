import { Outlet } from "react-router";
import AdminNavbar from "./Navbar";
import Sidebar from "./Sidebar";

const AdminLayout = () => {
  return (
    <div className="w-full h-screen grid grid-cols-[250px_1fr]">
      {/* Sol menu ayrıca skroll ala bilər */}
      <div className="h-screen overflow-auto">
        <Sidebar />
      </div>

      {/* Sağ panel: flex sütun, hündürlüyü valideyndən alsın */}
      <div className="bg-white flex h-screen min-h-0 flex-col">
        {/* Navbar sabit hündürlüklü blok, sıxılmasın */}
        <div className="shrink-0">
          <AdminNavbar />
        </div>

        {/* Content: qalan bütün hündürlüyü tutsun və skroll alsın */}
        <div className="flex-1 min-h-0 overflow-auto bg-[#111827] hide-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
