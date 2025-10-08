import React, { useState } from "react";
import type { ChangeEvent } from "react";
import { createBrand } from "@/Api/brandApi";
import { toast } from "react-toastify";
import { IoMdCloseCircleOutline } from "react-icons/io";
interface CreateBrandModalProps {
  onClose: () => void;
}

const CreateBrandModal: React.FC<CreateBrandModalProps> = ({ onClose }) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [brandName, setBrandName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const url: string = URL.createObjectURL(file);
      setImagePreviewUrl(url);
    } else {
      setImageFile(null);
      setImagePreviewUrl(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!brandName.trim()) {
      toast.error("Brand name cannot be empty.");
      return;
    }
    if (!imageFile) {
      toast.error("Brand image must be selected.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("name", brandName);
    formData.append("image", imageFile);
    try {
      await createBrand(formData);
      toast.success("Brand successfully created!");
      onClose();
    } catch (err: any) {
      toast.error(err?.message || "Brand not created.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-white p-6 sm:p-8 rounded-xl w-full max-w-lg shadow-2xl transform transition-all duration-300">
        <div className="flex justify-between items-center pb-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Create a New Brand
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition duration-150 p-1 cursor-pointer"
            aria-label="Modali bağla"
          >
            <IoMdCloseCircleOutline className="text-2xl text-black" />
          </button>
        </div>

        {loading && (
          <div className="flex justify-center items-center my-4">
            <svg className="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
            <span className="ml-3 text-indigo-600 font-semibold">Creating...</span>
          </div>
        )}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="brand-name"
              className="block text-lg font-medium text-gray-700 mb-1"
            >
              Brand Name <span className="text-black">*</span>
            </label>
            <input
              type="text"
              id="brand-name"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="Enter the brand name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label
              htmlFor="brand-img-file"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Image Download
            </label>

            <input
              type="file"
              id="brand-img-file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-indigo-50 file:text-indigo-700
                  hover:file:bg-indigo-100 transition duration-150"
              disabled={loading}
            />

            {imagePreviewUrl && (
              <div className="mt-4 w-32 h-32 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden">
                <img
                  src={imagePreviewUrl}
                  alt="Kateqoriya Önizləməsi"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-150"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Brand"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBrandModal;
