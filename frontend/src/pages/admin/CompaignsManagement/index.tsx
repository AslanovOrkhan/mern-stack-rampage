import { FaEdit } from "react-icons/fa";
import { FaPlus, FaTrashCan } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { useState, useEffect } from "react";
import { getCampaigns, deleteCampaign as deleteCampaignApi, type Campaign } from "@/Api/campaignApi";
import AddCampaignModal from "@/components/AddCampaignModal";
import UpdateCampaignModal from "@/components/UpdateCampaignModal";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const CampaignsManagement = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  // Fetch campaigns from backend (without search - get all data)
  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const data = await getCampaigns();
      setCampaigns(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching campaigns:', err);
      setError('Failed to fetch campaigns');
    } finally {
      setLoading(false);
    }
  };

  // Refresh campaigns after modal operations
  const refreshCampaigns = () => {
    fetchCampaigns();
  };

  // Client-side filtering based on search term
  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Delete campaign with SweetAlert
  const deleteCampaign = async (campaign: Campaign) => {
    const result = await Swal.fire({
      title: "Are you sure you want to delete this campaign?",
      text: `"${campaign.description.substring(0, 50)}..." will be deleted!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete!",
      cancelButtonText: "No",
    });

    if (result.isConfirmed) {
      try {
        await deleteCampaignApi(campaign.id);
        setCampaigns(campaigns.filter(c => c.id !== campaign.id));
        Swal.fire(
          "Deleted!",
          "Campaign successfully deleted.",
          "success"
        );
        toast.success("Campaign deleted!");
      } catch (err: any) {
        Swal.fire(
          "Error!",
          err?.message || "Campaign not deleted!",
          "error"
        );
        toast.error(err?.message || "Campaign not deleted!");
      }
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);
  return (
    <div>
      {showAddModal && (
        <AddCampaignModal
          onClose={() => {
            setShowAddModal(false);
            refreshCampaigns();
          }}
        />
      )}
      
      {showUpdateModal && selectedCampaign && (
        <UpdateCampaignModal
          campaign={selectedCampaign}
          onClose={() => {
            setShowUpdateModal(false);
            setSelectedCampaign(null);
            refreshCampaigns();
          }}
        />
      )}
      
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold capitalize mb-9">
          campaigns
        </h1>
        <div className="flex items-center justify-end gap-3">
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-green-700 hover:bg-green-800 cursor-pointer transition-colors"
          >
            <FaPlus className="text-white text-base" />
            <span className="text-white text-base capitalize">
              add campaign
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
            placeholder="Search by campaign description"
          />
          <IoSearch className="text-gray-400" />
        </div>
        <div className="relative overflow-x-auto sm:rounded-lg border border-gray-400 mt-6">
          <table className="w-full text-sm text-left rtl:text-right text-white">
            <thead className="text-xs text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Campaign Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr key="loading-row">
                  <td colSpan={2} className="px-6 py-8 text-center text-gray-400">
                    Loading campaigns...
                  </td>
                </tr>
              ) : error ? (
                <tr key="error-row">
                  <td colSpan={2} className="px-6 py-8 text-center text-red-400">
                    Error: {error}
                  </td>
                </tr>
              ) : filteredCampaigns.length === 0 ? (
                <tr key="no-data-row">
                  <td colSpan={2} className="px-6 py-8 text-center text-gray-400">
                    {searchTerm ? 'No campaigns found matching your search' : 'No campaigns available'}
                  </td>
                </tr>
              ) : (
                filteredCampaigns.map((campaign: Campaign) => (
                  <tr key={campaign.id} className="dark:bg-gray-800 dark:border-gray-700 border-b border-gray-300 hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-white font-medium">
                        {campaign.description}
                      </div>
                      <div className="text-gray-400 text-sm mt-1">
                        Created: {new Date(campaign.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => {
                          setSelectedCampaign(campaign);
                          setShowUpdateModal(true);
                        }}
                        className="border-none outline-none bg-transparent hover:bg-blue-600 p-2 rounded transition-colors"
                        title="Edit Campaign"
                      >
                        <FaEdit className="text-gray-400 hover:text-white text-xl cursor-pointer" />
                      </button>
                      <button 
                        onClick={() => deleteCampaign(campaign)}
                        className="border-none outline-none bg-transparent ml-3 hover:bg-red-600 p-2 rounded transition-colors"
                        title="Delete Campaign"
                      >
                        <FaTrashCan className="text-gray-400 hover:text-white text-lg cursor-pointer" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CampaignsManagement;
