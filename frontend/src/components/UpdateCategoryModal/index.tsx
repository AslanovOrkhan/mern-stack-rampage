import React, { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import { toast } from "react-toastify";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { updateCategory } from "../../Api/categoryApi";
import type { Category } from "../../types/category";

interface UpdateCategoryModalProps {
  onClose: () => void;
  onSuccess?: () => void;
  category: Category;
}

const UpdateCategoryModal: React.FC<UpdateCategoryModalProps> = ({ onClose, onSuccess, category }) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (category) {
      setCategoryName(category.name);
      setCategoryDescription(category.description);
      setImagePreviewUrl(category.image || null);
    }
  }, [category]);

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
    if (!categoryName.trim()) {
      toast.error("Category name cannot be empty!");
      return;
    }
    if (!categoryDescription.trim()) {
      toast.error("Category description cannot be empty!");
      return;
    }
    
    setLoading(true);
    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("description", categoryDescription);
    
    if (imageFile) {
      formData.append("image", imageFile);
    } else if (category?.image) {
      formData.append("image", category.image);
    }
    
    try {
      await updateCategory(category.id as string, formData);
      toast.success("Category successfully updated!");
      onSuccess?.(); // Refresh the category list
      onClose();
    } catch (err: any) {
      toast.error(err?.message || "Category not updated.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-white p-6 sm:p-8 rounded-xl w-full max-w-lg shadow-2xl transform transition-all duration-300">
        <div className="flex justify-between items-center pb-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Update Category
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition duration-150 p-1 cursor-pointer"
            aria-label="Close modal"
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
            <span className="ml-3 text-indigo-600 font-semibold">Updating...</span>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="category-name"
              className="block text-lg font-medium text-gray-700 mb-1"
            >
              Category Name <span className="text-black">*</span>
            </label>
            <input
              type="text"
              id="category-name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter the category name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label
              htmlFor="category-description"
              className="block text-lg font-medium text-gray-700 mb-1"
            >
              Category Description <span className="text-black">*</span>
            </label>
            <textarea
              id="category-description"
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
              placeholder="Enter the category description"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
              rows={3}
              required
              disabled={loading}
            />
          </div>

          <div>
            <label
              htmlFor="category-img-file"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Category Image
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
              disabled={loading}
            />

            {imagePreviewUrl && (
              <div className="mt-4 w-32 h-32 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden">
                <img
                  src={imagePreviewUrl}
                  alt="Category Preview"
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
              {loading ? "Updating..." : "Update Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategoryModal;
