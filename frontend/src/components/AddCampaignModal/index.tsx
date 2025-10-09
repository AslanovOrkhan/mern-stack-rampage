import React, { useState } from "react";
import { createCampaign } from "@/Api/campaignApi";
import { toast } from "react-toastify";
import { IoMdCloseCircleOutline } from "react-icons/io";

interface CreateCampaignModalProps {
  onClose: () => void;
}

const CreateCampaignModal: React.FC<CreateCampaignModalProps> = ({ onClose }) => {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!description.trim()) {
      toast.error("Campaign description cannot be empty.");
      return;
    }
    
    setLoading(true);
    
    try {
      await createCampaign({ description: description.trim() });
      toast.success("Campaign successfully created!");
      onClose();
    } catch (err: any) {
      toast.error(err?.message || "Campaign not created.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-white p-6 sm:p-8 rounded-xl w-full max-w-lg shadow-2xl transform transition-all duration-300">
        <div className="flex justify-between items-center pb-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Create a New Campaign
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
            <span className="ml-3 text-indigo-600 font-semibold">Creating...</span>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="campaign-description"
              className="block text-lg font-medium text-gray-700 mb-1"
            >
              Campaign Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="campaign-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter the campaign description"
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 resize-none"
              required
              disabled={loading}
            />
            <div className="text-sm text-gray-500 mt-1">
              {description.length}/500 characters
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Campaign"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCampaignModal;