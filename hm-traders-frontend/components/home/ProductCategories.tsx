"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { getCategories } from "@/lib/getCategories";
import { constructMediaUrl } from "@/lib/constructMediaUrl";
import Pagination from "../common/Pagination";
import Loader from "../common/Loader";

interface Category {
  id: string;
  name: string;
  slug: string;
  image_url: string;
  link: string;
}

export default function ProductCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);

        const data = await getCategories();

        setCategories(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  // ✅ SHOW LOADER
  if (loading) {
    return <Loader />;
  }

  const ITEMS_PER_PAGE = 9;

  const totalPages = Math.ceil(categories.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const paginatedCategories = categories.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <section className="py-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {paginatedCategories.map((cat) => {
          const imageUrl = constructMediaUrl(cat.image_url);

          return (
            <div
              key={cat.id}
              className="relative rounded-lg overflow-hidden group bg-gray-100"
            >
              <div className="relative w-full h-[280px]">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">{cat.name}</span>
                  </div>
                )}
              </div>

              <Link
                href={`/products/${cat.slug}`}
                className="absolute bottom-4 left-4 right-4 bg-[#FF9C00] text-white flex items-center justify-between px-6 py-4 rounded-md font-semibold hover:bg-[#e09112] transition-colors"
              >
                {cat.name}
                <span className="text-xl">›</span>
              </Link>
            </div>
          );
        })}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/products"
      />
    </section>
  );
}