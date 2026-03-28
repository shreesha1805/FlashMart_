import { Minus, Plus, Trash2, ShoppingBag, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const CartDrawer = () => {
  const { items, updateQuantity, removeItem, totalItems, totalPrice, isOpen, setIsOpen } = useCart();
  const navigate = useNavigate();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-heading flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            Your Cart ({totalItems})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-3">
            <div className="text-6xl">🛒</div>
            <h3 className="font-heading font-semibold text-lg text-foreground">Cart is empty</h3>
            <p className="text-sm text-muted-foreground">Add items to get started</p>
            <Button
              className="gradient-primary text-primary-foreground border-0 rounded-full mt-2"
              onClick={() => setIsOpen(false)}
            >
              Browse Products
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-3 py-4">
              {items.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center gap-3 bg-muted/50 rounded-xl p-3"
                >
                  <div className="text-3xl shrink-0">{item.img}</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-heading font-semibold text-sm text-foreground truncate">{item.name}</h4>
                    <p className="text-xs text-muted-foreground">{item.weight}</p>
                    <p className="font-heading font-bold text-sm text-foreground mt-0.5">₹{item.price * item.quantity}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => updateQuantity(item.name, item.quantity - 1)}
                      className="w-7 h-7 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.name, item.quantity + 1)}
                      className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center text-primary-foreground"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.name)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="font-heading font-bold text-lg text-foreground">₹{totalPrice}</span>
              </div>
              <Button
                className="w-full gradient-primary text-primary-foreground border-0 rounded-full font-semibold h-12 text-base"
                onClick={() => { setIsOpen(false); navigate("/checkout"); }}
              >
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
