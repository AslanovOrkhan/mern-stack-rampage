export async function deleteBrand(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/brands/${id}`, { method: "DELETE" });
  if (!(res.ok || res.status === 204)) {
    throw new Error("Brand silinmədi");
  }
}
import type { Brand } from "../types/brand";

const API_URL = "http://localhost:5050";

export async function createBrand(data: FormData): Promise<Brand> {
  const res = await fetch(`${API_URL}/brands`, {
    method: "POST",
    body: data,
  });
  if (!res.ok) throw new Error("Brand yaradılmadı");
  return res.json();
}
