import { db } from "../client";
import { productsSchema } from "../schema/products";

export async function seedProducts() {
  const products = [
    {
      title: "Espresso",
      shortDescription: "Strong and black coffee",
      description: "A rich, full-bodied espresso made from premium beans.",
      count: 50,
      price: 2500,
      image: "https://truffle.pythonanywhere.com/media/products/cherry-cinnamon-truffle.jpg",
    },
    {
      title: "Cappuccino",
      shortDescription: "Coffee with milk foam",
      description: "Smooth espresso with steamed milk and creamy foam on top.",
      count: 40,
      price: 3500,
      image: "https://truffle.pythonanywhere.com/media/products/cherry-cinnamon-truffle.jpg",
    },
    {
      title: "Latte",
      shortDescription: "Mild coffee with milk",
      description: "A mellow espresso drink with plenty of steamed milk.",
      count: 30,
      price: 4000,
      image: "https://truffle.pythonanywhere.com/media/products/cherry-cinnamon-truffle.jpg",
    },
    {
      title: "Green Tea",
      shortDescription: "Refreshing tea leaves",
      description: "Organic green tea leaves with a delicate flavor.",
      count: 60,
      price: 2000,
      image: "https://truffle.pythonanywhere.com/media/products/vegan-molochnyi-triufel-cherkasy_5FgHxIX.jpg",
    },
    {
      title: "Black Tea",
      shortDescription: "Classic tea",
      description: "Traditional black tea, perfect for any time of day.",
      count: 50,
      price: 1800,
      image: "https://truffle.pythonanywhere.com/media/products/vegan-molochnyi-triufel-cherkasy_5FgHxIX.jpg",
    },
    {
      title: "Chocolate Muffin",
      shortDescription: "Sweet chocolate treat",
      description: "Soft muffin loaded with chocolate chips.",
      count: 25,
      price: 3000,
      image: "https://truffle.pythonanywhere.com/media/products/vegan-molochnyi-triufel-cherkasy_5FgHxIX.jpg",
    },
    {
      title: "Blueberry Muffin",
      shortDescription: "Fruit-flavored muffin",
      description: "Fresh muffins with real blueberries inside.",
      count: 25,
      price: 3200,
      image: "https://truffle.pythonanywhere.com/media/products/hazelnut-truffle-vegan.jpg",
    },
    {
      title: "Sandwich",
      shortDescription: "Tasty snack",
      description: "Whole wheat sandwich with fresh vegetables and cheese.",
      count: 35,
      price: 4500,
      image: "https://truffle.pythonanywhere.com/media/products/hazelnut-truffle-vegan.jpg",
    },
  ];

  await db.insert(productsSchema).values(products);
  console.log("Seeded 8 products successfully!");
}

// Для запуска через Bun / Node:
if (require.main === module) {
  seedProducts()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}