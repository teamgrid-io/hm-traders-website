import { API_URL } from "../api/Api";

type MediaRecord = {
  id: string | number;
  source_url?: string;
  link?: string;
};

type CategoryRecord = {
  id: string | number;
  slug?: string;
};

const fetchJson = async (url: string, options?: RequestInit) => {
  const res = await fetch(url, options);

  if (!res.ok) {
    const responseBody = await res.text().catch(() => "<unavailable>");

    console.error(
      `[API ${res.status}] ${options?.method || "GET"} ${url}\n${responseBody.slice(
        0,
        500
      )}`
    );

    return null;
  }

  return res.json();
};

const chunk = <T,>(items: T[], size: number) =>
  Array.from({ length: Math.ceil(items.length / size) }, (_, index) =>
    items.slice(index * size, index * size + size)
  );

/**
 * Global media cache.
 *
 * Once a media ID has been resolved, we don't need to ask
 * WordPress for it again during the same build/process.
 */
const mediaUrlCache = new Map<string, string>();

/**
 * Global category cache.
 */
const categoryCache = new Map<string, CategoryRecord>();

async function getMediaByIds(ids: unknown[]) {
  const uniqueIds = [...new Set(ids.filter(Boolean).map(String))];

  if (!uniqueIds.length) {
    return new Map<string, string>();
  }

  // Return already cached media immediately.
  const missingIds = uniqueIds.filter((id) => !mediaUrlCache.has(id));

  if (missingIds.length > 0) {
    const results = await Promise.all(
      chunk(missingIds, 50).map((idsChunk) =>
        fetchJson(
          `${API_URL}/media?include=${idsChunk.join(",")}&per_page=100`,
          {
            cache: "force-cache",
          }
        )
      )
    );

    const media = results.flatMap((items) =>
      Array.isArray(items) ? items : []
    );

    for (const item of media as MediaRecord[]) {
      const id = String(item.id);
      const url = item.source_url || item.link || "";

      mediaUrlCache.set(id, url);
    }

    // Prevent repeated requests for IDs that WordPress returned
    // without a usable URL.
    for (const id of missingIds) {
      if (!mediaUrlCache.has(id)) {
        mediaUrlCache.set(id, "");
      }
    }
  }

  return new Map(
    uniqueIds.map((id) => [id, mediaUrlCache.get(id) || ""])
  );
}

async function getCategoriesByIds(ids: unknown[]) {
  const uniqueIds = [...new Set(ids.filter(Boolean).map(String))];

  if (!uniqueIds.length) {
    return new Map<string, CategoryRecord>();
  }

  const missingIds = uniqueIds.filter((id) => !categoryCache.has(id));

  if (missingIds.length > 0) {
    const results = await Promise.all(
      chunk(missingIds, 50).map((idsChunk) =>
        fetchJson(
          `${API_URL}/product_category?include=${idsChunk.join(
            ","
          )}&per_page=100`,
          {
            cache: "force-cache",
          }
        )
      )
    );

    const categories = results.flatMap((items) =>
      Array.isArray(items) ? items : []
    );

    for (const category of categories as CategoryRecord[]) {
      categoryCache.set(String(category.id), category);
    }
  }

  return new Map(
    uniqueIds
      .map((id) => [id, categoryCache.get(id)])
      .filter(
        (entry): entry is [string, CategoryRecord] =>
          Boolean(entry[1])
      )
  );
}

export async function getProducts() {
  return loadProducts();
}

async function loadProducts() {
  try {
    const requestOptions: RequestInit = {
      cache: process.env.NODE_ENV === "development" ? "no-store" : "force-cache",
    };
    const productsUrl = `${API_URL}/products?per_page=100`;
    const res = await fetch(productsUrl, requestOptions);

    if (!res.ok) {
      const responseBody = await res.text().catch(() => "<unavailable>");

      console.error(
        `[API ${res.status}] GET ${productsUrl}\n${responseBody.slice(
          0,
          500
        )}`
      );

      throw new Error("Failed to fetch products");
    }

    const firstPage = await res.json();
    const totalPages = Number(res.headers.get("X-WP-TotalPages") || "1");
    const remainingPages = await Promise.all(
      Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) =>
        fetch(`${API_URL}/products?page=${index + 2}&per_page=100`, requestOptions).then(
          async (pageResponse) => {
            if (!pageResponse.ok) {
              throw new Error(`Failed to fetch products page ${index + 2}`);
            }

            return pageResponse.json();
          }
        )
      )
    );
    const data = [firstPage, ...remainingPages].flat();

    const categoryIds = data.flatMap((product: any) =>
      Array.isArray(product.product_category)
        ? product.product_category
        : []
    );

    /**
     * IMPORTANT:
     *
     * Previously you only fetched:
     *
     * product.acf.product_gallery[0]
     *
     * Now we collect ALL gallery images and catalogues once.
     */
    const imageIds = data.flatMap((product: any) => {
      const gallery = Array.isArray(product.acf?.product_gallery)
        ? product.acf.product_gallery
        : [];

      const catalogue = product.acf?.product_catalogue;

      return [
        ...gallery,
        catalogue,
      ].filter(Boolean);
    });

    // Fetch all required categories and media once.
    const [categories] = await Promise.all([
      getCategoriesByIds(categoryIds),
      getMediaByIds(imageIds),
    ]);

    const products = data.map((product: any) => {
      const categoryId = product.product_category?.[0];

      const category = categories.get(String(categoryId));

      const imageId = product.acf?.product_gallery?.[0];

      return {
        ...product,
        categorySlug: category?.slug || "",
        imgUrl: imageId
          ? mediaUrlCache.get(String(imageId)) || null
          : null,
      };
    });

    return products;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getCategoryBySlug(slug: string) {
  const res = await fetch(
    `${API_URL}/product_category?slug=${encodeURIComponent(slug)}`,
    {
      cache: "force-cache",
    }
  );

  if (!res.ok) {
    return null;
  }

  const data = await res.json();

  return data[0] || null;
}

export async function getProductsByCategorySlug(slug: string) {
  const products = await getProducts();

  return products.filter(
    (product: any) => product.categorySlug === slug
  );
}

export async function getProductBySlug(slug: string) {
  try {
    /**
     * This initializes the global product + media cache.
     *
     * It is important that this happens BEFORE trying to read
     * media URLs below.
     */
    const products = await getProducts();

    const product = products.find(
      (item: any) => item.slug === slug
    );

    if (!product) {
      return null;
    }

    const brandId = product?.brand;
    const categoryId = product?.product_category?.[0];

    /**
     * Brand and category can still be fetched in parallel.
     *
     * Media is NO LONGER fetched here.
     */
    const [brandData, categoryData] = await Promise.all([
      brandId
        ? fetch(`${API_URL}/brand/${brandId}`, {
            cache: "force-cache",
          }).then((res) => (res.ok ? res.json() : null))
        : Promise.resolve(null),

      categoryId
        ? fetch(
            `${API_URL}/product_category/${categoryId}`,
            {
              cache: "force-cache",
            }
          ).then((res) => (res.ok ? res.json() : null))
        : Promise.resolve(null),
    ]);

    const gallery = Array.isArray(product?.acf?.product_gallery)
      ? product.acf.product_gallery
      : [];

    /**
     * Read gallery images from the cache instead of making
     * another WordPress API request.
     */
    const imgUrl = gallery.map(
      (id: number | string) =>
        mediaUrlCache.get(String(id)) || null
    );

    const catalogueId = product.acf?.product_catalogue;

    const catalogueUrl = catalogueId
      ? mediaUrlCache.get(String(catalogueId)) || null
      : null;

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
        slug: categoryData?.slug ?? "",
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
    if (!query) {
      return [];
    }

    const res = await fetch(
      `https://headlesswp.teamgrid.co.in/wp-json/wp/v2/products?search=${encodeURIComponent(
        query
      )}`,
      {
        cache: "force-cache",
      }
    );

    if (!res.ok) {
      throw new Error("Search failed");
    }

    const data = await res.json();

    const categories = await getCategoriesByIds(
      data.map((product: any) => product.product_category?.[0])
    );

    const products = data.map((product: any) => ({
      ...product,
      categorySlug:
        categories.get(
          String(product.product_category?.[0])
        )?.slug || "",
    }));

    return products;
  } catch (error) {
    console.error(error);
    return [];
  }
}
