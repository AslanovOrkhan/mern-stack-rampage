import type { Category } from "../types/category";

const API_URL = "http://localhost:5050";

// Bütün kateqoriyaları əldə etmək
export async function getCategories(search?: string): Promise<Category[]> {
  let url = `${API_URL}/categories`;
  if (search && search.trim()) {
    url += `?search=${encodeURIComponent(search.trim())}`;
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error("Kateqoriyalar alınmadı");
  return res.json();
}

// ID ilə kateqoriya əldə etmək
export async function getCategoryById(id: string): Promise<Category> {
  const res = await fetch(`${API_URL}/categories/${id}`);
  if (!res.ok) throw new Error("Kateqoriya tapılmadı");
  return res.json();
}

// Yeni kateqoriya yaratmaq
export async function createCategory(formData: FormData): Promise<Category> {
  console.log("Sending FormData:");
  for (let pair of formData.entries()) {
    console.log(pair[0] + ': ' + pair[1]);
  }
  
  const res = await fetch(`${API_URL}/categories`, {
    method: "POST",
    body: formData,
  });
  
  const responseData = await res.json();
  console.log("Response:", responseData);
  
  if (!res.ok) {
    throw new Error(responseData.message || "Kateqoriya yaradılmadı");
  }
  
  return responseData.data || responseData;
}

// Kateqoriya yeniləmək
export async function updateCategory(id: string, formData: FormData): Promise<Category> {
  const res = await fetch(`${API_URL}/categories/${id}`, {
    method: "PATCH",
    body: formData,
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Kateqoriya yenilənmədi");
  }
  return res.json();
}

// Kateqoriya silmək
export async function deleteCategory(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/categories/${id}`, { method: "DELETE" });
  if (!(res.ok || res.status === 204)) {
    throw new Error("Kateqoriya silinmədi");
  }
}

// Çoxlu kateqoriya silmək
export async function deleteManyCategories(ids: string[]): Promise<void> {
  const res = await fetch(`${API_URL}/categories/bulk-delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ids }),
  });
  if (!res.ok) {
    throw new Error("Kateqoriyalar silinmədi");
  }
}