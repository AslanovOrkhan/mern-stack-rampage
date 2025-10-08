import React, { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import type { Category } from "@/types/category";

interface CreateCategoryModalProps {
  onClose: () => void;
  mode?: "create" | "update";
  category?: Category;
}

const CreateCategoryModal: React.FC<CreateCategoryModalProps> = ({ onClose, mode = "create", category }) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mode === "update" && category) {
      setName(category.name);
      setDescription(category.description);
      setImagePreviewUrl(category.image || null);
    }
  }, [mode, category]);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setImageFile(file || null);
    if (file) {
      const url: string = URL.createObjectURL(file);
      setImagePreviewUrl(url);
    } else {
      setImagePreviewUrl(category?.image || null);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!name || !description || (mode === "create" && !imageFile && !imagePreviewUrl)) {
      alert("Bütün sahələri doldurun!");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (imageFile) {
      formData.append("image", imageFile);
    } else if (mode === "update" && category?.image) {
      formData.append("image", category.image);
    }

    try {
      let response;
      if (mode === "create") {
        response = await fetch("http://localhost:5050/categories", {
          method: "POST",
          body: formData
        });
      } else if (mode === "update" && category?.id) {
        response = await fetch(`http://localhost:5050/categories/${category.id}`, {
          method: "PATCH",
          body: formData
        });
      }
      if (response && response.ok) {
        toast.success(mode === "create" ? "Kateqoriya uğurla yaradıldı!" : "Kateqoriya uğurla yeniləndi!");
        onClose();
      } else {
        const data = response ? await response.json() : {};
        toast.error(data.message || "Xəta baş verdi!");
      }
    } catch (error) {
      toast.error("Serverə qoşulmaq mümkün olmadı!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      
      <div className="bg-white p-6 sm:p-8 rounded-xl w-full max-w-lg shadow-2xl transform transition-all duration-300">
        
        <div className="flex justify-between items-start border-b pb-4 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            {mode === "create" ? "Yeni Kateqoriya Yarat" : "Kateqoriyanı Redaktə Et"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition duration-150 p-1"
            aria-label="Modali bağla"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {loading && (
          <div className="flex justify-center items-center my-4">
            <svg className="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
            <span className="ml-3 text-indigo-600 font-semibold">Yüklənir...</span>
          </div>
        )}
        <form className="space-y-6" onSubmit={handleSubmit}>
          
          <div>
            <label htmlFor="category-name" className="block text-sm font-medium text-gray-700 mb-1">
              Kateqoriya Adı <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="category-name"
              value={name}
              onChange={handleNameChange}
              placeholder="Məs: Elektronika, Əl işləri"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
              required
            />
          </div>
          
          <div>
            <label htmlFor="category-img-file" className="block text-sm font-medium text-gray-700 mb-2">
              Şəkil Yüklə
            </label>
            
            <input
              type="file"
              id="category-img-file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100 transition duration-150"
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

          <div>
            <label htmlFor="category-description" className="block text-sm font-medium text-gray-700 mb-1">
              Təsvir (Qısa Məlumat)
            </label>
            <textarea
              id="category-description"
              rows={3}
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Bu kateqoriya haqqında qısa məlumatı daxil edin."
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-150"
            >
              {mode === "create" ? "Kateqoriyanı Yarat" : "Kateqoriyanı Yenilə"}
            </button>
          </div>
        </form>
        
      </div>
      
    </div>
  )
}

export default CreateCategoryModal;