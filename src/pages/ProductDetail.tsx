import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SyndicateAI from "@/components/SyndicateAI";
import { useShopifyProduct } from "@/hooks/useShopifyProducts";
import { useCartStore } from "@/stores/cartStore";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const { data: product, isLoading: productLoading } = useShopifyProduct(handle || "");
  const { addItem, isLoading: cartLoading } = useCartStore();
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [sizeError, setSizeError] = useState(false);

  if (productLoading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background pt-20 flex items-center justify-center">
          <div className="w-5 h-5 border border-accent border-t-transparent rounded-full animate-spin" />
        </main>
      </>
    );
  }

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

  const images = product.images.edges.map(e => e.node);
  const variants = product.variants.edges.map(e => e.node);
  const selectedVariant = variants.find(v => v.id === selectedVariantId) || null;
  const hasOptions = product.options.length > 0 && !(product.options.length === 1 && product.options[0].values.length === 1 && product.options[0].values[0] === "Default Title");

  const handleAddToCart = async () => {
    if (hasOptions && !selectedVariant) {
      setSizeError(true);
      return;
    }

    const variant = selectedVariant || variants[0];
    if (!variant) return;

    await addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });

    toast.success("Added to cart", {
      description: product.title,
      position: "top-center",
    });
  };

  const displayPrice = selectedVariant?.price || product.priceRange.minVariantPrice;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-20 lg:pt-24">
        <section className="px-6 py-8 lg:py-16">
          <div className="max-w-7xl mx-auto">
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
                <div className="aspect-[3/4] overflow-hidden bg-secondary">
                  {images[activeImage] && (
                    <img
                      src={images[activeImage].url}
                      alt={images[activeImage].altText || product.title}
                      className="w-full h-full object-cover transition-opacity duration-500"
                    />
                  )}
                </div>

                {images.length > 1 && (
                  <div className="grid grid-cols-4 gap-1">
                    {images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        className={`aspect-square overflow-hidden bg-secondary transition-all duration-300 ${
                          i === activeImage ? "ring-1 ring-accent" : "opacity-50 hover:opacity-80"
                        }`}
                      >
                        <img src={img.url} alt={img.altText || `View ${i + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="py-4 lg:py-8">
                <h1 className="text-foreground text-2xl lg:text-4xl font-black tracking-[0.15em] uppercase">
                  {product.title}
                </h1>
                <p className="text-silver-muted text-sm tracking-[0.2em] mt-3">
                  {displayPrice.currencyCode} {parseFloat(displayPrice.amount).toFixed(2)}
                </p>

                <div className="h-px bg-border my-8" />

                {product.description && (
                  <p className="text-muted-foreground text-xs tracking-wide leading-relaxed">
                    {product.description}
                  </p>
                )}

                {hasOptions && (
                  <>
                    <div className="h-px bg-border my-8" />

                    {product.options.map((option) => (
                      <div key={option.name} className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-foreground text-[10px] tracking-[0.3em] uppercase font-medium">
                            {option.name}
                          </p>
                          {sizeError && !selectedVariant && (
                            <p className="text-accent text-[10px] tracking-[0.2em] uppercase animate-fade-in">
                              Select an option
                            </p>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {option.values.map((value) => {
                            const matchingVariant = variants.find(v =>
                              v.selectedOptions.some(o => o.name === option.name && o.value === value)
                            );
                            const isSelected = selectedVariant?.selectedOptions.some(
                              o => o.name === option.name && o.value === value
                            );
                            const isAvailable = matchingVariant?.availableForSale !== false;

                            return (
                              <button
                                key={value}
                                onClick={() => {
                                  if (matchingVariant) {
                                    setSelectedVariantId(matchingVariant.id);
                                    setSizeError(false);
                                  }
                                }}
                                disabled={!isAvailable}
                                className={`min-w-[52px] px-4 py-3 text-[11px] tracking-[0.2em] uppercase border transition-all duration-300 ${
                                  isSelected
                                    ? "border-accent text-foreground bg-accent/10"
                                    : isAvailable
                                    ? "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                                    : "border-border text-muted-foreground/30 line-through cursor-not-allowed"
                                }`}
                              >
                                {value}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </>
                )}

                <div className="h-px bg-border my-8" />

                <button
                  onClick={handleAddToCart}
                  disabled={cartLoading}
                  className="w-full py-4 bg-foreground text-background text-[11px] tracking-[0.3em] uppercase font-bold hover:bg-accent transition-colors duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {cartLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    `Add to Cart — ${displayPrice.currencyCode} ${parseFloat(displayPrice.amount).toFixed(2)}`
                  )}
                </button>

                <p className="text-muted-foreground text-[9px] tracking-[0.2em] uppercase text-center mt-4">
                  Free shipping over $200 · 14-day returns
                </p>
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
