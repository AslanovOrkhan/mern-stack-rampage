import { FaEdit } from "react-icons/fa";
import { FaPlus, FaTrashCan } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { useState, useEffect } from "react";
import { getSliders, deleteSlider as deleteSliderApi, type Slider } from "@/Api/sliderApi";
 import UpdateSliderModal from "@/components/UpdateSliderModal";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const SliderManagement = () => {
  const [sliders, setSliders] = useState<Slider[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedSlider, setSelectedSlider] = useState<Slider | null>(null);

  // Fetch sliders from backend
  const fetchSliders = async () => {
    try {
      setLoading(true);
      const data = await getSliders();
      setSliders(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching sliders:', err);
      setError('Failed to fetch sliders');
    } finally {
      setLoading(false);
    }
  };

  // Refresh sliders after modal operations
  const refreshSliders = () => {
    fetchSliders();
  };

  // Handle edit slider
  const handleEditSlider = (slider: Slider) => {
    setSelectedSlider(slider);
    setShowUpdateModal(true);
  };

  // Delete slider with SweetAlert
  const deleteSlider = async (slider: Slider) => {
    const result = await Swal.fire({
      title: "Are you sure you want to delete this slider?",
      text: `"${slider.name.substring(0, 50)}..." will be deleted!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete!",
      cancelButtonText: "No",
    });

    if (result.isConfirmed) {
      try {
        await deleteSliderApi(slider.id);
        setSliders(sliders.filter(s => s.id !== slider.id));
        Swal.fire("Deleted!", "Slider successfully deleted.", "success");
        toast.success("Slider deleted!");
      } catch (err: any) {
        Swal.fire("Error!", err?.message || "Slider not deleted!", "error");
        toast.error(err?.message || "Slider not deleted!");
      }
    }
  };

  // Client-side filtering based on search term
  const filteredSliders = sliders.filter(slider =>
    slider.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchSliders();
  }, []);
  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold capitalize mb-9">
          slider
        </h1>
        <div className="flex items-center justify-end gap-3">
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-green-700 hover:bg-green-800 cursor-pointer transition-colors"
          >
            <FaPlus className="text-white text-base" />
            <span className="text-white text-base capitalize">add slider</span>
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
            placeholder="Search by slider name"
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
              {loading ? (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-gray-400">
                    Loading sliders...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-red-400">
                    Error: {error}
                  </td>
                </tr>
              ) : filteredSliders.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-gray-400">
                    {searchTerm ? 'No sliders found matching your search' : 'No sliders available'}
                  </td>
                </tr>
              ) : (
                filteredSliders.map((slider: Slider) => (
                  <tr key={slider.id} className="dark:bg-gray-800 dark:border-gray-700 border-b border-gray-300 hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4">
                      <div className="w-16 h-16 rounded-lg">
                        <img
                          src={slider.image}
                          alt={slider.name}
                          className="w-full h-full object-cover rounded"
                          onError={(e) => {
                            e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjMzc0MTUxIi8+CjxwYXRoIGQ9Ik0yMCAyMEg0NFY0NEgyMFYyMFoiIHN0cm9rZT0iIzk0QTNBOCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPHA+YXRoIGQ9Ik0yOCAyOEMzMCAyNiAzNCAyNiAzNiAyOEwzMiAzMkwyOCAyOFoiIGZpbGw9IiM5NEEzQTgiLz4KPGNpcmNsZSBjeD0iMjgiIGN5PSIyNiIgcj0iMiIgZmlsbD0iIzk0QTNBOCIvPgo8L3N2Zz4K';
                          }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-white font-medium">
                        {slider.name}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => handleEditSlider(slider)}
                          className="border-none outline-none bg-transparent hover:bg-gray-600 p-2 rounded"
                        >
                          <FaEdit className="text-gray-400 hover:text-white text-xl cursor-pointer transition-colors" />
                        </button>
                        <button 
                          onClick={() => deleteSlider(slider)}
                          className="border-none outline-none bg-transparent hover:bg-gray-600 p-2 rounded"
                        >
                          <FaTrashCan className="text-gray-400 hover:text-red-400 text-lg cursor-pointer transition-colors" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Slider Modal */}
      {showAddModal && (
        <AddSliderModal
          onClose={() => setShowAddModal(false)}
          onSuccess={refreshSliders}
        />
      )}

      {/* Update Slider Modal */}
      {showUpdateModal && selectedSlider && (
        <UpdateSliderModal
          onClose={() => setShowUpdateModal(false)}
          onSuccess={refreshSliders}
          slider={selectedSlider}
        />
      )}
    </div>
  );
};

export default SliderManagement;
