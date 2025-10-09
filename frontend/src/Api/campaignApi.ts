// Campaign types
export interface Campaign {
  id: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

const API_URL = "http://localhost:5050";

// Bütün kampaniyaları əldə etmək
export async function getCampaigns(): Promise<Campaign[]> {
  const res = await fetch(`${API_URL}/campaigns`);
  if (!res.ok) throw new Error("Kampaniyalar alınmadı");
  return res.json();
}

// ID ilə kampaniya əldə etmək
export async function getCampaignById(id: string): Promise<Campaign> {
  const res = await fetch(`${API_URL}/campaigns/${id}`);
  if (!res.ok) throw new Error("Kampaniya tapılmadı");
  return res.json();
}

// Yeni kampaniya yaratmaq
export async function createCampaign(campaignData: Omit<Campaign, 'id' | 'createdAt' | 'updatedAt'>): Promise<Campaign> {
  const res = await fetch(`${API_URL}/campaigns`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(campaignData),
  });
  if (!res.ok) throw new Error("Kampaniya yaradılmadı");
  return res.json();
}

// Kampaniyanı yeniləmək
export async function updateCampaign(
  id: string,
  campaignData: Partial<Omit<Campaign, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<Campaign> {
  const res = await fetch(`${API_URL}/campaigns/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(campaignData),
  });
  if (!res.ok) throw new Error("Kampaniya yenilənmədi");
  return res.json();
}

// Kampaniyanı silmək
export async function deleteCampaign(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/campaigns/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Kampaniya silinmədi");
}

// Kampaniya axtarışı
export async function searchCampaigns(query: string): Promise<Campaign[]> {
  const res = await fetch(`${API_URL}/campaigns?search=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error("Axtarış uğursuz oldu");
  return res.json();
}