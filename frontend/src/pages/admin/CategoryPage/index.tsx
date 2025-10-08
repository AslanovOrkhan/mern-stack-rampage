import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaPlus, FaTrashCan } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import type { Category } from "../../../types/category";
import { getCategories, deleteCategory } from "../../../Api/api";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateCategoryModal from "@/components/AddCategoryModal";


const CategoryPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [ setModalMode] = useState<'create' | 'update'>('create');
  const [setSelectedCategory] = useState<Category | undefined>(undefined);
  const [search, setSearch] = useState("");

  const fetchCategories = () => {
    getCategories().then(data => {
      setAllCategories(data);
      setCategories(data);
    }).catch(console.error);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setCategories(allCategories);
      return;
    }
    const filtered = allCategories.filter(cat => {
      const term = search.trim().toLowerCase();
      return (
        cat.name.toLowerCase().includes(term) ||
        cat.description.toLowerCase().includes(term)
      );
    });
    setCategories(filtered);
  }, [search, allCategories]);


  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Bu kateqoriyanı silmək istədiyinizə əminsiniz?",
      text: "Bu əməliyyatı geri qaytarmaq mümkün deyil.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Bəli, sil",
      cancelButtonText: "Xeyr",
      reverseButtons: true,
      confirmButtonColor: "#ef4444",
    }).then(async (res) => {
      if (!res.isConfirmed) return;
      try {
  await deleteCategory(id);
  fetchCategories();
  toast.success("Kateqoriya uğurla silindi!");
      } catch (e) {
        console.error(e);
  toast.error("Silinmə zamanı problem oldu.");
      }
    });
  };

  const openCreateModal = () => {
    setModalMode('create');
    setSelectedCategory(undefined);
    setShowModal(true);
  };

  const openUpdateModal = (cat: Category) => {
    setModalMode('update');
    setSelectedCategory(cat);
    setShowModal(true);
  };

  return (
    <div className="p-6">
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <div className="flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold capitalize mb-9">
          category
        </h1>
        <div className="flex items-center justify-end gap-3">
          <button className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-red-700 cursor-pointer">
            <FaTrashCan className="text-white text-base" />
            <span className="text-white text-base capitalize">delete</span>
          </button>
          <button
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-green-700 cursor-pointer"
            onClick={openCreateModal}
          >
            <FaPlus className="text-white text-base" />
            <span className="text-white text-base capitalize">
              add category
            </span>
          </button>
        </div>
      </div>
      <div className="bg-[#1F2937] p-6 rounded-lg mt-6">
        <div className="flex items-center justify-between gap-6 border border-gray-500 px-3 py-2 rounded-md">
          <input
            type="text"
            className="w-full text-white placeholder:text-gray-400
             focus:placeholder:text-gray-500 dark:placeholder:text-gray-500
             outline-none border-none bg-transparent"
            placeholder="Search by categories name"
            value={search}
            onChange={e => setSearch(e.target.value)}
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
                  image
                </th>
                <th scope="col" className="px-6 py-3">
                  name
                </th>
                <th scope="col" className="px-6 py-3">
                  description
                </th>
                <th scope="col" className="px-6 py-3">
                  actions
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, idx) => (
                <tr
                  key={cat.id ?? `row-${idx}`}
                  className="dark:bg-gray-800 dark:border-gray-700 border-b border-gray-300"
                >
                  <td className="px-6">
                    <input type="checkbox" />
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <img
                      src={cat.image || "https://via.placeholder.com/48"}
                      className="w-12 h-12 object-cover rounded-full"
                      alt={cat.name}
                      loading="lazy"
                    />
                  </th>
                  <td className="px-6">{cat.name}</td>
                  <td className="px-6">{cat.description}</td>
                  <td className="px-6">
                    <button className="border-none outline-none bg-transparent" onClick={() => openUpdateModal(cat)}>
                      <FaEdit className="text-gray-400 text-xl cursor-pointer" />
                    </button>
                    {cat.id ? (
                      <button
                        className="border-none outline-none bg-transparent ml-3"
                        onClick={() => handleDelete(cat.id as string)}
                      >
                        <FaTrashCan className="text-gray-400 text-lg cursor-pointer" />
                      </button>
                    ) : (
                      <button
                        className="border-none outline-none bg-transparent ml-3 opacity-50 cursor-not-allowed"
                        disabled
                      >
                        <FaTrashCan className="text-gray-400 text-lg" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              {categories.length === 0 && (
                <tr key="no-category">
                  <td colSpan={5} className="px-6 py-4 text-center">
                    Heç bir kategoriya tapılmadı
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
        <CreateCategoryModal
          onClose={() => {
            setShowModal(false);
            fetchCategories();
          }}
        />
      )}
    </div>
  );
};

export default CategoryPage;
