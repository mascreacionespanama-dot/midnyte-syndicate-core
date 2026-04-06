import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SyndicateAI from "@/components/SyndicateAI";
import { getProductBySlug } from "@/lib/products";
import { useCart } from "@/contexts/CartContext";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || "");
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [sizeError, setSizeError] = useState(false);

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background pt-20 flex items-center justify-center">
          <div className="text-center">
            <p className="text-foreground text-lg tracking-[0.2em] uppercase">Piece not found</p>
            <Link to="/shop" className="text-accent text-xs tracking-[0.3em] uppercase mt-4 inline-block hover:text-foreground transition-colors">
              Return to Shop →
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      size: selectedSize,
      image: product.images[0],
    });
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-20 lg:pt-24">
        <section className="px-6 py-8 lg:py-16">
          <div className="max-w-7xl mx-auto">
            {/* Back link */}
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-[10px] tracking-[0.3em] uppercase transition-colors mb-10"
            >
              <ArrowLeft size={12} />
              Back to Shop
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 lg:gap-16">
              {/* Image Gallery */}
              <div className="space-y-1">
                {/* Main Image */}
                <div className="aspect-[3/4] overflow-hidden bg-secondary">
                  <img
                    src={product.images[activeImage]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-opacity duration-500"
                  />
                </div>

                {/* Thumbnails */}
                {product.images.length > 1 && (
                  <div className="grid grid-cols-3 gap-1">
                    {product.images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        className={`aspect-[4/3] overflow-hidden bg-secondary transition-all duration-300 ${
                          i === activeImage
                            ? "ring-1 ring-accent"
                            : "opacity-50 hover:opacity-80"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${product.name} view ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="py-4 lg:py-8">
                <p className="text-accent text-[10px] tracking-[0.4em] uppercase mb-3">
                  {product.collection}
                </p>
                <h1 className="text-foreground text-2xl lg:text-4xl font-black tracking-[0.15em] uppercase">
                  {product.name}
                </h1>
                <p className="text-silver-muted text-sm tracking-[0.2em] mt-3">
                  ${product.price}
                </p>

                <div className="h-px bg-border my-8" />

                <p className="text-silver-muted text-sm tracking-wide leading-relaxed">
                  {product.tagline}
                </p>
                <p className="text-muted-foreground text-xs tracking-wide leading-relaxed mt-4">
                  {product.description}
                </p>

                <div className="h-px bg-border my-8" />

                {/* Size Selector */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-foreground text-[10px] tracking-[0.3em] uppercase font-medium">
                      Size
                    </p>
                    {sizeError && !selectedSize && (
                      <p className="text-accent text-[10px] tracking-[0.2em] uppercase animate-fade-in">
                        Select a size
                      </p>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => {
                          setSelectedSize(size);
                          setSizeError(false);
                        }}
                        className={`min-w-[52px] px-4 py-3 text-[11px] tracking-[0.2em] uppercase border transition-all duration-300 ${
                          selectedSize === size
                            ? "border-accent text-foreground bg-accent/10"
                            : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  <p className="text-muted-foreground text-[9px] tracking-[0.15em] uppercase mt-3">
                    Oversized fit — size down if between sizes
                  </p>
                </div>

                <div className="h-px bg-border my-8" />

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="w-full py-4 bg-foreground text-background text-[11px] tracking-[0.3em] uppercase font-bold hover:bg-accent transition-colors duration-300"
                >
                  Add to Cart — ${product.price}
                </button>

                <p className="text-muted-foreground text-[9px] tracking-[0.2em] uppercase text-center mt-4">
                  Free shipping over $200 · 14-day returns
                </p>

                <div className="h-px bg-border my-8" />

                {/* Details */}
                <div>
                  <p className="text-foreground text-[10px] tracking-[0.3em] uppercase font-medium mb-4">
                    Details
                  </p>
                  <ul className="space-y-2">
                    {product.details.map((detail, i) => (
                      <li
                        key={i}
                        className="text-muted-foreground text-xs tracking-wide flex items-start gap-3"
                      >
                        <span className="w-1 h-1 bg-accent rounded-full mt-1.5 shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <SyndicateAI />
    </>
  );
};

export default ProductDetail;
