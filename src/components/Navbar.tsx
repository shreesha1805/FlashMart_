import { ShoppingCart, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
            <span className="text-primary-foreground font-heading font-extrabold text-lg">M</span>
          </div>
          <span className="font-heading font-bold text-xl text-foreground">MartFlash</span>
        </div>

        <div className="hidden md:flex items-center gap-2 bg-muted rounded-full px-4 py-2 flex-1 max-w-md mx-8">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search groceries, snacks, drinks..."
            className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full"
          />
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <MapPin className="w-4 h-4 text-primary" />
            <span>Set location</span>
          </button>
          <Button size="sm" className="gradient-primary text-primary-foreground border-0 rounded-full gap-2 font-semibold">
            <ShoppingCart className="w-4 h-4" />
            <span>Cart</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
