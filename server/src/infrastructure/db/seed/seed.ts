import { db } from "../client";
import { categoriesSchema } from "../schema/categories";
import { orderItemsSchema } from "../schema/order_items";
import { productsSchema } from "../schema/products";
import { seedCategories } from "./categories.seed";
import { seedProducts } from "./products.seed";

if (require.main === module) {
  (async () => {
    try {
      const shouldReset = process.argv.includes("--reset");

      if(shouldReset) {
        console.log("🗑 Clearing tables...");
        await db.delete(orderItemsSchema);
        await db.delete(productsSchema);
        await db.delete(categoriesSchema);
      }
      
      await seedCategories();
      await seedProducts();

      console.log("✅ Seeding completed successfully!");
      process.exit(0);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  })()
}