import React, { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import { updateSlider, type Slider } from "@/Api/sliderApi";
import { toast } from "react-toastify";
import { IoMdCloseCircleOutline } from "react-icons/io";

interface UpdateSliderModalProps {
  onClose: () => void;
  onSuccess: () => void;
  slider: Slider;
}

const UpdateSliderModal: React.FC<UpdateSliderModalProps> = ({ 
  onClose, 
  onSuccess, 
  slider 
}) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [sliderName, setSliderName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (slider) {
      setSliderName(slider.name);
      setImagePreviewUrl(slider.image);
    }
  }, [slider]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const url: string = URL.createObjectURL(file);
      setImagePreviewUrl(url);
    } else {
      setImageFile(null);
      // Əgər fayl seçilməyibsə, köhnə şəkili göstər
      setImagePreviewUrl(slider.image);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!sliderName.trim()) {
      toast.error("Slider name cannot be empty.");
      return;
    }

    setLoading(true);
    try {
      const updateData: any = {
        name: sliderName.trim(),
        slug: sliderName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
      };

      // Əgər yeni fayl seçilibsə, onu əlavə et
      if (imageFile) {
        const tempImageUrl = URL.createObjectURL(imageFile);
        updateData.image = tempImageUrl;
      }

      await updateSlider(slider.id, updateData);
      
      toast.success("Slider updated successfully!");
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error("Error updating slider:", error);
      toast.error(error.message || "Failed to update slider");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-white p-6 sm:p-8 rounded-xl w-full max-w-lg shadow-2xl transform transition-all duration-300">
        <div className="flex justify-between items-center pb-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Update Slider
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
            <svg
              className="animate-spin h-8 w-8 text-indigo-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
            <span className="ml-3 text-indigo-600 font-semibold">
              Updating...
            </span>
          </div>
        )}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="slider-name"
              className="block text-lg font-medium text-gray-700 mb-1"
            >
              Slider Name <span className="text-black">*</span>
            </label>
            <input
              type="text"
              id="slider-name"
              value={sliderName}
              onChange={(e) => setSliderName(e.target.value)}
              placeholder="Enter the slider name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label
              htmlFor="slider-img-file"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Image Download (Optional - leave empty to keep current image)
            </label>

            <input
              type="file"
              id="slider-img-file"
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
                  alt="Slider Önizləməsi"
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
              {loading ? "Updating..." : "Update Slider"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateSliderModal;