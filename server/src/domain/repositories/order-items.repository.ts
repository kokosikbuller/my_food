import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { DBType } from "../../infrastructure/db/client";
import { orderItemsSchema } from "../../infrastructure/db/schema/order_items";
import { eq } from "drizzle-orm";

export interface CreateOrderItemParams {
  orderId: string;
  productId: string;
  title: string;
  price: number;
  quantity: number;
}

export interface OrderItemsRepositoryT {
  createMany(items: CreateOrderItemParams[]): Promise<void>;
  findByOrderId(orderId: string): Promise<any[]>;
}

export class OrderItemsRepository {
  constructor(private db: DBType) {}

  async createMany(items: CreateOrderItemParams[], tx?: PostgresJsDatabase<any>) {
    if (!items.length) return;
		const executor = tx ?? this.db;

    await executor.insert(orderItemsSchema).values(items);
  }

  async findByOrderId(orderId: string) {
    return await this.db
			.select()
      .from(orderItemsSchema)
      .where(eq(orderItemsSchema.orderId, orderId));
  }
}
