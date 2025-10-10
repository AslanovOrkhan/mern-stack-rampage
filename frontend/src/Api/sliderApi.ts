// Slider types
export interface Slider {
  id: string;
  name: string;
  image: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

const API_URL = "http://localhost:5050";

// Bütün slider-ləri əldə etmək
export async function getSliders(): Promise<Slider[]> {
  const res = await fetch(`${API_URL}/sliders`);
  if (!res.ok) throw new Error("Slider-lər alınmadı");
  return res.json();
}

// ID ilə slider əldə etmək
export async function getSliderById(id: string): Promise<Slider> {
  const res = await fetch(`${API_URL}/sliders/${id}`);
  if (!res.ok) throw new Error("Slider tapılmadı");
  return res.json();
}

// Yeni slider yaratmaq
export async function createSlider(data: FormData): Promise<Slider> {
  const res = await fetch(`${API_URL}/sliders`, {
    method: "POST",
    body: data,
  });
  
  if (!res.ok) {
    const errorData = await res.text();
    throw new Error(errorData || "Slider yaradılmadı");
  }
  
  return res.json();
}

// Slider yeniləmək
export async function updateSlider(id: string, slider: Partial<Omit<Slider, "id" | "createdAt" | "updatedAt">>): Promise<Slider> {
  const res = await fetch(`${API_URL}/sliders/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(slider),
  });
  
  if (!res.ok) {
    const errorData = await res.text();
    throw new Error(errorData || "Slider yenilənmədi");
  }
  
  return res.json();
}

// Slider silmək
export async function deleteSlider(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/sliders/${id}`, {
    method: "DELETE",
  });
  
  if (!res.ok) {
    const errorData = await res.text();
    throw new Error(errorData || "Slider silinmədi");
  }
}