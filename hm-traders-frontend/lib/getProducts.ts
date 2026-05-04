import { API_URL } from "../api/Api";    
const getImageById = async (id: any) => {
  if (!id) return null;

  const res = await fetch(
    `${API_URL}/media/${id}`
  );

  if (!res.ok) return null;

  const imgData = await res.json();
  return imgData?.source_url || imgData?.link || null;
};

export async function getProducts() {
  try {
    const res = await fetch(
      `${API_URL}/products`,
      { cache: "force-cache" }
    );

    if (!res.ok) throw new Error("Failed to fetch products");

    const data = await res.json();

    const products = await Promise.all(
      data.map(async (product: any) => {
        const catId = product.product_category?.[0];

        let categorySlug = "";

        if (catId) {
          const catRes = await fetch(
            `${API_URL}/product_category/${catId}`
          );
          const catData = await catRes.json();
          categorySlug = catData?.slug || "";
        }
        const imgUrl = await getImageById(product.acf?.product_gallery?.[0]);

        return {
          ...product,
          categorySlug,
          imgUrl,
        };
      })
    );

    return products;
  } catch (error) {
    console.error(error);
    return [];
  }
}
export async function getCategoryBySlug(slug: string) {
  const res = await fetch(
    `${API_URL}/product_category?slug=${slug}`,
    {cache: "force-cache" }
  );

  const data = await res.json();
  
  return data[0] || null;
}


export async function getProductsByCategorySlug(slug: string) {
  const category = await getCategoryBySlug(slug);
  if (!category) return [];

  const res = await fetch(
    `${API_URL}/products?product_category=${category.id}`,
    { cache: "force-cache" }
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
  try {
    const res = await fetch(
      `${API_URL}/products?slug=${slug}`,
      { cache: "force-cache" }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch product: ${res.status}`);
    }

    const data = await res.json();
    const product = Array.isArray(data) ? data[0] : data;

    if (!product) return null;

    const brandId = product?.brand;
    const categoryId = product?.product_category?.[0];

    // Fetch brand & category in parallel
    const [brandData, categoryData] = await Promise.all([
      brandId
        ? fetch(`${API_URL}/brand/${brandId}`, {
            cache: "force-cache",
          }).then((res) => (res.ok ? res.json() : null))
        : Promise.resolve(null),

      categoryId
        ? fetch(
            `${API_URL}/product_category/${categoryId}`,
            { cache: "force-cache" }
          ).then((res) => (res.ok ? res.json() : null))
        : Promise.resolve(null),
    ]);

    const gallery = Array.isArray(product?.acf?.product_gallery)
      ? product.acf.product_gallery
      : [];

    const imgUrl = await Promise.all(
      gallery.map((id: number) => getImageById(id))
    );
    const catalogueUrl = await getImageById(product.acf?.product_catalogue);

    return {
      ...product,
      brand: {
        id: brandId,
        name: brandData?.name ?? "Unknown",
        slug: brandData?.slug ?? "",
      },
      product_category: {
        id: categoryId,
        name: categoryData?.name ?? "Unknown",
        slug: categoryData?.slug ?? "", // ✅ slug added here
      },
      imgUrl,
      catalogueUrl,
    };
  } catch (error) {
    console.error("Error in getProductBySlug:", error);
    return null;
  }
}
 

export async function getProductsBySearch(query: string) {
  try {
    if (!query) return [];

    const res = await fetch(
      `https://headlesswp.teamgrid.co.in/wp-json/wp/v2/products?search=${query}`,
      { cache: "force-cache" }
    );

    if (!res.ok) throw new Error("Search failed");

    const data = await res.json();

    const products = await Promise.all(
      data.map(async (product: any) => {
        const catId = product.product_category?.[0];

        let categorySlug = "";

        if (catId) {
          const catRes = await fetch(
            `${API_URL}/product_category/${catId}`
          );
          const catData = await catRes.json();
          categorySlug = catData?.slug || "";
        }

        return {
          ...product,
          categorySlug, // ✅ ADD THIS
        };
      })
    );

    return products;
  } catch (error) {
    console.error(error);
    return [];
  }
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

