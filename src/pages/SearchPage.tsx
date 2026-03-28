import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowLeft, Clock, Plus, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";

const allProducts = [
  { name: "Fresh Bananas", weight: "1 dozen", price: 45, oldPrice: 60, time: "8 min", img: "🍌", category: "Fruits & Veggies", inStock: true },
  { name: "Whole Milk", weight: "1 liter", price: 68, oldPrice: 75, time: "10 min", img: "🥛", category: "Dairy & Eggs", inStock: true },
  { name: "Brown Eggs", weight: "6 pcs", price: 72, oldPrice: 90, time: "9 min", img: "🥚", category: "Dairy & Eggs", inStock: true },
  { name: "Sourdough Bread", weight: "400g", price: 85, oldPrice: 110, time: "10 min", img: "🍞", category: "Bakery", inStock: false },
  { name: "Greek Yogurt", weight: "400g", price: 120, oldPrice: 150, time: "8 min", img: "🫙", category: "Dairy & Eggs", inStock: true },
  { name: "Organic Tomatoes", weight: "500g", price: 55, oldPrice: 70, time: "9 min", img: "🍅", category: "Fruits & Veggies", inStock: true },
  { name: "Chicken Breast", weight: "500g", price: 199, oldPrice: 250, time: "12 min", img: "🍗", category: "Meat", inStock: true },
  { name: "Fresh Orange Juice", weight: "1 liter", price: 95, oldPrice: 120, time: "10 min", img: "🧃", category: "Beverages", inStock: false },
  { name: "Avocados", weight: "2 pcs", price: 130, oldPrice: 160, time: "9 min", img: "🥑", category: "Fruits & Veggies", inStock: true },
  { name: "Cheddar Cheese", weight: "200g", price: 145, oldPrice: 180, time: "10 min", img: "🧀", category: "Dairy & Eggs", inStock: true },
  { name: "Pasta", weight: "500g", price: 65, oldPrice: 80, time: "8 min", img: "🍝", category: "Bakery", inStock: true },
  { name: "Green Tea", weight: "25 bags", price: 110, oldPrice: 140, time: "9 min", img: "🍵", category: "Beverages", inStock: true },
  { name: "Strawberries", weight: "250g", price: 90, oldPrice: 120, time: "10 min", img: "🍓", category: "Fruits & Veggies", inStock: true },
  { name: "Rice", weight: "1 kg", price: 75, oldPrice: 95, time: "8 min", img: "🍚", category: "Essentials", inStock: true },
  { name: "Butter", weight: "200g", price: 85, oldPrice: 100, time: "9 min", img: "🧈", category: "Dairy & Eggs", inStock: false },
  { name: "Dark Chocolate", weight: "100g", price: 110, oldPrice: 135, time: "8 min", img: "🍫", category: "Snacks", inStock: true },
  { name: "Paneer", weight: "200g", price: 90, oldPrice: 110, time: "9 min", img: "🧊", category: "Dairy & Eggs", inStock: true },
  { name: "Onions", weight: "1 kg", price: 35, oldPrice: 50, time: "8 min", img: "🧅", category: "Fruits & Veggies", inStock: true },
  { name: "Potatoes", weight: "1 kg", price: 30, oldPrice: 45, time: "8 min", img: "🥔", category: "Fruits & Veggies", inStock: true },
  { name: "Garlic", weight: "250g", price: 40, oldPrice: 55, time: "9 min", img: "🧄", category: "Fruits & Veggies", inStock: true },
  { name: "Spinach", weight: "250g", price: 25, oldPrice: 35, time: "8 min", img: "🥬", category: "Fruits & Veggies", inStock: false },
  { name: "Coconut Water", weight: "1 liter", price: 55, oldPrice: 70, time: "10 min", img: "🥥", category: "Beverages", inStock: true },
  { name: "Peanut Butter", weight: "400g", price: 180, oldPrice: 220, time: "9 min", img: "🥜", category: "Snacks", inStock: true },
  { name: "Honey", weight: "500g", price: 250, oldPrice: 320, time: "10 min", img: "🍯", category: "Essentials", inStock: true },
  { name: "Corn Flakes", weight: "500g", price: 160, oldPrice: 200, time: "8 min", img: "🥣", category: "Essentials", inStock: true },
  { name: "Watermelon", weight: "1 pc", price: 60, oldPrice: 80, time: "12 min", img: "🍉", category: "Fruits & Veggies", inStock: true },
  { name: "Mango", weight: "1 kg", price: 150, oldPrice: 200, time: "10 min", img: "🥭", category: "Fruits & Veggies", inStock: true },
  { name: "Lamb Chops", weight: "500g", price: 450, oldPrice: 550, time: "15 min", img: "🥩", category: "Meat", inStock: false },
  { name: "Salmon Fillet", weight: "300g", price: 520, oldPrice: 650, time: "14 min", img: "🐟", category: "Meat", inStock: true },
  { name: "Croissants", weight: "4 pcs", price: 140, oldPrice: 180, time: "10 min", img: "🥐", category: "Bakery", inStock: true },
  { name: "Cookies", weight: "200g", price: 95, oldPrice: 120, time: "8 min", img: "🍪", category: "Snacks", inStock: true },
  { name: "Ice Cream", weight: "500ml", price: 175, oldPrice: 220, time: "10 min", img: "🍦", category: "Snacks", inStock: true },
  { name: "Coffee Beans", weight: "250g", price: 320, oldPrice: 400, time: "9 min", img: "☕", category: "Beverages", inStock: true },
  { name: "Olive Oil", weight: "500ml", price: 350, oldPrice: 450, time: "10 min", img: "🫒", category: "Essentials", inStock: true },
  { name: "Tortilla Wraps", weight: "6 pcs", price: 110, oldPrice: 140, time: "9 min", img: "🌯", category: "Bakery", inStock: true },
  { name: "Mushrooms", weight: "200g", price: 65, oldPrice: 85, time: "9 min", img: "🍄", category: "Fruits & Veggies", inStock: true },
  { name: "Bell Peppers", weight: "3 pcs", price: 80, oldPrice: 100, time: "9 min", img: "🫑", category: "Fruits & Veggies", inStock: false },
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
