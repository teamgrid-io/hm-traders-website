import { API_URL } from '../api/Api';

export async function getProducts() {
  try {
    const url = `${API_URL}/products`;
    console.log('[frontend] fetching products from', url);
    const res = await fetch(url, {
      cache: "no-store",
    });

    if (!res.ok) {
      const errorText = await res.text().catch(() => '<no body>');
      console.error('[frontend] products fetch failed', res.status, errorText);
      throw new Error(`Failed to fetch products: ${res.status}`);
    }

    const data = await res.json();
    console.log("Products data:", data); // Debugging log
    return data.docs || [];
  } catch (error) {
    console.error('[frontend] Error fetching products:', error);
    return [];
  }
}


export async function getAbout() {
  const url = `${API_URL}/about`;
  console.log('[frontend] fetching about from', url)
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
  console.log('[frontend] fetching whychoose from', url)
  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error('[frontend] whychoose fetch failed', res.status, await res.text().catch(()=>'<no body>'))
    throw new Error("Failed to fetch whychoose data");
  }

  return res.json();
}
