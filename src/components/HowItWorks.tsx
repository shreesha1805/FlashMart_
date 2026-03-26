import { MapPin, ShoppingBag, Bike } from "lucide-react";

const steps = [
  {
    icon: MapPin,
    title: "Set Your Location",
    desc: "Share your address so we can find the nearest mart to you.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: ShoppingBag,
    title: "Pick Your Items",
    desc: "Browse thousands of products and add them to your cart.",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: Bike,
    title: "Get It Delivered",
    desc: "Sit back — your order arrives at your door in minutes.",
    color: "bg-accent text-accent-foreground",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-3">
          How It Works
        </h2>
        <p className="text-muted-foreground mb-12 max-w-md mx-auto">
          Three simple steps to get everything you need, fast.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={step.title} className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className={`w-20 h-20 rounded-2xl ${step.color} flex items-center justify-center`}>
                  <step.icon className="w-9 h-9" />
                </div>
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full gradient-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
              </div>
              <h3 className="font-heading font-bold text-lg text-foreground">{step.title}</h3>
              <p className="text-muted-foreground text-sm max-w-xs">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
