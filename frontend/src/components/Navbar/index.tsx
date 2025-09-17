import { Link } from "react-router";
import NavbarCategoryCard from "../NavbarCategoryCard";

const Navbar = () => {
  return (
    <>
      <ul className="hidden lg:flex items-center justify-center gap-9">
        <li className="py-6 relative group">
          <a
            href="#"
            className="relative z-[1] overflow-hidden capitalize text-xl font-semibold rounded-[32px] py-2 px-4 transition-all duration-700 
    before:content-[''] before:absolute before:bottom-0 before:left-0 
    before:w-full before:h-0 before:bg-black before:rounded-[32px] 
    before:-z-[1] before:transition-all before:duration-300 
    group-hover:before:h-full group-hover:text-white hover:before:h-full hover:text-white"
          >
            Discover
          </a>
          <ul className="absolute top-[100%] left-0 z-50 bg-white w-80 rounded-b-xl px-6 py-6 flex flex-col items-start justify-start gap-2 opacity-0 scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 transition-all duration-800 origin-top">
            <li>
              <a
                href="#"
                className="text-lg font-semibold relative before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[2px] before:w-0 before:bg-black before:transition-all before:duration-500 hover:before:w-full"
              >
                Monitor
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-lg font-semibold relative before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[2px] before:w-0 before:bg-black before:transition-all before:duration-500 hover:before:w-full"
              >
                Steering wheel
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-lg font-semibold relative before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[2px] before:w-0 before:bg-black before:transition-all before:duration-500 hover:before:w-full"
              >
                Gaming Chair
              </a>
            </li>
            <li>
              <a
                href="#"
                className="sub-menu text-lg font-semibold relative before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[2px] before:w-0 before:bg-black before:transition-all before:duration-500 hover:before:w-full"
              >
                Other Products
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-lg font-semibold relative before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[2px] before:w-0 before:bg-black before:transition-all before:duration-500 hover:before:w-full"
              >
                Headphones and Microphone
              </a>
            </li>
          </ul>
        </li>
        <li className="py-6 group ">
          <a
            href="#"
            className="relative z-[1] overflow-hidden capitalize text-xl font-semibold rounded-[32px] py-2 px-4 transition-all duration-700 
    before:content-[''] before:absolute before:bottom-0 before:left-0 
    before:w-full before:h-0 before:bg-black before:rounded-[32px] 
    before:-z-[1] before:transition-all before:duration-300 
    group-hover:before:h-full group-hover:text-white hover:before:h-full hover:text-white"
          >
            Categories
          </a>
          <ul className="grid grid-cols-5 gap-3 absolute top-[100%] left-0  z-50 bg-white  h-[70vh] w-full rounded-b-xl px-6 py-6  opacity-0 scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 transition-all duration-800 origin-top">
          <li><NavbarCategoryCard /></li>
          <li><NavbarCategoryCard /></li>
          <li><NavbarCategoryCard /></li>
          <li><NavbarCategoryCard /></li>
          <li><NavbarCategoryCard /></li>
          </ul>
        </li>
        <li className="py-6 relative group">
          <a
            href="#"
            className="relative z-[1] overflow-hidden capitalize text-xl font-semibold rounded-[32px] py-2 px-4 transition-all duration-700 
    before:content-[''] before:absolute before:bottom-0 before:left-0 
    before:w-full before:h-0 before:bg-black before:rounded-[32px] 
    before:-z-[1] before:transition-all before:duration-300 
    group-hover:before:h-full group-hover:text-white hover:before:h-full hover:text-white"
          >
            Support and Drivers
          </a>
          <ul
            className="absolute top-[100%] left-0 z-50 bg-white w-58 rounded-b-xl px-6 py-6 flex flex-col items-start justify-start gap-2
    opacity-0 scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 transition-all duration-800 origin-top"
          >
            <li>
              <a
                href="#"
                className="text-lg font-semibold relative before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[2px] before:w-0 before:bg-black before:transition-all before:duration-500 hover:before:w-full"
              >
                Support
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-lg font-semibold relative before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[2px] before:w-0 before:bg-black before:transition-all before:duration-500 hover:before:w-full"
              >
                Drivers
              </a>
            </li>
          </ul>
        </li>
        <li className="py-6">
          <Link
            to="contact"
            className="relative z-[1] overflow-hidden 
      capitalize text-xl font-semibold rounded-[32px] 
      py-2 px-4 transition-all duration-700 
      before:content-[''] before:absolute before:bottom-0 before:left-0 
      before:w-full before:h-0 before:bg-black before:rounded-[32px] 
      before:-z-[1] before:transition-all before:duration-300 
      hover:before:h-full hover:text-white"
          >
            Contact Us
          </Link>
        </li>
      </ul>
    </>
  );
};
export default Navbar;
