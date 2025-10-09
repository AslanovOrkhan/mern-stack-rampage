import { FaEdit } from "react-icons/fa";
import { FaPlus, FaTrashCan } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
const SliderManagement = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold capitalize mb-9">
          slider
        </h1>
        <div className="flex items-center justify-end gap-3">
          <button className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-green-700 cursor-pointer">
            <FaPlus className="text-white text-base" />
            <span className="text-white text-base capitalize">add slider</span>
          </button>
        </div>
      </div>
      <div className="bg-[#1F2937] p-6 rounded-lg mt-6">
        <div className="flex items-center justify-between gap-6 border border-gray-500 px-3 py-2 rounded-md w-full">
          <input
            type="text"
            className="w-full text-white placeholder:text-gray-400
                     focus:placeholder:text-gray-500 dark:placeholder:text-gray-500
                     outline-none border-none bg-transparent"
            placeholder="Search by products name"
          />
          <IoSearch className="text-gray-400" />
        </div>
        <div className="relative overflow-x-auto sm:rounded-lg border border-gray-400 mt-6">
          <table className="w-full text-sm text-left rtl:text-right text-white">
            <thead className="text-xs text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  slider image
                </th>
                <th scope="col" className="px-6 py-3">
                  slider name
                </th>
                <th scope="col" className="px-6 py-3">
                  actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="dark:bg-gray-800 dark:border-gray-700 border-b border-gray-300">
              
                <th
                  scope="row"
                  className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-white p-1">
                    <img
                      src="https://www.rampage.com.tr/cdn/shop/files/Untitled-9copy_175873f9-6ed3-466c-ba5c-1c1eafa6f787.png?v=1745736162&width=2000"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </th>
                <td className="px-6">mousesss</td>
                <td className="px-6">
                  <button className="border-none outline-none bg-transparent">
                    <FaEdit className="text-gray-400 text-xl cursor-pointer" />
                  </button>
                  <button className="border-none outline-none bg-transparent ml-3">
                    <FaTrashCan className="text-gray-400 text-lg cursor-pointer" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SliderManagement;
