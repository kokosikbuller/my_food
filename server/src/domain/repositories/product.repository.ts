import { db } from "../../infrastructure/db/client";
import { productsSchema } from "../../infrastructure/db/schema/products";

class ProductRepository {
  async getAll() {
    return db.select().from(productsSchema);
  }
}

export default new ProductRepository();