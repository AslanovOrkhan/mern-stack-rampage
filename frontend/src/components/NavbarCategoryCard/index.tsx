import { FaArrowRight } from "react-icons/fa6";
import navImage from "../../assets/images/megamonitorfinal.webp";
const NavbarCategoryCard = () => {

  return (
    <div className="flex flex-col items-center justify-start gap-3  bg-[#F8F8F8] rounded-xl py-6">
      <img
        src={navImage}
        alt=""
        className="w-56 h-56 object-cover hover:scale-110 transition-all duration-800 cursor-pointer"
      />
      <div className="flex items-center justify-between gap-16 px-3 mt-2">
        <div className="flex flex-col items-start justify-start gap-2">
          <span className="text-2xl font-semibold capitalize cursor-pointer relative before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[2px] before:w-0 before:bg-black before:transition-all before:duration-500 hover:before:w-full">
            Monitor
          </span>
          <span className="text-lg cursor-pointer">
            Clear display and smooth performance.
          </span>
        </div>
        <FaArrowRight className="cursor-pointer text-2xl transition-all duration-600 transform hover:rotate-90" />
      </div>
    </div>
  );
};

export default NavbarCategoryCard;
