import { FaChevronRight, FaRegUser, FaSlack } from "react-icons/fa6";
import { FiCompass } from "react-icons/fi";
import { IoGridOutline } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import { Link } from "react-router";
import { useState, useRef, useEffect } from "react";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { LuUsers } from "react-icons/lu";

const Sidebar = () => {
  const [catalogOpen, setCatalogOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCatalogOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <div className="bg-[#1F2937] flex flex-col items-start justify-between transition-all duration-300 w-[250px] h-[100vh] px-7 py-6 relative">
      <Link to="/admin" className="text-white text-2xl font-bold capitalize">
        admin panel
      </Link>
      
      <ul className="w-full h-[75vh] py-8 flex flex-col items-start justify-start gap-6">
        <li>
          <Link
            to="/admin"
            className="flex items-center justify-start gap-5 text-[#9CA3AF]"
          >
            <IoGridOutline className="text-xl" />{" "}
            <span className="capitalize text-lg font-bold">dashboard</span>
          </Link>
        </li> 
        <li className="w-full cursor-pointer" ref={dropdownRef}>
          <button
            onClick={() => setCatalogOpen(!catalogOpen)}
            className="flex items-center justify-start gap-3 text-[#9CA3AF] hover:text-white transition-all duration-300 w-full text-left"
          >
            <FaSlack className="text-xl" />
             <span className="capitalize text-lg font-bold ml-2 cursor-pointer">catalog</span>
             <FaChevronRight className={`text-[12px] mt-1 transition-transform duration-300 ease-in-out ${catalogOpen ? 'rotate-90' : 'rotate-0'}`} />
          </button>
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${catalogOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
            <ul className="flex flex-col items-start justify-start gap-3 bg-[#374151] border border-[#4B5563] mt-3 py-4 px-4 rounded-md shadow-lg transform transition-all duration-300 ease-in-out hover:shadow-xl hover:bg-[#3F4A5A]">
              <li className={`transform transition-all duration-200 delay-75 ${catalogOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}>
                <Link to="/admin/categories" className="text-[#9CA3AF] hover:text-white transition-colors text-sm flex items-center gap-3"><TfiLayoutLineSolid /> Categories</Link>
              </li>
              <li className={`transform transition-all duration-200 delay-100 ${catalogOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}>
                <Link to="/admin/products-management" className="text-[#9CA3AF] hover:text-white transition-colors text-sm flex items-center gap-3"><TfiLayoutLineSolid /> Products</Link>
              </li>
              <li className={`transform transition-all duration-200 delay-125 ${catalogOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}>
                <Link to="/admin/brand-management" className="text-[#9CA3AF] hover:text-white transition-colors text-sm flex items-center gap-3"><TfiLayoutLineSolid /> Brands</Link>
              </li>
              <li className={`transform transition-all duration-200 delay-150 ${catalogOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}>
                <Link to="/admin/campaigns-management" className="text-[#9CA3AF] hover:text-white transition-colors text-sm flex items-center gap-3"><TfiLayoutLineSolid /> Campaigns</Link>
              </li>
              <li className={`transform transition-all duration-200 delay-150 ${catalogOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}>
                <Link to="/admin/slider-management" className="text-[#9CA3AF] hover:text-white transition-colors text-sm flex items-center gap-3"><TfiLayoutLineSolid /> Slider</Link>
              </li>
            </ul>
          </div>
        </li> 
        <li>
          <Link
            to="/admin/orders"
            className="flex items-center justify-start gap-5 text-[#9CA3AF] relative"
          >
            <FiCompass className="text-xl" />{" "}
            <span className="capitalize text-lg font-bold">orders</span>
          </Link>
        </li> 
         <li>
          <Link
            to="/admin/brands"
            className="flex items-center justify-start gap-5 text-[#9CA3AF] relative"
          >
            <FiCompass className="text-xl" />
            <span className="capitalize text-lg font-bold">brands</span>
          </Link>
        </li> 
         <li>
          <Link
            to="#"
            className="flex items-center justify-start gap-5 text-[#9CA3AF] relative"
          >
            <LuUsers className="text-xl" />
            <span className="capitalize text-lg font-bold">customers</span>
          </Link>
        </li> 
        <li>
          <Link
            to="#"
            className="flex items-center justify-start gap-5 text-[#9CA3AF] relative"
          >
            <FaRegUser className="text-xl" />

            <span className="capitalize text-lg font-bold">our staff</span>
          </Link>
        </li> 
      </ul>
      <a
        href="#"
        className="text-white flex items-center justify-center gap-2 w-full bg-[#0F766E] py-3 rounded-lg capitalize font-semibold"
      >
        <MdOutlineLogout className="text-[16px] mt-[2px]" />{" "}
        <span>log out</span>
      </a>
    </div>
  );
};

export default Sidebar;
