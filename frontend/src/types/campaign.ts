// Campaign interface
export interface Campaign {
  _id: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

// Campaign interface - updated to match backend
export interface Campaign {
  id: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

// Create Campaign interface (without auto-generated fields)
export interface CreateCampaignData {
  description: string;
}

// Update Campaign interface (partial data)
export interface UpdateCampaignData {
  description?: string;
}