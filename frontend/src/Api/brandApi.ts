import type { Brand } from "../types/brand";

const API_URL = "http://localhost:5050";

// Bütün brandları əldə etmək
export async function getBrands(): Promise<Brand[]> {
  const res = await fetch(`${API_URL}/brands`);
  if (!res.ok) throw new Error("Brandlar alınmadı");
  return res.json();
}

// Yeni brand yaratmaq
export async function createBrand(data: FormData): Promise<Brand> {
  const res = await fetch(`${API_URL}/brands`, {
    method: "POST",
    body: data,
  });
  if (!res.ok) throw new Error("Brand yaradılmadı");
  return res.json();
}

// Brand silmək
export async function deleteBrand(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/brands/${id}`, { method: "DELETE" });
  if (!(res.ok || res.status === 204)) {
    throw new Error("Brand silinmədi");
  }
}
