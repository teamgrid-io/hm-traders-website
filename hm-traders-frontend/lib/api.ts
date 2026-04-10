import { API_URL } from '../api/Api';

// export async function getProducts() {
//   try {
//     const url = `${API_URL}/products`;
//     console.log('[frontend] fetching products from', url);
//     const res = await fetch(url, {
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       const errorText = await res.text().catch(() => '<no body>');
//       console.error('[frontend] products fetch failed', res.status, errorText);
//       throw new Error(`Failed to fetch products: ${res.status}`);
//     }

//     const data = await res.json();
//     console.log("Products data:", data); // Debugging log
//     return data.docs || [];
//   } catch (error) {
//     console.error('[frontend] Error fetching products:', error);
//     return [];
//   }
// }


export async function getAbout() {
  const url = `${API_URL}/about`;
  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error('[frontend] about fetch failed', res.status, await res.text().catch(()=>'<no body>'))
    throw new Error("Failed to fetch about data");
  }

  return res.json();
}


export async function getWhyChoose() {
  const url = `${API_URL}/whychoose`;
  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error('[frontend] whychoose fetch failed', res.status, await res.text().catch(()=>'<no body>'))
    throw new Error("Failed to fetch whychoose data");
  }

  return res.json();
}

//wordpress 
const BASE_URL = "https://headlesswp.teamgrid.co.in/wp-json/wp/v2";

// ✅ Common fetch helper
async function fetchAPI(endpoint) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`API Error: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Fetch Error:", error);
    return null;
  }
}

// ✅ 🔥 Dynamic Page Fetch
export async function getPageById(pageId) {
  const data = await fetchAPI(`/pages/${pageId}`);
  return data?.acf?.page_layout || [];
}

// ✅ Media (same)
export async function getMedia(id) {
  const data = await fetchAPI(`/media/${id}`);
  return data || null;
}
export async function getBrands() {
  const data = await fetchAPI("/brand");
  return data || [];
}