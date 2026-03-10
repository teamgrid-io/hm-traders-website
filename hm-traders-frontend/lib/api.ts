const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';


export async function getProducts() {
  const res = await fetch(`${API_URL}/products`);

  const data = await res.json();
  console.log("Products data:", data); // Debugging log
  return data.docs;
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

export async function getBrands() {
  const url = `${API_URL}/brands`;
  console.log('[frontend] fetching brands from', url)
  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error('[frontend] brands fetch failed', res.status, await res.text().catch(()=>'<no body>'))
    throw new Error("Failed to fetch brands data");
  }

  return res.json();
}

