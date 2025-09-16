import { Link } from "react-router";

const Navbar = () => {
   return (
    <>
    <ul className="hidden lg:flex items-center justify-center gap-9">
      <li className="py-6"><a href="#" className="  relative z-[1] overflow-hidden 
      capitalize text-xl font-semibold rounded-[32px] 
      py-2 px-4 transition-all duration-700 
      before:content-[''] before:absolute before:bottom-0 before:left-0 
      before:w-full before:h-0 before:bg-black before:rounded-[32px] 
      before:-z-[1] before:transition-all before:duration-300 
      hover:before:h-full hover:text-white">Discover</a></li>
      <li className="py-6"><a href="#" className="  relative z-[1] overflow-hidden 
      capitalize text-xl font-semibold rounded-[32px] 
      py-3 px-4 transition-all duration-700 
      before:content-[''] before:absolute before:bottom-0 before:left-0 
      before:w-full before:h-0 before:bg-black before:rounded-[32px] 
      before:-z-[1] before:transition-all before:duration-300 
      hover:before:h-full hover:text-white">Categories</a></li>
      <li className="py-6"><a href="#" className="  relative z-[1] overflow-hidden 
      capitalize text-xl font-semibold rounded-[32px] 
      py-2 px-4 transition-all duration-700 
      before:content-[''] before:absolute before:bottom-0 before:left-0 
      before:w-full before:h-0 before:bg-black before:rounded-[32px] 
      before:-z-[1] before:transition-all before:duration-300 
      hover:before:h-full hover:text-white">Support and Drivers</a></li>
      <li className="py-6"><Link to="contact" className="  relative z-[1] overflow-hidden 
      capitalize text-xl font-semibold rounded-[32px] 
      py-2 px-4 transition-all duration-700 
      before:content-[''] before:absolute before:bottom-0 before:left-0 
      before:w-full before:h-0 before:bg-black before:rounded-[32px] 
      before:-z-[1] before:transition-all before:duration-300 
      hover:before:h-full hover:text-white">Contact Us</Link></li>
    </ul>
    </>
  );
};
export default Navbar;
