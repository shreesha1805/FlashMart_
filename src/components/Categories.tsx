import { Apple, Milk, Sandwich, Coffee, Snowflake, ShowerHead, Baby, Home, PawPrint, ShoppingBasket, UtensilsCrossed, Candy } from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Fruits & Veggies", icon: Apple, color: "bg-green-100 text-green-600" },
  { name: "Dairy & Eggs", icon: Milk, color: "bg-blue-100 text-blue-600" },
  { name: "Meat & Seafood", icon: UtensilsCrossed, color: "bg-red-100 text-red-600" },
  { name: "Bakery", icon: Sandwich, color: "bg-amber-100 text-amber-600" },
  { name: "Beverages", icon: Coffee, color: "bg-orange-100 text-orange-600" },
  { name: "Snacks", icon: Candy, color: "bg-pink-100 text-pink-600" },
  { name: "Essentials", icon: ShoppingBasket, color: "bg-yellow-100 text-yellow-600" },
  { name: "Frozen Foods", icon: Snowflake, color: "bg-cyan-100 text-cyan-600" },
  { name: "Personal Care", icon: ShowerHead, color: "bg-purple-100 text-purple-600" },
  { name: "Household", icon: Home, color: "bg-indigo-100 text-indigo-600" },
  { name: "Baby Care", icon: Baby, color: "bg-teal-100 text-teal-600" },
  { name: "Pet Care", icon: PawPrint, color: "bg-lime-100 text-lime-600" },
];

const Categories = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-8">
          Shop by Category
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => navigate(`/search?q=${encodeURIComponent(cat.name)}`)}
              className="flex flex-col items-center gap-3 p-4 rounded-xl bg-card border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer group"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${cat.color} group-hover:scale-110 transition-transform`}>
                <cat.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium text-foreground text-center leading-tight">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
