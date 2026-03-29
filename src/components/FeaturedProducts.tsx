import { Plus, Clock, Check } from "lucide-react";
import { useCart } from "@/hooks/use-cart";

const products = [
  { name: "Fresh Bananas", weight: "1 dozen", price: 45, oldPrice: 60, time: "8 min", img: "🍌", inStock: true },
  { name: "Whole Milk", weight: "1 liter", price: 68, oldPrice: 75, time: "10 min", img: "🥛", inStock: true },
  { name: "Brown Eggs", weight: "6 pcs", price: 72, oldPrice: 90, time: "9 min", img: "🥚", inStock: true },
  { name: "Sourdough Bread", weight: "400g", price: 85, oldPrice: 110, time: "10 min", img: "🍞", inStock: false },
  { name: "Greek Yogurt", weight: "400g", price: 120, oldPrice: 150, time: "8 min", img: "🫙", inStock: true },
  { name: "Organic Tomatoes", weight: "500g", price: 55, oldPrice: 70, time: "9 min", img: "🍅", inStock: true },
  { name: "Chicken Breast", weight: "500g", price: 199, oldPrice: 250, time: "12 min", img: "🍗", inStock: true },
  { name: "Fresh Orange Juice", weight: "1 liter", price: 95, oldPrice: 120, time: "10 min", img: "🧃", inStock: false },
  { name: "Avocados", weight: "2 pcs", price: 130, oldPrice: 160, time: "9 min", img: "🥑", inStock: true },
  { name: "Cheddar Cheese", weight: "200g", price: 145, oldPrice: 180, time: "10 min", img: "🧀", inStock: true },
  { name: "Strawberries", weight: "250g", price: 90, oldPrice: 120, time: "10 min", img: "🍓", inStock: true },
  { name: "Butter", weight: "200g", price: 85, oldPrice: 100, time: "9 min", img: "🧈", inStock: false },
];

const FeaturedProducts = () => {
  const { addItem, items } = useCart();

  return (
    <section id="featured-products" className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground">
              Popular Right Now
            </h2>
            <p className="text-muted-foreground mt-1">Bestsellers delivered at lightning speed</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => {
            const inCart = items.find((i) => i.name === product.name);
            return (
              <div
                key={product.name}
                className={`bg-card rounded-xl border border-border p-4 transition-shadow group ${product.inStock ? "hover:shadow-lg" : "opacity-60"}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1 text-xs text-primary font-medium bg-accent rounded-full px-2 py-0.5">
                    <Clock className="w-3 h-3" />
                    {product.time}
                  </span>
                  {product.inStock ? (
                    <span className="text-xs text-secondary font-semibold bg-secondary/10 rounded-full px-2 py-0.5">
                      {Math.round((1 - product.price / product.oldPrice) * 100)}% OFF
                    </span>
                  ) : (
                    <span className="text-xs text-destructive font-semibold bg-destructive/10 rounded-full px-2 py-0.5">
                      Out of Stock
                    </span>
                  )}
                </div>
                <div className={`text-5xl text-center py-4 transition-transform ${product.inStock ? "group-hover:scale-110" : "grayscale"}`}>
                  {product.img}
                </div>
                <h3 className="font-heading font-semibold text-sm text-foreground">{product.name}</h3>
                <p className="text-xs text-muted-foreground">{product.weight}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-heading font-bold text-foreground">₹{product.price}</span>
                    <span className="text-xs text-muted-foreground line-through">₹{product.oldPrice}</span>
                  </div>
                  {product.inStock ? (
                    inCart ? (
                      <button
                        onClick={() => addItem(product)}
                        className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:opacity-80 transition-opacity"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => addItem(product)}
                        className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-primary-foreground hover:opacity-90 transition-opacity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    )
                  ) : (
                    <span className="text-xs text-muted-foreground font-medium">Notify</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
