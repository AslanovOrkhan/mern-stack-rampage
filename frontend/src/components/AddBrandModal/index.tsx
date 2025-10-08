import React, { useState } from "react";
import type { ChangeEvent } from "react";
import { createBrand } from "@/Api/brandApi";
import { toast } from "react-toastify";
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
      toast.error("Brand adı boş ola bilməz");
      return;
    }
    if (!imageFile) {
      toast.error("Brand şəkli seçilməlidir");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("name", brandName);
    formData.append("image", imageFile);
    try {
      await createBrand(formData);
      toast.success("Brand uğurla yaradıldı!");
      onClose();
    } catch (err: any) {
      toast.error(err?.message || "Brand yaradılmadı");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-white p-6 sm:p-8 rounded-xl w-full max-w-lg shadow-2xl transform transition-all duration-300">
        <div className="flex justify-between items-start border-b pb-4 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Yeni Kateqoriya Yarat
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition duration-150 p-1"
            aria-label="Modali bağla"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="brand-name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Brand Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="brand-name"
              value={brandName}
              onChange={e => setBrandName(e.target.value)}
              placeholder="Məs: Elektronika, Əl işləri"
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
              {loading ? "Yaradılır..." : "Brand Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBrandModal;
