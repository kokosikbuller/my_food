import { and, eq } from "drizzle-orm";
import { db } from "../../infrastructure/db/client";
import { basketItemsSchema } from "../../infrastructure/db/schema/basket_items";
import { productsSchema } from "../../infrastructure/db/schema/products";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";

class BasketItemsRepository {
  async create(basketId: string, productId: string, quantity: number) {
    return db
      .insert(basketItemsSchema)
      .values({ basketId, productId, quantity })
      .returning();
  }

  async getItemsByBasketId(basketId: string) {
    return db
      .select({
        quantity: basketItemsSchema.quantity,
        id: basketItemsSchema.id,
        product: {
          id: productsSchema.id,
          title: productsSchema.title,
          price: productsSchema.price,
          image: productsSchema.image,
        }
      })
      .from(basketItemsSchema)
      .innerJoin(
        productsSchema,
        eq(basketItemsSchema.productId, productsSchema.id)
      )
      .where(eq(basketItemsSchema.basketId, basketId));
  }

  async updateQuantity(id: string, quantity: number) {
    return await db
      .update(basketItemsSchema)
      .set({ quantity })
      .where(eq(basketItemsSchema.id, id))
      .returning();
  }

  async getItem(basketId: string, productId: string) {
    const [item] = await db
      .select()
      .from(basketItemsSchema)
      .where(
        and(
          eq(basketItemsSchema.basketId, basketId),
          eq(basketItemsSchema.productId, productId)
        )
      )
      .limit(1);

      return item ?? null;
  }

  async clear(id: string, tx?: PostgresJsDatabase<any>) {
    const executor = tx ?? db;
    return await executor
      .delete(basketItemsSchema)
      .where(eq(basketItemsSchema.id, id));
  }
}

export default new BasketItemsRepository();
