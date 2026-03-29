export interface Product {
  name: string;
  weight: string;
  price: number;
  oldPrice: number;
  time: string;
  img: string;
  category: string;
  inStock: boolean;
}

export const allProducts: Product[] = [
  // Fruits & Veggies
  { name: "Fresh Bananas", weight: "1 dozen", price: 45, oldPrice: 60, time: "8 min", img: "🍌", category: "Fruits & Veggies", inStock: true },
  { name: "Organic Tomatoes", weight: "500g", price: 55, oldPrice: 70, time: "9 min", img: "🍅", category: "Fruits & Veggies", inStock: true },
  { name: "Avocados", weight: "2 pcs", price: 130, oldPrice: 160, time: "9 min", img: "🥑", category: "Fruits & Veggies", inStock: true },
  { name: "Strawberries", weight: "250g", price: 90, oldPrice: 120, time: "10 min", img: "🍓", category: "Fruits & Veggies", inStock: true },
  { name: "Onions", weight: "1 kg", price: 35, oldPrice: 50, time: "8 min", img: "🧅", category: "Fruits & Veggies", inStock: true },
  { name: "Potatoes", weight: "1 kg", price: 30, oldPrice: 45, time: "8 min", img: "🥔", category: "Fruits & Veggies", inStock: true },
  { name: "Garlic", weight: "250g", price: 40, oldPrice: 55, time: "9 min", img: "🧄", category: "Fruits & Veggies", inStock: true },
  { name: "Spinach", weight: "250g", price: 25, oldPrice: 35, time: "8 min", img: "🥬", category: "Fruits & Veggies", inStock: false },
  { name: "Watermelon", weight: "1 pc", price: 60, oldPrice: 80, time: "12 min", img: "🍉", category: "Fruits & Veggies", inStock: true },
  { name: "Mango", weight: "1 kg", price: 150, oldPrice: 200, time: "10 min", img: "🥭", category: "Fruits & Veggies", inStock: true },
  { name: "Mushrooms", weight: "200g", price: 65, oldPrice: 85, time: "9 min", img: "🍄", category: "Fruits & Veggies", inStock: true },
  { name: "Bell Peppers", weight: "3 pcs", price: 80, oldPrice: 100, time: "9 min", img: "🫑", category: "Fruits & Veggies", inStock: false },
  { name: "Green Apples", weight: "4 pcs", price: 120, oldPrice: 150, time: "9 min", img: "🍏", category: "Fruits & Veggies", inStock: true },
  { name: "Red Grapes", weight: "500g", price: 95, oldPrice: 130, time: "10 min", img: "🍇", category: "Fruits & Veggies", inStock: true },
  { name: "Pineapple", weight: "1 pc", price: 70, oldPrice: 90, time: "11 min", img: "🍍", category: "Fruits & Veggies", inStock: true },
  { name: "Carrots", weight: "500g", price: 30, oldPrice: 40, time: "8 min", img: "🥕", category: "Fruits & Veggies", inStock: true },
  { name: "Cucumber", weight: "500g", price: 25, oldPrice: 35, time: "8 min", img: "🥒", category: "Fruits & Veggies", inStock: true },
  { name: "Lemons", weight: "6 pcs", price: 30, oldPrice: 45, time: "8 min", img: "🍋", category: "Fruits & Veggies", inStock: true },
  { name: "Sweet Corn", weight: "2 pcs", price: 40, oldPrice: 55, time: "9 min", img: "🌽", category: "Fruits & Veggies", inStock: true },
  { name: "Peaches", weight: "4 pcs", price: 110, oldPrice: 140, time: "10 min", img: "🍑", category: "Fruits & Veggies", inStock: false },
  { name: "Cherries", weight: "250g", price: 180, oldPrice: 230, time: "10 min", img: "🍒", category: "Fruits & Veggies", inStock: true },
  { name: "Kiwi", weight: "4 pcs", price: 100, oldPrice: 130, time: "9 min", img: "🥝", category: "Fruits & Veggies", inStock: true },
  { name: "Broccoli", weight: "300g", price: 55, oldPrice: 70, time: "9 min", img: "🥦", category: "Fruits & Veggies", inStock: true },

  // Dairy & Eggs
  { name: "Whole Milk", weight: "1 liter", price: 68, oldPrice: 75, time: "10 min", img: "🥛", category: "Dairy & Eggs", inStock: true },
  { name: "Brown Eggs", weight: "6 pcs", price: 72, oldPrice: 90, time: "9 min", img: "🥚", category: "Dairy & Eggs", inStock: true },
  { name: "Greek Yogurt", weight: "400g", price: 120, oldPrice: 150, time: "8 min", img: "🫙", category: "Dairy & Eggs", inStock: true },
  { name: "Cheddar Cheese", weight: "200g", price: 145, oldPrice: 180, time: "10 min", img: "🧀", category: "Dairy & Eggs", inStock: true },
  { name: "Butter", weight: "200g", price: 85, oldPrice: 100, time: "9 min", img: "🧈", category: "Dairy & Eggs", inStock: false },
  { name: "Paneer", weight: "200g", price: 90, oldPrice: 110, time: "9 min", img: "🧊", category: "Dairy & Eggs", inStock: true },
  { name: "Cream Cheese", weight: "200g", price: 130, oldPrice: 160, time: "10 min", img: "🧀", category: "Dairy & Eggs", inStock: true },
  { name: "Almond Milk", weight: "1 liter", price: 150, oldPrice: 190, time: "10 min", img: "🥛", category: "Dairy & Eggs", inStock: true },
  { name: "Cottage Cheese", weight: "250g", price: 95, oldPrice: 120, time: "9 min", img: "🧀", category: "Dairy & Eggs", inStock: true },
  { name: "Whipped Cream", weight: "250ml", price: 110, oldPrice: 140, time: "10 min", img: "🍦", category: "Dairy & Eggs", inStock: true },
  { name: "Sour Cream", weight: "200g", price: 85, oldPrice: 105, time: "9 min", img: "🫙", category: "Dairy & Eggs", inStock: false },
  { name: "Mozzarella", weight: "200g", price: 160, oldPrice: 200, time: "10 min", img: "🧀", category: "Dairy & Eggs", inStock: true },
  { name: "Flavored Yogurt", weight: "4 pack", price: 100, oldPrice: 130, time: "8 min", img: "🫙", category: "Dairy & Eggs", inStock: true },

  // Bakery
  { name: "Sourdough Bread", weight: "400g", price: 85, oldPrice: 110, time: "10 min", img: "🍞", category: "Bakery", inStock: false },
  { name: "Croissants", weight: "4 pcs", price: 140, oldPrice: 180, time: "10 min", img: "🥐", category: "Bakery", inStock: true },
  { name: "Pasta", weight: "500g", price: 65, oldPrice: 80, time: "8 min", img: "🍝", category: "Bakery", inStock: true },
  { name: "Tortilla Wraps", weight: "6 pcs", price: 110, oldPrice: 140, time: "9 min", img: "🌯", category: "Bakery", inStock: true },
  { name: "Bagels", weight: "4 pcs", price: 90, oldPrice: 120, time: "9 min", img: "🥯", category: "Bakery", inStock: true },
  { name: "Whole Wheat Bread", weight: "400g", price: 55, oldPrice: 70, time: "10 min", img: "🍞", category: "Bakery", inStock: true },
  { name: "Muffins", weight: "4 pcs", price: 120, oldPrice: 160, time: "10 min", img: "🧁", category: "Bakery", inStock: true },
  { name: "Pita Bread", weight: "6 pcs", price: 60, oldPrice: 80, time: "9 min", img: "🫓", category: "Bakery", inStock: true },
  { name: "Dinner Rolls", weight: "8 pcs", price: 70, oldPrice: 90, time: "9 min", img: "🍞", category: "Bakery", inStock: false },
  { name: "Cake Slice", weight: "1 pc", price: 95, oldPrice: 120, time: "10 min", img: "🍰", category: "Bakery", inStock: true },

  // Beverages
  { name: "Fresh Orange Juice", weight: "1 liter", price: 95, oldPrice: 120, time: "10 min", img: "🧃", category: "Beverages", inStock: false },
  { name: "Green Tea", weight: "25 bags", price: 110, oldPrice: 140, time: "9 min", img: "🍵", category: "Beverages", inStock: true },
  { name: "Coconut Water", weight: "1 liter", price: 55, oldPrice: 70, time: "10 min", img: "🥥", category: "Beverages", inStock: true },
  { name: "Coffee Beans", weight: "250g", price: 320, oldPrice: 400, time: "9 min", img: "☕", category: "Beverages", inStock: true },
  { name: "Soda Pack", weight: "6 cans", price: 180, oldPrice: 220, time: "10 min", img: "🥤", category: "Beverages", inStock: true },
  { name: "Energy Drink", weight: "4 cans", price: 240, oldPrice: 300, time: "9 min", img: "⚡", category: "Beverages", inStock: true },
  { name: "Sparkling Water", weight: "1 liter", price: 45, oldPrice: 60, time: "8 min", img: "💧", category: "Beverages", inStock: true },
  { name: "Iced Tea", weight: "1 liter", price: 65, oldPrice: 85, time: "9 min", img: "🧊", category: "Beverages", inStock: true },
  { name: "Protein Shake", weight: "350ml", price: 150, oldPrice: 190, time: "9 min", img: "🥤", category: "Beverages", inStock: true },
  { name: "Apple Juice", weight: "1 liter", price: 80, oldPrice: 100, time: "10 min", img: "🧃", category: "Beverages", inStock: true },
  { name: "Hot Chocolate Mix", weight: "250g", price: 180, oldPrice: 220, time: "9 min", img: "🍫", category: "Beverages", inStock: false },

  // Meat & Seafood
  { name: "Chicken Breast", weight: "500g", price: 199, oldPrice: 250, time: "12 min", img: "🍗", category: "Meat & Seafood", inStock: true },
  { name: "Lamb Chops", weight: "500g", price: 450, oldPrice: 550, time: "15 min", img: "🥩", category: "Meat & Seafood", inStock: false },
  { name: "Salmon Fillet", weight: "300g", price: 520, oldPrice: 650, time: "14 min", img: "🐟", category: "Meat & Seafood", inStock: true },
  { name: "Ground Beef", weight: "500g", price: 280, oldPrice: 350, time: "12 min", img: "🥩", category: "Meat & Seafood", inStock: true },
  { name: "Prawns", weight: "250g", price: 350, oldPrice: 420, time: "13 min", img: "🦐", category: "Meat & Seafood", inStock: true },
  { name: "Turkey Slices", weight: "200g", price: 180, oldPrice: 220, time: "10 min", img: "🍗", category: "Meat & Seafood", inStock: true },
  { name: "Chicken Wings", weight: "500g", price: 160, oldPrice: 200, time: "12 min", img: "🍗", category: "Meat & Seafood", inStock: true },
  { name: "Tuna Steak", weight: "250g", price: 400, oldPrice: 500, time: "14 min", img: "🐟", category: "Meat & Seafood", inStock: false },
  { name: "Sausages", weight: "6 pcs", price: 150, oldPrice: 190, time: "10 min", img: "🌭", category: "Meat & Seafood", inStock: true },
  { name: "Crab Meat", weight: "200g", price: 480, oldPrice: 600, time: "15 min", img: "🦀", category: "Meat & Seafood", inStock: true },

  // Snacks
  { name: "Dark Chocolate", weight: "100g", price: 110, oldPrice: 135, time: "8 min", img: "🍫", category: "Snacks", inStock: true },
  { name: "Peanut Butter", weight: "400g", price: 180, oldPrice: 220, time: "9 min", img: "🥜", category: "Snacks", inStock: true },
  { name: "Cookies", weight: "200g", price: 95, oldPrice: 120, time: "8 min", img: "🍪", category: "Snacks", inStock: true },
  { name: "Ice Cream", weight: "500ml", price: 175, oldPrice: 220, time: "10 min", img: "🍦", category: "Snacks", inStock: true },
  { name: "Potato Chips", weight: "150g", price: 50, oldPrice: 65, time: "8 min", img: "🥔", category: "Snacks", inStock: true },
  { name: "Trail Mix", weight: "250g", price: 160, oldPrice: 200, time: "9 min", img: "🥜", category: "Snacks", inStock: true },
  { name: "Granola Bars", weight: "6 pcs", price: 130, oldPrice: 165, time: "8 min", img: "🥣", category: "Snacks", inStock: true },
  { name: "Popcorn", weight: "200g", price: 60, oldPrice: 80, time: "8 min", img: "🍿", category: "Snacks", inStock: true },
  { name: "Dried Fruits", weight: "200g", price: 140, oldPrice: 175, time: "9 min", img: "🍇", category: "Snacks", inStock: true },
  { name: "Nachos", weight: "200g", price: 85, oldPrice: 110, time: "8 min", img: "🌮", category: "Snacks", inStock: false },
  { name: "Protein Bar", weight: "60g", price: 75, oldPrice: 95, time: "8 min", img: "💪", category: "Snacks", inStock: true },
  { name: "Candy Pack", weight: "250g", price: 90, oldPrice: 115, time: "8 min", img: "🍬", category: "Snacks", inStock: true },

  // Essentials
  { name: "Rice", weight: "1 kg", price: 75, oldPrice: 95, time: "8 min", img: "🍚", category: "Essentials", inStock: true },
  { name: "Honey", weight: "500g", price: 250, oldPrice: 320, time: "10 min", img: "🍯", category: "Essentials", inStock: true },
  { name: "Corn Flakes", weight: "500g", price: 160, oldPrice: 200, time: "8 min", img: "🥣", category: "Essentials", inStock: true },
  { name: "Olive Oil", weight: "500ml", price: 350, oldPrice: 450, time: "10 min", img: "🫒", category: "Essentials", inStock: true },
  { name: "Salt", weight: "1 kg", price: 20, oldPrice: 30, time: "8 min", img: "🧂", category: "Essentials", inStock: true },
  { name: "Sugar", weight: "1 kg", price: 45, oldPrice: 55, time: "8 min", img: "🍬", category: "Essentials", inStock: true },
  { name: "Cooking Oil", weight: "1 liter", price: 140, oldPrice: 170, time: "9 min", img: "🫗", category: "Essentials", inStock: true },
  { name: "Flour", weight: "1 kg", price: 50, oldPrice: 65, time: "8 min", img: "🌾", category: "Essentials", inStock: true },
  { name: "Ketchup", weight: "500g", price: 95, oldPrice: 120, time: "9 min", img: "🍅", category: "Essentials", inStock: true },
  { name: "Soy Sauce", weight: "250ml", price: 65, oldPrice: 85, time: "9 min", img: "🫗", category: "Essentials", inStock: true },
  { name: "Vinegar", weight: "500ml", price: 40, oldPrice: 55, time: "8 min", img: "🫗", category: "Essentials", inStock: true },
  { name: "Pepper Powder", weight: "100g", price: 60, oldPrice: 80, time: "9 min", img: "🌶️", category: "Essentials", inStock: true },
  { name: "Turmeric", weight: "100g", price: 45, oldPrice: 60, time: "8 min", img: "🟡", category: "Essentials", inStock: true },

  // Frozen Foods
  { name: "Frozen Pizza", weight: "350g", price: 220, oldPrice: 280, time: "12 min", img: "🍕", category: "Frozen Foods", inStock: true },
  { name: "Frozen Peas", weight: "500g", price: 65, oldPrice: 85, time: "10 min", img: "🟢", category: "Frozen Foods", inStock: true },
  { name: "Fish Fingers", weight: "300g", price: 180, oldPrice: 230, time: "11 min", img: "🐟", category: "Frozen Foods", inStock: true },
  { name: "Frozen Fries", weight: "500g", price: 120, oldPrice: 150, time: "10 min", img: "🍟", category: "Frozen Foods", inStock: true },
  { name: "Frozen Berries", weight: "300g", price: 160, oldPrice: 200, time: "10 min", img: "🫐", category: "Frozen Foods", inStock: false },
  { name: "Ice Cream Tub", weight: "1 liter", price: 280, oldPrice: 350, time: "12 min", img: "🍨", category: "Frozen Foods", inStock: true },
  { name: "Frozen Dumplings", weight: "400g", price: 200, oldPrice: 250, time: "11 min", img: "🥟", category: "Frozen Foods", inStock: true },
  { name: "Frozen Waffles", weight: "300g", price: 140, oldPrice: 180, time: "10 min", img: "🧇", category: "Frozen Foods", inStock: true },

  // Personal Care
  { name: "Shampoo", weight: "250ml", price: 190, oldPrice: 240, time: "10 min", img: "🧴", category: "Personal Care", inStock: true },
  { name: "Body Wash", weight: "250ml", price: 170, oldPrice: 210, time: "10 min", img: "🧴", category: "Personal Care", inStock: true },
  { name: "Toothpaste", weight: "150g", price: 85, oldPrice: 110, time: "9 min", img: "🪥", category: "Personal Care", inStock: true },
  { name: "Face Wash", weight: "100ml", price: 150, oldPrice: 190, time: "9 min", img: "🧴", category: "Personal Care", inStock: true },
  { name: "Sunscreen", weight: "100ml", price: 280, oldPrice: 350, time: "10 min", img: "☀️", category: "Personal Care", inStock: true },
  { name: "Hand Sanitizer", weight: "200ml", price: 75, oldPrice: 95, time: "8 min", img: "🧴", category: "Personal Care", inStock: true },
  { name: "Deodorant", weight: "150ml", price: 160, oldPrice: 200, time: "9 min", img: "✨", category: "Personal Care", inStock: false },

  // Baby Care
  { name: "Baby Diapers", weight: "40 pcs", price: 650, oldPrice: 800, time: "12 min", img: "👶", category: "Baby Care", inStock: true },
  { name: "Baby Wipes", weight: "80 pcs", price: 120, oldPrice: 150, time: "10 min", img: "🧻", category: "Baby Care", inStock: true },
  { name: "Baby Food", weight: "200g", price: 95, oldPrice: 120, time: "10 min", img: "🍼", category: "Baby Care", inStock: true },
  { name: "Baby Lotion", weight: "200ml", price: 180, oldPrice: 230, time: "10 min", img: "🧴", category: "Baby Care", inStock: true },
  { name: "Baby Shampoo", weight: "200ml", price: 150, oldPrice: 190, time: "10 min", img: "🧴", category: "Baby Care", inStock: false },

  // Household
  { name: "Dish Soap", weight: "500ml", price: 85, oldPrice: 110, time: "9 min", img: "🧽", category: "Household", inStock: true },
  { name: "Laundry Detergent", weight: "1 kg", price: 220, oldPrice: 280, time: "10 min", img: "🧺", category: "Household", inStock: true },
  { name: "Trash Bags", weight: "30 pcs", price: 95, oldPrice: 120, time: "9 min", img: "🗑️", category: "Household", inStock: true },
  { name: "Paper Towels", weight: "2 rolls", price: 110, oldPrice: 140, time: "9 min", img: "🧻", category: "Household", inStock: true },
  { name: "Floor Cleaner", weight: "500ml", price: 130, oldPrice: 165, time: "10 min", img: "🧹", category: "Household", inStock: true },
  { name: "Glass Cleaner", weight: "500ml", price: 95, oldPrice: 120, time: "9 min", img: "✨", category: "Household", inStock: true },
  { name: "Air Freshener", weight: "250ml", price: 140, oldPrice: 180, time: "9 min", img: "🌸", category: "Household", inStock: false },
  { name: "Tissue Box", weight: "200 pcs", price: 65, oldPrice: 85, time: "8 min", img: "🧻", category: "Household", inStock: true },

  // Pet Care
  { name: "Dog Food", weight: "1 kg", price: 320, oldPrice: 400, time: "12 min", img: "🐕", category: "Pet Care", inStock: true },
  { name: "Cat Food", weight: "500g", price: 220, oldPrice: 280, time: "11 min", img: "🐈", category: "Pet Care", inStock: true },
  { name: "Pet Treats", weight: "200g", price: 150, oldPrice: 190, time: "10 min", img: "🦴", category: "Pet Care", inStock: true },
  { name: "Pet Shampoo", weight: "250ml", price: 180, oldPrice: 230, time: "10 min", img: "🐾", category: "Pet Care", inStock: false },
];

export const featuredProducts = allProducts.slice(0, 12);
