import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: any;
  categorySlug: string;
  constructMediaUrl: (url: string) => string;
}

const ProductCard = ({ product, categorySlug, constructMediaUrl }: ProductCardProps) => {
  const image = product?.images?.[0];
  const imageUrl = constructMediaUrl(image?.url);

  return (
    <Link
      href={`/products/${categorySlug}/${product.slug}`}
      className="tool-card"
    >
      <div className="tool-image-wrapper">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="tool-img"
          />
        )}
      </div>

      <div className="tool-content">
        <p className="tool-title">{product.name}</p>

        <div className="tool-rating">
          <span className="stars">★★★★★</span>
          <span className="rating">{product.rating}</span>
          <span className="reviews">• {product.reviewCount} Reviews</span>
        </div>

        <p className="tool-price">₹{product.price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;