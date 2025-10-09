import type { Brand } from "../types/brand";

const API_URL = "http://localhost:5050";

export async function getBrands(): Promise<Brand[]> {
  const res = await fetch(`${API_URL}/brands`);
  if (!res.ok) throw new Error("Brandlar alınmadı");
  return res.json();
}
