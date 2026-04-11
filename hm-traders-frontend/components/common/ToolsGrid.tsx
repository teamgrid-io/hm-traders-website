import Link from "next/link";
import Image from "next/image";
import { constructMediaUrl } from "@/lib/constructMediaUrl";

export default function ToolsGrid({ tools = [], enableLink = false, basePath = "" }: any) {
  if (!tools.length) return null;
  console.log("ToolsGrid tools:", tools);

  return (
    <div className="tools-grid" style={{ marginTop:  "40px" }}>
      {tools.slice(0, 4).map((tool: any) => {
        const cardContent = (
          <>
            <div className="tool-image-wrapper">
              {tool?.imgUrl && (
                <Image
                  src={constructMediaUrl(tool.imgUrl)}
                  alt={tool?.title?.rendered}
                  fill
                  className="tool-img"
                />
              )}
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