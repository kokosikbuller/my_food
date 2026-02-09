import { eq, inArray } from "drizzle-orm";
import { db } from "../../infrastructure/db/client";
import { productsSchema } from "../../infrastructure/db/schema/products";

class ProductRepository {
  async getAll() {
    return db.select().from(productsSchema);
  }

  async getByIds(ids: string[]) {
    return db
    .select()
    .from(productsSchema)
    .where(inArray(productsSchema.id, ids));
  }
}

export default new ProductRepository();