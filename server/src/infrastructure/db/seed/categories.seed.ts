import { db } from "../client";
import { categoriesSchema } from "../schema/categories";

export async function seedCategories() {
  const categories = [
    {
      name: "Coffee"
    },
    {
      name: "Tea"
    },
    {
      name: "Muffins"
    },
    {
      name: "Snacks"
    }
  ];

  await db.insert(categoriesSchema).values(categories);
  console.log("Seeded 4 categories successfully!");
};
