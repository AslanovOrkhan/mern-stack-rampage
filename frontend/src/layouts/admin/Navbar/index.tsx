import { AiOutlineMenu } from "react-icons/ai";
import { MdOutlineLogout } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { useState } from "react";
const AdminNavbar = () => {
    const [open, setOpen] = useState(false);

  return (
    <nav className="bg-[#1F2937] px-6 py-1 w-full flex items-center justify-between">
      <div className="">
        <AiOutlineMenu className="text-white text-2xl cursor-pointer" />
      </div>
      <div className="flex items-center gap-4 relative py-3">
      <span className="capitalize text-white font-semibold text-lg">
        orxan aslanov
      </span>
      <input
        type="image"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"
        alt="Submit"
        className="w-12 h-12 rounded-full cursor-pointer"
        onClick={() => setOpen(!open)}
      />

      {/* Dropdown */}
      <ul
        className={`flex flex-col items-start gap-5 px-3 py-5 absolute top-[100%] left-0 w-full 
                    bg-[#1F2937] rounded-b-lg cursor-pointer
                    transition-all duration-300 ease-in-out
                    ${open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`}
      >
        <li>
          <a
            href="#"
            className="text-white text-base font-semibold capitalize flex items-center justify-start gap-2"
          >
            <IoMdSettings className="text-lg" /> <span>edit profile</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="text-white text-base font-semibold capitalize flex items-center justify-start gap-2"
          >
            <MdOutlineLogout className="text-lg" />
            <span> log out</span>
          </a>
        </li>
      </ul>
    </div>
    </nav>
  );
};


export default AdminNavbar
