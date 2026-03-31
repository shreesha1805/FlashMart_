import { ShoppingCart, MapPin, Search, User, LogOut } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { useCart } from "@/hooks/use-cart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const { totalItems, setIsOpen } = useCart();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
            <span className="text-primary-foreground font-heading font-extrabold text-lg">M</span>
          </div>
          <span className="font-heading font-bold text-xl text-foreground"><span className="font-heading font-bold text-xl text-foreground">FlashMart_</span></span>
        </Link>

        <button
          onClick={() => navigate("/search")}
          className="hidden md:flex items-center gap-2 bg-muted rounded-full px-4 py-2 flex-1 max-w-md mx-8 cursor-pointer hover:bg-muted/80 transition-colors"
        >
          <Search className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Search groceries, snacks, drinks...</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/search")}
            className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={() => {
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                  (pos) => {
                    const { latitude, longitude } = pos.coords;
                    toast?.(`📍 Location set: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
                  },
                  () => {
                    toast?.("Unable to get location. Please enable GPS.");
                  }
                );
              }
            }}
            className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <MapPin className="w-4 h-4 text-primary" />
            <span>Set location</span>
          </button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="rounded-full gap-2">
                  <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center">
                    <span className="text-primary-foreground text-xs font-bold">
                      {user.user_metadata?.full_name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || "U"}
                    </span>
                  </div>
                  <span className="hidden sm:inline text-sm font-medium text-foreground">
                    {user.user_metadata?.full_name?.split(" ")[0] || "Account"}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium text-foreground">{user.user_metadata?.full_name || "User"}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive cursor-pointer">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" size="sm" className="rounded-full gap-2" asChild>
              <Link to="/auth">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Sign Up</span>
              </Link>
            </Button>
          )}

          <Button
            size="sm"
            className="gradient-primary text-primary-foreground border-0 rounded-full gap-2 font-semibold relative"
            onClick={() => setIsOpen(true)}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-secondary text-secondary-foreground text-xs font-bold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
