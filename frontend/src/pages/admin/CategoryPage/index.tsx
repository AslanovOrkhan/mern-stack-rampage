import { FaPlus, FaTrashCan } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";

const CategoryPage = () => {
  return (
    <div className="p-6">
    <div className="flex justify-between items-center">
      <h1 className="text-white text-2xl font-bold capitalize mb-9">
        category
      </h1>
      <div className="flex items-center justify-end gap-3">
        <button className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-red-700 cursor-pointer"><FaTrashCan  className="text-white text-base"/> <span className="text-white text-base capitalize">delete</span></button>
        <button className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-green-700 cursor-pointer"><FaPlus className="text-white text-base" /><span className="text-white text-base capitalize">add category</span></button>
      </div>
    </div>
    <div className="bg-[#1F2937] p-6 rounded-lg mt-6">
      <div className="flex items-center justify-between gap-6 border border-gray-500 px-3 py-2 rounded-md">
      <input type="text" className="w-full 
             text-white placeholder:text-gray-400
             focus:placeholder:text-gray-500
             dark:placeholder:text-gray-500 outline-none border-none" placeholder="Search by categories name" />
       <IoSearch className="text-gray-400" />
        </div>
    </div>
    </div>
  );
};

export default CategoryPage;
