import Link from "next/link";
import Image from "next/image";
import { getCategories } from "@/lib/getCategories";
import { constructMediaUrl } from "@/lib/constructMediaUrl";

export default async function ProductCategories() {
  const categories = await getCategories();
  
  // Calculate grid positioning
  const totalItems = categories?.length || 0;
  const itemsInLastRow = totalItems % 3 || 3;
  const lastRowStartsAt = totalItems - itemsInLastRow;

  return (
    <section className="py-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories?.map((cat: any, index: number) => {
          const image = cat.images?.[0];
          const imageUrl = constructMediaUrl(image?.url);
          
          // Calculate if this item needs offset for centering last row
          let offsetClass = '';
          if (index >= lastRowStartsAt && itemsInLastRow < 3) {
            // For 1 item in last row: offset by 1 column (starts at col-start-2)
            // For 2 items in last row: no offset needed as they naturally center in grid
            if (itemsInLastRow === 1) {
              offsetClass = 'md:col-start-2';
            }
            // For 2 items, they're already centered in a 3-col grid (cols 1-2)
            // No offset needed
          }

          return (
            <div
              key={cat.id}
              className={`relative rounded-lg overflow-hidden group bg-gray-100 ${offsetClass}`}
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


