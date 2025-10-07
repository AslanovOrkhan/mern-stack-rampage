import type { Category } from "../types/category";

const API_URL = "http://localhost:5050";

export async function getCategories(search?: string): Promise<Category[]> {
  let url = `${API_URL}/categories`;
  if (search && search.trim()) {
    url += `?search=${encodeURIComponent(search.trim())}`;
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error("Kategoriya alınmadı");
  return res.json();
}

export async function deleteCategory(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/categories/${id}`, { method: "DELETE" });
  if (!(res.ok || res.status === 204)) {
    throw new Error("Kateqoriya silinmədi");
  }
}
