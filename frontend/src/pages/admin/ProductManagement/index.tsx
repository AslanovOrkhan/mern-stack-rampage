import { FaEdit } from "react-icons/fa";
import { FaMagnifyingGlassPlus, FaPlus, FaTrashCan } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";

const ProductManagement = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold capitalize mb-9">
          products
        </h1>
        <div className="flex items-center justify-end gap-3">
          <button className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-red-700 cursor-pointer">
            <FaTrashCan className="text-white text-base" />
            <span className="text-white text-base capitalize">delete</span>
          </button>
          <button className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-green-700 cursor-pointer">
            <FaPlus className="text-white text-base" />
            <span className="text-white text-base capitalize">add product</span>
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
                  <input type="checkbox" />
                </th>
                <th scope="col" className="px-6 py-3">
                  product image
                </th>
                <th scope="col" className="px-6 py-3">
                  product name
                </th>
                <th scope="col" className="px-6 py-3">
                  category
                </th>
                <th scope="col" className="px-6 py-3">
                  price
                </th>
                <th scope="col" className="px-6 py-3">
                  sale price
                </th>
                <th scope="col" className="px-6 py-3">
                  stock
                </th>
                <th scope="col" className="px-6 py-3">
                  view
                </th>
                <th scope="col" className="px-6 py-3">
                  actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="dark:bg-gray-800 dark:border-gray-700 border-b border-gray-300">
                <td className="px-6">
                  <input type="checkbox" />
                </td>
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
                <td className="px-6">mouse</td>
                <td className="px-6">300</td>
                <td className="px-6">155</td>
                <td className="px-6">25</td>
                <td className="px-6">
                  <FaMagnifyingGlassPlus />
                </td>
                <td className="px-6">
                  <button className="border-none outline-none bg-transparent">
                    <FaEdit className="text-gray-400 text-xl cursor-pointer" />
                  </button>
                  <button className="border-none outline-none bg-transparent ml-3">
                    <FaTrashCan className="text-gray-400 text-lg cursor-pointer" />
                  </button>
                </td>
              </tr>
              <tr className="dark:bg-gray-800 dark:border-gray-700 border-b border-gray-300">
                <td className="px-6">
                  <input type="checkbox" />
                </td>
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
                <td className="px-6">mouse</td>
                <td className="px-6">300</td>
                <td className="px-6">155</td>
                <td className="px-6">25</td>
                <td className="px-6">
                  <FaMagnifyingGlassPlus />
                </td>
                <td className="px-6">
                  <button className="border-none outline-none bg-transparent">
                    <FaEdit className="text-gray-400 text-xl cursor-pointer" />
                  </button>
                  <button className="border-none outline-none bg-transparent ml-3">
                    <FaTrashCan className="text-gray-400 text-lg cursor-pointer" />
                  </button>
                </td>
              </tr>
              <tr className="dark:bg-gray-800 dark:border-gray-700 border-b border-gray-300">
                <td className="px-6">
                  <input type="checkbox" />
                </td>
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
                <td className="px-6">mouse</td>
                <td className="px-6">300</td>
                <td className="px-6">155</td>
                <td className="px-6">25</td>
                <td className="px-6">
                  <FaMagnifyingGlassPlus />
                </td>
                <td className="px-6">
                  <button className="border-none outline-none bg-transparent">
                    <FaEdit className="text-gray-400 text-xl cursor-pointer" />
                  </button>
                  <button className="border-none outline-none bg-transparent ml-3">
                    <FaTrashCan className="text-gray-400 text-lg cursor-pointer" />
                  </button>
                </td>
              </tr>
              <tr className="dark:bg-gray-800 dark:border-gray-700 border-b border-gray-300">
                <td className="px-6">
                  <input type="checkbox" />
                </td>
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
                <td className="px-6">mouse</td>
                <td className="px-6">300</td>
                <td className="px-6">155</td>
                <td className="px-6">25</td>
                <td className="px-6">
                  <FaMagnifyingGlassPlus />
                </td>
                <td className="px-6">
                  <button className="border-none outline-none bg-transparent">
                    <FaEdit className="text-gray-400 text-xl cursor-pointer" />
                  </button>
                  <button className="border-none outline-none bg-transparent ml-3">
                    <FaTrashCan className="text-gray-400 text-lg cursor-pointer" />
                  </button>
                </td>
              </tr>
              <tr className="dark:bg-gray-800 dark:border-gray-700 border-b border-gray-300">
                <td className="px-6">
                  <input type="checkbox" />
                </td>
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
                <td className="px-6">mouse</td>
                <td className="px-6">300</td>
                <td className="px-6">155</td>
                <td className="px-6">25</td>
                <td className="px-6">
                  <FaMagnifyingGlassPlus />
                </td>
                <td className="px-6">
                  <button className="border-none outline-none bg-transparent">
                    <FaEdit className="text-gray-400 text-xl cursor-pointer" />
                  </button>
                  <button className="border-none outline-none bg-transparent ml-3">
                    <FaTrashCan className="text-gray-400 text-lg cursor-pointer" />
                  </button>
                </td>
              </tr>
              <tr className="dark:bg-gray-800 dark:border-gray-700 border-b border-gray-300">
                <td className="px-6">
                  <input type="checkbox" />
                </td>
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
                <td className="px-6">mouse</td>
                <td className="px-6">300</td>
                <td className="px-6">155</td>
                <td className="px-6">25</td>
                <td className="px-6">
                  <FaMagnifyingGlassPlus />
                </td>
                <td className="px-6">
                  <button className="border-none outline-none bg-transparent">
                    <FaEdit className="text-gray-400 text-xl cursor-pointer" />
                  </button>
                  <button className="border-none outline-none bg-transparent ml-3">
                    <FaTrashCan className="text-gray-400 text-lg cursor-pointer" />
                  </button>
                </td>
              </tr>
              <tr className="dark:bg-gray-800 dark:border-gray-700 border-b border-gray-300">
                <td className="px-6">
                  <input type="checkbox" />
                </td>
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
                <td className="px-6">mouse</td>
                <td className="px-6">300</td>
                <td className="px-6">155</td>
                <td className="px-6">25</td>
                <td className="px-6">
                  <FaMagnifyingGlassPlus />
                </td>
                <td className="px-6">
                  <button className="border-none outline-none bg-transparent">
                    <FaEdit className="text-gray-400 text-xl cursor-pointer" />
                  </button>
                  <button className="border-none outline-none bg-transparent ml-3">
                    <FaTrashCan className="text-gray-400 text-lg cursor-pointer" />
                  </button>
                </td>
              </tr>
              <tr className="dark:bg-gray-800 dark:border-gray-700 border-b border-gray-300">
                <td className="px-6">
                  <input type="checkbox" />
                </td>
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
                <td className="px-6">mouse</td>
                <td className="px-6">300</td>
                <td className="px-6">155</td>
                <td className="px-6">25</td>
                <td className="px-6">
                  <FaMagnifyingGlassPlus />
                </td>
                <td className="px-6">
                  <button className="border-none outline-none bg-transparent">
                    <FaEdit className="text-gray-400 text-xl cursor-pointer" />
                  </button>
                  <button className="border-none outline-none bg-transparent ml-3">
                    <FaTrashCan className="text-gray-400 text-lg cursor-pointer" />
                  </button>
                </td>
              </tr>
              <tr className="dark:bg-gray-800 dark:border-gray-700 border-b border-gray-300">
                <td className="px-6">
                  <input type="checkbox" />
                </td>
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
                <td className="px-6">mouse</td>
                <td className="px-6">300</td>
                <td className="px-6">155</td>
                <td className="px-6">25</td>
                <td className="px-6">
                  <FaMagnifyingGlassPlus />
                </td>
                <td className="px-6">
                  <button className="border-none outline-none bg-transparent">
                    <FaEdit className="text-gray-400 text-xl cursor-pointer" />
                  </button>
                  <button className="border-none outline-none bg-transparent ml-3">
                    <FaTrashCan className="text-gray-400 text-lg cursor-pointer" />
                  </button>
                </td>
              </tr>
              <tr className="dark:bg-gray-800 dark:border-gray-700 border-b border-gray-300">
                <td className="px-6">
                  <input type="checkbox" />
                </td>
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
                <td className="px-6">mouse</td>
                <td className="px-6">300</td>
                <td className="px-6">155</td>
                <td className="px-6">25</td>
                <td className="px-6">
                  <FaMagnifyingGlassPlus />
                </td>
                <td className="px-6">
                  <button className="border-none outline-none bg-transparent">
                    <FaEdit className="text-gray-400 text-xl cursor-pointer" />
                  </button>
                  <button className="border-none outline-none bg-transparent ml-3">
                    <FaTrashCan className="text-gray-400 text-lg cursor-pointer" />
                  </button>
                </td>
              </tr>
              <tr className="dark:bg-gray-800 dark:border-gray-700 border-b border-gray-300">
                <td className="px-6">
                  <input type="checkbox" />
                </td>
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
                <td className="px-6">mouse</td>
                <td className="px-6">300</td>
                <td className="px-6">155</td>
                <td className="px-6">25</td>
                <td className="px-6">
                  <FaMagnifyingGlassPlus />
                </td>
                <td className="px-6">
                  <button className="border-none outline-none bg-transparent">
                    <FaEdit className="text-gray-400 text-xl cursor-pointer" />
                  </button>
                  <button className="border-none outline-none bg-transparent ml-3">
                    <FaTrashCan className="text-gray-400 text-lg cursor-pointer" />
                  </button>
                </td>
              </tr>
              <tr className="dark:bg-gray-800 dark:border-gray-700 border-b border-gray-300">
                <td className="px-6">
                  <input type="checkbox" />
                </td>
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
                <td className="px-6">mouse</td>
                <td className="px-6">300</td>
                <td className="px-6">155</td>
                <td className="px-6">25</td>
                <td className="px-6">
                  <FaMagnifyingGlassPlus />
                </td>
                <td className="px-6">
                  <button className="border-none outline-none bg-transparent">
                    <FaEdit className="text-gray-400 text-xl cursor-pointer" />
                  </button>
                  <button className="border-none outline-none bg-transparent ml-3">
                    <FaTrashCan className="text-gray-400 text-lg cursor-pointer" />
                  </button>
                </td>
              </tr>
              <tr className="dark:bg-gray-800 dark:border-gray-700 border-b border-gray-300">
                <td className="px-6">
                  <input type="checkbox" />
                </td>
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
                <td className="px-6">mouse</td>
                <td className="px-6">300</td>
                <td className="px-6">155</td>
                <td className="px-6">25</td>
                <td className="px-6">
                  <FaMagnifyingGlassPlus />
                </td>
                <td className="px-6">
                  <button className="border-none outline-none bg-transparent">
                    <FaEdit className="text-gray-400 text-xl cursor-pointer" />
                  </button>
                  <button className="border-none outline-none bg-transparent ml-3">
                    <FaTrashCan className="text-gray-400 text-lg cursor-pointer" />
                  </button>
                </td>
              </tr>{" "}
              <tr className="dark:bg-gray-800 dark:border-gray-700 border-b border-gray-300">
                <td className="px-6">
                  <input type="checkbox" />
                </td>
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
                <td className="px-6">mouse</td>
                <td className="px-6">300</td>
                <td className="px-6">155</td>
                <td className="px-6">25</td>
                <td className="px-6">
                  <FaMagnifyingGlassPlus />
                </td>
                <td className="px-6">
                  <button className="border-none outline-none bg-transparent">
                    <FaEdit className="text-gray-400 text-xl cursor-pointer" />
                  </button>
                  <button className="border-none outline-none bg-transparent ml-3">
                    <FaTrashCan className="text-gray-400 text-lg cursor-pointer" />
                  </button>
                </td>
              </tr>{" "}
              <tr className="dark:bg-gray-800 dark:border-gray-700 border-b border-gray-300">
                <td className="px-6">
                  <input type="checkbox" />
                </td>
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
                <td className="px-6">mouse</td>
                <td className="px-6">300</td>
                <td className="px-6">155</td>
                <td className="px-6">25</td>
                <td className="px-6">
                  <FaMagnifyingGlassPlus />
                </td>
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
        <nav className="flex items-center justify-center mt-8 gap-3 text-sm text-slate-300">
          {/* Previous */}
          <button
            className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 transition
               disabled:opacity-40 disabled:cursor-not-allowed
               hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled
          >
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M12.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L8.414 10l4.293 4.293a1 1 0 010 1.414z" />
            </svg>
            <span>Previous</span>
          </button>
          {/* Page numbers */}
          <button className="rounded-md bg-slate-700 text-white px-3 py-1.5">
            1
          </button>
          <button className="rounded-md px-3 py-1.5 hover:bg-slate-800">
            2
          </button>
          <button className="rounded-md px-3 py-1.5 hover:bg-slate-800">
            3
          </button>
          <span className="px-2 text-slate-400">…</span>
          <button className="rounded-md px-3 py-1.5 hover:bg-slate-800">
            16
          </button>
          {/* Next */}
          <button
            className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 transition
               hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <span>Next</span>
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M7.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5A1 1 0 017.293 14.293L11.586 10 7.293 5.707a1 1 0 010-1.414z" />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default ProductManagement;
