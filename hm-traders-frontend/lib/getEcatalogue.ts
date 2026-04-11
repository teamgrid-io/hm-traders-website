import { API_URL } from "../api/Api";
const getImageById = async (id: any) => {
  if (!id) return null;

  const res = await fetch(
    `https://headlesswp.teamgrid.co.in/wp-json/wp/v2/media/${id}`
  );

  if (!res.ok) return null;

  const imgData = await res.json();
  return imgData?.source_url || imgData?.link || null;
};
export async function getEcatalogues() {
  try {
    const res = await fetch(`https://headlesswp.teamgrid.co.in/wp-json/wp/v2/products`, {
      cache: "no-store",
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("API error response:", errorText);
      throw new Error(`Failed to fetch eCatalogues: ${res.status} ${errorText}`);
    }

    const data = await res.json();
    const ecataloguesProduct = await data.filter((product: any) => product.acf?.product_catalogue);
    const ecatalogues = await Promise.all(
      ecataloguesProduct.map(async (product: any) => {
        const catalogueId = product.acf?.product_catalogue;
        if (catalogueId) {
          return {
            id: product.id,
            title: product.title?.rendered || "Untitled",
            catalogueUrl: await getImageById(catalogueId),
            imageUrl: await getImageById(product.acf?.product_gallery?.[0]),
          };
        }
      })
    );
    return ecatalogues || [];
  } catch (error) {
    console.error("Error fetching eCatalogues:", error);
    return [];
  }
}
