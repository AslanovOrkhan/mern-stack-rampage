import { FaEdit } from "react-icons/fa";
import { FaPlus, FaTrashCan } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getCategories, deleteCategory } from "../../../Api/categoryApi";
import type { Category } from "../../../types/category";
import CreateCategoryModal from "../../../components/AddCategoryModal";
import UpdateCategoryModal from "../../../components/UpdateCategoryModal";
import Swal from "sweetalert2";
const CategoryPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  // Filter categories based on search term
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold capitalize mb-9">
          category
        </h1>
        <div className="flex items-center justify-end gap-3">
          <button 
            className={`flex items-center justify-center gap-2 px-5 py-3 rounded-lg transition-colors ${
              selectedIds.length === 0 
                ? "bg-gray-500 cursor-not-allowed opacity-50" 
                : "bg-red-700 cursor-pointer hover:bg-red-800"
            }`}
            disabled={selectedIds.length === 0}
            onClick={async () => {
              if (selectedIds.length === 0) return;
              const result = await Swal.fire({
                title: "Are you sure you want to delete selected categories?",
                text: `${selectedIds.length} category will be deleted!`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, delete!",
                cancelButtonText: "No",
              });
              if (result.isConfirmed) {
                try {
                  await Promise.all(selectedIds.map((id) => deleteCategory(id)));
                  setCategories((prev) =>
                    prev.filter((c) => !selectedIds.includes(c.id as string))
                  );
                  setSelectedIds([]);
                  Swal.fire(
                    "Deleted!",
                    "Selected categories successfully deleted.",
                    "success"
                  );
                  toast.success("Selected categories deleted!");
                } catch (err: any) {
                  Swal.fire(
                    "Error!",
                    err?.message || "Categories not deleted!",
                    "error"
                  );
                  toast.error(err?.message || "Categories not deleted!");
                }
              }
            }}
          >
            <FaTrashCan className="text-white text-base" />
            <span className="text-white text-base capitalize">delete</span>
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-green-700 cursor-pointer hover:bg-green-800 transition-colors"
          >
            <FaPlus className="text-white text-base" />
            <span className="text-white text-base capitalize">
              add category
            </span>
          </button>
        </div>
      </div>
      <div className="bg-[#1F2937] p-6 rounded-lg mt-6">
        <div className="flex items-center justify-between gap-6 border border-gray-500 px-3 py-2 rounded-md w-full">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-white placeholder:text-gray-400
                         focus:placeholder:text-gray-500 dark:placeholder:text-gray-500
                         outline-none border-none bg-transparent"
            placeholder="Search by category name"
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
                    checked={filteredCategories.length > 0 && selectedIds.length === filteredCategories.length}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedIds(filteredCategories.map(c => c.id as string));
                      } else {
                        setSelectedIds([]);
                      }
                    }}
                  />
                </th>
                <th scope="col" className="px-6 py-3">
                  category image
                </th>
                <th scope="col" className="px-6 py-3">
                  category name
                </th>
                <th scope="col" className="px-6 py-3">
                  category description
                </th>
                <th scope="col" className="px-6 py-3">
                  actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                    Loading categories...
                  </td>
                </tr>
              ) : filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                    {searchTerm ? "No categories found matching your search" : "No categories available"}
                  </td>
                </tr>
              ) : (
                filteredCategories.map((category) => (
                  <tr key={category.id} className="dark:bg-gray-800 dark:border-gray-700 border-b border-gray-300">
                    <td className="px-6">
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(category.id as string)}
                        onChange={(e) => {
                          const id = category.id as string;
                          if (e.target.checked) {
                            setSelectedIds(prev => [...prev, id]);
                          } else {
                            setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
                          }
                        }}
                      />
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-white p-1">
                        <img
                          src={category.image || "/default-category-image.png"}
                          alt={category.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/default-category-image.png";
                          }}
                        />
                      </div>
                    </th>
                    <td className="px-6">{category.name}</td>
                    <td className="px-6">{category.description}</td>
                    <td className="px-6">
                      <button 
                        className="border-none outline-none bg-transparent"
                        onClick={() => {
                          setSelectedCategory(category);
                          setShowUpdateModal(true);
                        }}
                      >
                        <FaEdit className="text-gray-400 text-xl cursor-pointer hover:text-blue-500 transition-colors" />
                      </button>
                      <button 
                        className="border-none outline-none bg-transparent ml-3"
                        onClick={async () => {
                          const result = await Swal.fire({
                            title: "Are you sure you want to delete this category?",
                            text: `${category.name} will be deleted!`,
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#d33",
                            cancelButtonColor: "#3085d6",
                            confirmButtonText: "Yes, delete!",
                            cancelButtonText: "No",
                          });
                          if (result.isConfirmed) {
                            try {
                              await deleteCategory(category.id as string);
                              setCategories((prev) =>
                                prev.filter((c) => c.id !== category.id)
                              );
                              Swal.fire(
                                "Deleted!",
                                "Category successfully deleted.",
                                "success"
                              );
                              toast.success("Category deleted!");
                            } catch (err: any) {
                              Swal.fire(
                                "Error!",
                                err?.message || "Category not deleted!",
                                "error"
                              );
                              toast.error(
                                err?.message || "Category not deleted!"
                              );
                            }
                          }
                        }}
                      >
                        <FaTrashCan className="text-gray-400 text-lg cursor-pointer hover:text-red-500 transition-colors" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Category Modal */}
      {showAddModal && (
        <CreateCategoryModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            fetchCategories(); // Kateqoriya siyahısını yenilə
            setShowAddModal(false);
          }}
        />
      )}

      {/* Update Category Modal */}
      {showUpdateModal && selectedCategory && (
        <UpdateCategoryModal
          category={selectedCategory}
          onClose={() => {
            setShowUpdateModal(false);
            setSelectedCategory(null);
          }}
          onSuccess={() => {
            fetchCategories(); // Kateqoriya siyahısını yenilə
            setShowUpdateModal(false);
            setSelectedCategory(null);
          }}
        />
      )}
    </div>
  );
};

export default CategoryPage;
