import type { Category } from "../types/category";

const API_URL = "http://localhost:5050";

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${API_URL}/categories`);
  if (!res.ok) throw new Error("Kategoriya alınmadı");
  return res.json();
}

export async function deleteCategory(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/categories/${id}`, { method: "DELETE" });
  if (!(res.ok || res.status === 204)) {
    throw new Error("Kateqoriya silinmədi");
  }
}
