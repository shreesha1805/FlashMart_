import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowLeft, Clock, Plus, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";

const allProducts = [
  { name: "Fresh Bananas", weight: "1 dozen", price: 45, oldPrice: 60, time: "8 min", img: "🍌", category: "Fruits & Veggies" },
  { name: "Whole Milk", weight: "1 liter", price: 68, oldPrice: 75, time: "10 min", img: "🥛", category: "Dairy & Eggs" },
  { name: "Brown Eggs", weight: "6 pcs", price: 72, oldPrice: 90, time: "9 min", img: "🥚", category: "Dairy & Eggs" },
  { name: "Sourdough Bread", weight: "400g", price: 85, oldPrice: 110, time: "10 min", img: "🍞", category: "Bakery" },
  { name: "Greek Yogurt", weight: "400g", price: 120, oldPrice: 150, time: "8 min", img: "🫙", category: "Dairy & Eggs" },
  { name: "Organic Tomatoes", weight: "500g", price: 55, oldPrice: 70, time: "9 min", img: "🍅", category: "Fruits & Veggies" },
  { name: "Chicken Breast", weight: "500g", price: 199, oldPrice: 250, time: "12 min", img: "🍗", category: "Meat" },
  { name: "Fresh Orange Juice", weight: "1 liter", price: 95, oldPrice: 120, time: "10 min", img: "🧃", category: "Beverages" },
  { name: "Avocados", weight: "2 pcs", price: 130, oldPrice: 160, time: "9 min", img: "🥑", category: "Fruits & Veggies" },
  { name: "Cheddar Cheese", weight: "200g", price: 145, oldPrice: 180, time: "10 min", img: "🧀", category: "Dairy & Eggs" },
  { name: "Pasta", weight: "500g", price: 65, oldPrice: 80, time: "8 min", img: "🍝", category: "Bakery" },
  { name: "Green Tea", weight: "25 bags", price: 110, oldPrice: 140, time: "9 min", img: "🍵", category: "Beverages" },
  { name: "Strawberries", weight: "250g", price: 90, oldPrice: 120, time: "10 min", img: "🍓", category: "Fruits & Veggies" },
  { name: "Rice", weight: "1 kg", price: 75, oldPrice: 95, time: "8 min", img: "🍚", category: "Essentials" },
  { name: "Butter", weight: "200g", price: 85, oldPrice: 100, time: "9 min", img: "🧈", category: "Dairy & Eggs" },
  { name: "Dark Chocolate", weight: "100g", price: 110, oldPrice: 135, time: "8 min", img: "🍫", category: "Snacks" },
];

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate();
  const { addItem, items } = useCart();

  const categories = useMemo(() => {
    return [...new Set(allProducts.map((p) => p.category))];
  }, []);

  const filtered = useMemo(() => {
    return allProducts.filter((p) => {
      const matchesQuery = !query || p.name.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = !selectedCategory || p.category === selectedCategory;
      return matchesQuery && matchesCategory;
    });
  }, [query, selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 bg-card/95 backdrop-blur-lg border-b border-border px-4 py-3">
        <div className="container mx-auto flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              autoFocus
              placeholder="Search groceries, snacks, drinks..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 rounded-full bg-muted border-0"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            className={`rounded-full shrink-0 ${selectedCategory === null ? "gradient-primary text-primary-foreground border-0" : ""}`}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              className={`rounded-full shrink-0 ${selectedCategory === cat ? "gradient-primary text-primary-foreground border-0" : ""}`}
              onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
            >
              {cat}
            </Button>
          ))}
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          {filtered.length} {filtered.length === 1 ? "product" : "products"} found
          {query && <> for "<strong className="text-foreground">{query}</strong>"</>}
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((product) => {
              const inCart = items.find((i) => i.name === product.name);
              return (
                <div
                  key={product.name}
                  className="bg-card rounded-xl border border-border p-4 hover:shadow-lg transition-shadow group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1 text-xs text-primary font-medium bg-accent rounded-full px-2 py-0.5">
                      <Clock className="w-3 h-3" />
                      {product.time}
                    </span>
                    <span className="text-xs text-secondary font-semibold bg-secondary/10 rounded-full px-2 py-0.5">
                      {Math.round((1 - product.price / product.oldPrice) * 100)}% OFF
                    </span>
                  </div>
                  <div className="text-5xl text-center py-4 group-hover:scale-110 transition-transform">
                    {product.img}
                  </div>
                  <h3 className="font-heading font-semibold text-sm text-foreground">{product.name}</h3>
                  <p className="text-xs text-muted-foreground">{product.weight}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-heading font-bold text-foreground">₹{product.price}</span>
                      <span className="text-xs text-muted-foreground line-through">₹{product.oldPrice}</span>
                    </div>
                    {inCart ? (
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
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="font-heading font-semibold text-lg text-foreground mb-1">No products found</h3>
            <p className="text-sm text-muted-foreground">Try a different search term or category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
