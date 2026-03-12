import Link from "next/link";
import Image from "next/image";
import { getCategories } from "@/lib/getCategories";
import { constructMediaUrl } from "@/lib/constructMediaUrl";

export default async function ProductCategories() {
  const categories = await getCategories();

  return (
    <section className="py-4">
      <div className="grid md:grid-cols-3 gap-8">
        {categories?.map((cat: any) => {
          const image = cat.images?.[0];

          // Use constructMediaUrl utility for consistent media handling
          const imageUrl = constructMediaUrl(image?.url);

          return (
            <div
              key={cat.id}
              className="relative rounded-lg overflow-hidden group bg-gray-100"
            >
              {/* IMAGE */}
              <div className="relative w-full h-[280px]">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={image.alt || cat.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  // Fallback placeholder for categories without images
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">{cat.name}</span>
                  </div>
                )}
              </div>

              {/* TITLE BAR */}
              <Link
                href={`/products/${cat.slug}`}
                className="absolute bottom-4 left-4 right-4 bg-[#f5a623] text-white flex items-center justify-between px-6 py-4 rounded-md font-semibold hover:bg-[#e09112] transition-colors"
              >
                {cat.name}
                <span className="text-xl">›</span>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
