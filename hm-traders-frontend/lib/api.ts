import { API_URL } from '../api/Api';

// Types
export interface Media {
  source_url: string;
  alt_text?: string;
}

export interface Brand {
  id: string;
  name: string;
  link: string;
  acf?: {
    brand_image?: number;
  };
  logo?: string | null;
}

// Generic fetch helper
async function fetchAPI<T = any>(endpoint: string): Promise<T | null> {
  try {
    const url = `${API_URL}${endpoint}`;
    const res = await fetch(url, {
     cache: "force-cache"
    });
    if (!res.ok) {
      const responseBody = await res.text().catch(() => "<unavailable>");
      console.error(
        `[API ${res.status}] GET ${url}\n${responseBody.slice(0, 500)}`
      );
      throw new Error(`API Error: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Fetch Error:", error);
    return null;
  }
}

// Dynamic Page Fetch
export async function getPageById(pageId: string | number): Promise<any[]> {
  const data = await fetchAPI<any>(`/pages/${pageId}`);
  return data?.acf?.page_layout || [];
}

// Media
export async function getMedia(id: string | number): Promise<Media | null> {
  const data = await fetchAPI<Media>(`/media/${id}`);
  return data || null;
}

// Brands
export async function getBrands(): Promise<Brand[]> {
  const data = await fetchAPI<Brand[]>("/brand");
  return data || [];
}