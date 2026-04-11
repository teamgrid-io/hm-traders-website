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
export async function getProducts() {
  try {
    const res = await fetch(`https://headlesswp.teamgrid.co.in/wp-json/wp/v2/products`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await res.json();
    const productsWithImages = await Promise.all(
      data.map(async (product: any) => {
        const imgUrl = await getImageById(product.acf?.product_gallery?.[0]);
        return { ...product, imgUrl };
      }
    ));
    console.log("Fetched products with images:", productsWithImages);
    return productsWithImages || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}


export async function getCategoryBySlug(slug: string) {
  const res = await fetch(
    `https://headlesswp.teamgrid.co.in/wp-json/wp/v2/product_category?slug=${slug}`,
    { cache: "no-store" }
  );

  const data = await res.json();
  
  return data[0] || null;
}


export async function getProductsByCategorySlug(slug: string) {
  const category = await getCategoryBySlug(slug);

  if (!category) return [];

  const res = await fetch(
    `https://headlesswp.teamgrid.co.in/wp-json/wp/v2/products?product_category=${category.id}`,
    { cache: "no-store" }
  );

  const data = await res.json();
  const products = await Promise.all(
    data.map(async (product: any) => {
      const imgUrl = await getImageById(product.acf?.product_gallery?.[0]);
      return { ...product, imgUrl };
    })
  );
  return products;
}
export async function getRelatedProductsByCategorySlug(id: any) {

  const cat = await fetch(
    `https://headlesswp.teamgrid.co.in/wp-json/wp/v2/product_category/${id}`,
    { cache: "no-store" }
  );
  const slug = await cat.json();
  const category = await getCategoryBySlug(slug.slug);

  if (!category) return [];

  const res = await fetch(
    `https://headlesswp.teamgrid.co.in/wp-json/wp/v2/products?product_category=${category.id}`,
    { cache: "no-store" }
  );

  const data = await res.json();
  const products = await Promise.all(
    data.map(async (product: any) => {
      const imgUrl = await getImageById(product.acf?.product_gallery?.[0]);
      return { ...product, imgUrl };
    })
  );
  return products;
}


export async function getProductBySlug(slug: string) {
  const res = await fetch(
    `https://headlesswp.teamgrid.co.in/wp-json/wp/v2/products?slug=${slug}`,
    { cache: "no-store" }
  );

 const data = await res.json();
const product = Array.isArray(data) ? data[0] : data;

if (!product) return null;

const gallery = Array.isArray(product.acf?.product_gallery)
  ? product.acf.product_gallery
  : [];

const imgUrl = await Promise.all(
  gallery.map((id: number) => getImageById(id))
);

return { ...product, imgUrl };
}
 



// import productsData from "@/data/products.json";

// export async function getProducts() {
//   try {
//     return productsData.docs;
//   } catch (error) {
//     console.error("[frontend] products load failed", error);
//     return [];
//   }
// }

// import categoriesData from "@/data/categories.json";

// export async function getCategoryBySlug(slug) {
//   return categoriesData.docs.find(cat => cat.slug === slug) || null;
// }

// export async function getProductsByCategorySlug(slug) {
//   const category = await getCategoryBySlug(slug);
//   if (!category) return [];

//   return productsData.docs.filter(
//     product => product.category === category.id
//   );
// }

// export async function getProductBySlug(slug) {
//   return productsData.docs.find(p => p.slug === slug) || null;
// }

// export async function getProductsByCategorySlugPagination(
//   slug,
//   page = 1,
//   limit = 5
// ) {
//   try {
//     const category = await getCategoryBySlug(slug);
//     if (!category) {
//       return { products: [], totalPages: 1, page: 1 };
//     }

//     const filtered = productsData.docs.filter(
//       product => product.category === category.id
//     );

//     const start = (page - 1) * limit;
//     const end = start + limit;

//     return {
//       products: filtered.slice(start, end),
//       totalPages: Math.ceil(filtered.length / limit),
//       page
//     };
//   } catch (error) {
//     console.error("[frontend] pagination failed", error);
//     return { products: [], totalPages: 1, page: 1 };
//   }
// }

