import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaPlus, FaTrashCan } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { getBrands } from "@/Api/brandApi";
import { deleteBrand } from "@/Api/brandApi";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import type { Brand } from "@/types/brand";
import AddBrandModal from "@/components/AddBrandModal";
import UpdateBrandModal from "@/components/UpdateBrandModal";
const BrandManagement = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

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
      {showUpdateModal && selectedBrand && (
        <UpdateBrandModal
          brand={selectedBrand}
          onClose={() => {
            setShowUpdateModal(false);
            setSelectedBrand(null);
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
            <button
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-red-700 cursor-pointer"
              disabled={selectedIds.length === 0}
              onClick={async () => {
                if (selectedIds.length === 0) return;
                const result = await Swal.fire({
                  title: "Are you sure you want to delete selected brands?",
                  text: `${selectedIds.length} brand will be deleted!`,
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#d33",
                  cancelButtonColor: "#3085d6",
                  confirmButtonText: "Yes, delete!",
                  cancelButtonText: "No",
                });
                if (result.isConfirmed) {
                  try {
                    await Promise.all(selectedIds.map((id) => deleteBrand(id)));
                    setBrands((prev) =>
                      prev.filter((b) => !selectedIds.includes(b.id as string))
                    );
                    setSelectedIds([]);
                    Swal.fire(
                      "Deleted!",
                      "Selected brands successfully deleted.",
                      "success"
                    );
                    toast.success("Selected brands deleted!");
                  } catch (err: any) {
                    Swal.fire(
                      "Error!",
                      err?.message || "Brands not deleted!",
                      "error"
                    );
                    toast.error(err?.message || "Brands not deleted!");
                  }
                }
              }}
            >
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-white placeholder:text-gray-400
                          focus:placeholder:text-gray-500 dark:placeholder:text-gray-500
                          outline-none border-none bg-transparent"
              placeholder="Search by brand name"
            />
            <IoSearch className="text-gray-400" />
          </div>
          <div className="relative overflow-x-auto sm:rounded-lg border border-gray-400 mt-6">
            <table className="w-full text-sm text-left rtl:text-right text-white">
              <thead className="text-xs text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    <input
                      type="checkbox"
                      checked={
                        selectedIds.length ===
                          brands.filter((b) =>
                            b.name.toLowerCase().includes(search.toLowerCase())
                          ).length && brands.length > 0
                      }
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedIds(
                            brands
                              .filter((b) =>
                                b.name
                                  .toLowerCase()
                                  .includes(search.toLowerCase())
                              )
                              .map((b) => b.id as string)
                          );
                        } else {
                          setSelectedIds([]);
                        }
                      }}
                    />
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
                {(() => {
                  const filteredBrands = brands.filter((b) =>
                    b.name.toLowerCase().includes(search.toLowerCase())
                  );

                  if (filteredBrands.length > 0) {
                    return filteredBrands.map((brand, idx) => (
                      <tr
                        key={brand.id ?? `row-${idx}`}
                        className="dark:bg-gray-800 dark:border-gray-700 border-b border-gray-300"
                      >
                        <td className="px-6">
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(brand.id as string)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedIds((prev) => [
                                  ...prev,
                                  brand.id as string,
                                ]);
                              } else {
                                setSelectedIds((prev) =>
                                  prev.filter((id) => id !== brand.id)
                                );
                              }
                            }}
                          />
                        </td>
                        <th
                          scope="row"
                          className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <img
                            src={
                              brand.image || "https://via.placeholder.com/48"
                            }
                            className="w-12 h-12 object-cover rounded-full"
                            alt={brand.name}
                            loading="lazy"
                          />
                        </th>
                        <td className="px-6">{brand.name}</td>
                        <td className="px-6">
                          <button
                            className="border-none outline-none bg-transparent"
                            onClick={() => {
                              setSelectedBrand(brand);
                              setShowUpdateModal(true);
                            }}
                          >
                            <FaEdit className="text-gray-400 text-xl cursor-pointer" />
                          </button>
                          <button
                            className="border-none outline-none bg-transparent ml-3"
                            onClick={async () => {
                              const result = await Swal.fire({
                                title:
                                  "Are you sure you want to delete this brand?",
                                text: `${brand.name} will be deleted!`,
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#d33",
                                cancelButtonColor: "#3085d6",
                                confirmButtonText: "Yes, delete!",
                                cancelButtonText: "No",
                              });
                              if (result.isConfirmed) {
                                try {
                                  await deleteBrand(brand.id as string);
                                  setBrands((prev) =>
                                    prev.filter((b) => b.id !== brand.id)
                                  );
                                  Swal.fire(
                                    "Deleted!",
                                    "Brand successfully deleted.",
                                    "success"
                                  );
                                  toast.success("Brand deleted!");
                                } catch (err: any) {
                                  Swal.fire(
                                    "Error!",
                                    err?.message || "Brand not deleted!",
                                    "error"
                                  );
                                  toast.error(
                                    err?.message || "Brand not deleted!"
                                  );
                                }
                              }
                            }}
                          >
                            <FaTrashCan className="text-gray-400 text-lg cursor-pointer" />
                          </button>
                        </td>
                      </tr>
                    ));
                  } else {
                    return (
                      <tr key="no-brand">
                        <td
                          colSpan={4}
                          className="px-6 py-4 relative font-semibold"
                        >
                          <div className="w-full flex items-center justify-center gap-6">
                            <img
                              src="https://cdn2.iconfinder.com/data/icons/visual-empty-state/32/No_Data_Found_Not_Found_Lost_Searching_Search-512.png"
                              className="w-20 h-20 object-cover"
                              alt=""
                            />
                            <span className="text-gray-500 text-2xl">No brands found</span>
                          </div>
                        </td>
                      </tr>
                    );
                  }
                })()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandManagement;
