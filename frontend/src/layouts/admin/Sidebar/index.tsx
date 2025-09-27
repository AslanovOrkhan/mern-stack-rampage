import { FiCompass } from "react-icons/fi";
import { IoGridOutline } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import { Link } from "react-router";

const Sidebar = () => {
  return (
    <div className="bg-[#1F2937] flex flex-col items-start justify-between transition-all duration-300 w-[250px] h-[100vh] px-7 py-6">
      <Link to="/admin" className="text-white text-2xl font-bold capitalize">admin panel</Link>
      <ul className="w-full h-[75vh] py-8 flex flex-col items-start justify-start gap-6">
        <li>
          <Link to="/admin" className="flex items-center justify-start gap-5 text-[#9CA3AF]"><IoGridOutline className="text-xl"/> <span className="capitalize text-lg font-bold">dashboard</span></Link>
        </li>
        <li>
          <Link to="/admin/orders" className="flex items-center justify-start gap-5 text-[#9CA3AF]"><FiCompass className="text-xl" /> <span className="capitalize text-lg font-bold">orders</span></Link>
        </li>
      </ul>
      <a href="#" className="text-white flex items-center justify-center gap-2 w-full bg-[#0F766E] py-3 rounded-lg capitalize font-semibold">
        <MdOutlineLogout className="text-[16px] mt-[2px]" /> <span>log out</span>
      </a>
    </div>
  );
};

export default Sidebar;
