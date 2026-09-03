import { API_URL } from "../api/Api";

const getImagesByIds = async (ids: any[]) => {
  const uniqueIds = [...new Set(ids.filter(Boolean).map(String))];
  if (!uniqueIds.length) return new Map<string, string>();

  const res = await fetch(
    `${API_URL}/media?include=${uniqueIds.join(",")}&per_page=100`,
    { cache: "force-cache" }
  );
  if (!res.ok) {
    const responseBody = await res.text().catch(() => "<unavailable>");
    console.error(
      `[API ${res.status}] GET ${API_URL}/media?include=${uniqueIds.join(",")}&per_page=100\n${responseBody.slice(0, 500)}`
    );
    return new Map<string, string>();
  }

  const media = await res.json();
  return new Map(
    (Array.isArray(media) ? media : []).map((item: any) => [
      String(item.id),
      item.source_url || item.link || "",
    ])
  );
};
export async function getEcatalogues() {
  try {
    const res = await fetch(`${API_URL}/products?per_page=100`, {
     cache: "force-cache",
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(
        `[API ${res.status}] GET ${API_URL}/products?per_page=100\n${errorText.slice(0, 500)}`
      );
      console.error("API error response:", errorText);
      throw new Error(`Failed to fetch eCatalogues: ${res.status} ${errorText}`);
    }

    const data = await res.json();
    const ecataloguesProduct = data.filter((product: any) => product.acf?.product_catalogue);
    const imageIds = ecataloguesProduct.flatMap((product: any) => [
      product.acf?.product_catalogue,
      product.acf?.product_gallery?.[0],
    ]);
    const images = await getImagesByIds(imageIds);
    const ecatalogues = ecataloguesProduct.map((product: any) => ({
      id: product.id,
      title: product.title?.rendered || "Untitled",
      catalogueUrl: images.get(String(product.acf?.product_catalogue)) || null,
      imageUrl: images.get(String(product.acf?.product_gallery?.[0])) || null,
    }));
    return ecatalogues || [];
  } catch (error) {
    console.error("Error fetching eCatalogues:", error);
    return [];
  }
}
