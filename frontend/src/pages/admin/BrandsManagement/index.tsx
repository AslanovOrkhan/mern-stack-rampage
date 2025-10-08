import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaPlus, FaTrashCan } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { getBrands } from "@/Api/api";
import type { Brand } from "@/types/brand";
import AddBrandModal from "@/components/AddBrandModal";
const BrandManagement = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    getBrands().then(setBrands).catch(console.error);
  }, []);

  return (
    <div>
      {showAddModal && (
        <AddBrandModal
          onClose={() => {
            setShowAddModal(false);
            getBrands().then(setBrands).catch(console.error);
          }}
        />
      )}
      <div className="p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold capitalize mb-9">
            brands
          </h1>
          <div className="flex items-center justify-end gap-3">
            <button className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-red-700 cursor-pointer">
              <FaTrashCan className="text-white text-base" />
              <span className="text-white text-base capitalize">delete</span>
            </button>
            <button
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-green-700 cursor-pointer"
              onClick={() => setShowAddModal(true)}
            >
              <FaPlus className="text-white text-base" />
              <span className="text-white text-base capitalize">add brand</span>
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
                    brand image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    brand name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {brands.length > 0 ? (
                  brands.map((brand, idx) => (
                    <tr key={brand.id ?? `row-${idx}`} className="dark:bg-gray-800 dark:border-gray-700 border-b border-gray-300">
                      <td className="px-6">
                        <input type="checkbox" />
                      </td>
                      <th
                        scope="row"
                        className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <img
                          src={brand.image || "https://via.placeholder.com/48"}
                          className="w-12 h-12 object-cover rounded-full"
                          alt={brand.name}
                          loading="lazy"
                        />
                      </th>
                      <td className="px-6">{brand.name}</td>
                      <td className="px-6">
                        <button className="border-none outline-none bg-transparent">
                          <FaEdit className="text-gray-400 text-xl cursor-pointer" />
                        </button>
                        <button className="border-none outline-none bg-transparent ml-3">
                          <FaTrashCan className="text-gray-400 text-lg cursor-pointer" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr key="no-brand">
                    <td colSpan={4} className="px-6 py-4 text-center">
                      Heç bir brand tapılmadı
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrandManagement;
            <tbody>
              // ...existing code...
            </tbody>
