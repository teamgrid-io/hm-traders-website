
import Link from "next/link";
import Image from "next/image";
import { constructMediaUrl } from "@/lib/constructMediaUrl";

interface Tool {
  id: string;
  slug: string;
  title: {
    rendered: string;
  };
  imgUrl?: string;
  acf?: {
    product_price?: number;
    [key: string]: string | number | undefined;
  };
  categorySlug?: string;
}

interface ToolsGridProps {
  tools?: Tool[];
  enableLink?: boolean;
  basePath?: string;
}

export default function ToolsGrid({ tools = [], enableLink = false, basePath = "" }: ToolsGridProps) {
  if (!tools.length) return null;
  return (
    <div className="tools-grid" style={{ margin:  "40px 0px" }}>
      {tools.slice(0, 4).map((tool) => {
        const cardContent = (
          <>
            <div className="tool-image-wrapper">
              {(() => {
                const src = constructMediaUrl(tool.imgUrl) || "";
                return src !== "" ? (
                  <Image
                    src={src}
                    alt={tool?.title?.rendered}
                    fill
                    className="tool-img"
                  />
                ) : null;
              })()}
            </div>

            <div className="tool-content">
              <p className="tool-title">{tool?.title?.rendered}</p>

              {/* <div className="tool-rating">
                <span className="stars">★★★★★</span>
                <span className="rating">({tool.rating || 0})</span>
                <span className="reviews">
                  • {tool.reviewCount || 0} Reviews
                </span>
              </div> */}

              <p className="tool-price">₹{tool?.acf?.product_price}</p>
            </div>
          </>
        );

        return enableLink ? (
          <Link
            key={tool.id}
            href={`${basePath}/${tool.slug}`}
            className="tool-card"
          >
            {cardContent}
          </Link>
        ) : (
          <div key={tool.id} className="tool-card">
            {cardContent}
          </div>
        );
      })}
    </div>
  );
}