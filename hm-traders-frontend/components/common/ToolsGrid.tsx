import Link from "next/link";
import Image from "next/image";
import { constructMediaUrl } from "@/lib/constructMediaUrl";

export default function ToolsGrid({ tools = [], enableLink = false, basePath = "" }: any) {
  if (!tools.length) return null;

  return (
    <div className="tools-grid" style={{ marginTop:  "40px" }}>
      {tools.slice(0, 4).map((tool: any) => {
        const cardContent = (
          <>
            <div className="tool-image-wrapper">
              {tool?.images?.[0]?.url && (
                <Image
                  src={constructMediaUrl(tool.images[0].url)}
                  alt={tool.images[0].alt || tool.name}
                  fill
                  className="tool-img"
                />
              )}
            </div>

            <div className="tool-content">
              <p className="tool-title">{tool.name}</p>

              <div className="tool-rating">
                <span className="stars">★★★★★</span>
                <span className="rating">({tool.rating || 0})</span>
                <span className="reviews">
                  • {tool.reviewCount || 0} Reviews
                </span>
              </div>

              <p className="tool-price">₹{tool.price}</p>
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