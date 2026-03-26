import { Zap, Clock, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-delivery.png";

const HeroSection = () => {
  return (
    <section className="gradient-hero overflow-hidden">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground rounded-full px-4 py-1.5 text-sm font-medium">
              <Zap className="w-4 h-4" />
              Delivery in 10 minutes
            </div>
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight text-foreground">
              Groceries to your
              <span className="text-primary"> door, </span>
              in a flash
            </h1>
            <p className="text-muted-foreground text-lg max-w-md">
              Fresh produce, daily essentials, and your favorite snacks — delivered instantly from stores near you.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="gradient-primary text-primary-foreground border-0 rounded-full font-semibold text-base px-8">
                Order Now
              </Button>
              <Button size="lg" variant="outline" className="rounded-full font-semibold text-base px-8">
                Browse Store
              </Button>
            </div>
            <div className="flex items-center gap-6 pt-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 text-primary" />
                10-min delivery
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Truck className="w-4 h-4 text-primary" />
                Free above ₹199
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src={heroImage}
              alt="Fast delivery illustration"
              className="w-full max-w-md animate-bounce-soft"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
