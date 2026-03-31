import { useState } from "react";
import { Bell } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface NotifyMeDialogProps {
  productName: string;
  children?: React.ReactNode;
}

const NotifyMeDialog = ({ productName, children }: NotifyMeDialogProps) => {
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    const { error } = await supabase
      .from("stock_notifications")
      .insert({ email: email.trim(), product_name: productName });

    setLoading(false);

    if (error) {
      toast.error("Something went wrong. Please try again.");
      return;
    }

    toast.success(`We'll notify you when ${productName} is back in stock!`);
    setEmail("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <button className="inline-flex items-center gap-1 text-xs text-primary font-medium hover:underline">
            <Bell className="w-3 h-3" />
            Notify
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="font-heading text-lg">
            Get notified when available
          </DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          We'll email you when <strong className="text-foreground">{productName}</strong> is back in stock.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
          <Input
            type="email"
            required
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={loading} className="gradient-primary text-primary-foreground border-0">
            {loading ? "..." : "Notify Me"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NotifyMeDialog;
