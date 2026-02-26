import { inArray } from "drizzle-orm";
import { productsSchema } from "../../infrastructure/db/schema/products";
import { DBType } from "../../infrastructure/db/client";

export class ProductRepository {
  constructor(private db: DBType) {}

  async getAll() {
    return this.db.select().from(productsSchema);
  }

  async getByIds(ids: string[]) {
    return this.db
    .select()
    .from(productsSchema)
    .where(inArray(productsSchema.id, ids));
  }
}