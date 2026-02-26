import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { DBType } from "../../infrastructure/db/client";
import { ordersSchema } from "../../infrastructure/db/schema/orders";
import { eq } from "drizzle-orm";
import { OrderStatus } from "../../types";

export interface CreateOrderParams {
  userId: string;
  totalPrice: number;
  status: OrderStatus;
}

export interface OrderRepositoryT {
  create(data: CreateOrderParams): Promise<any>;
  findById(id: string): Promise<any | null>;
  findByUserId(userId: string): Promise<any[]>;
  updateStatus(id: string, status: OrderStatus): Promise<void>;
}

export class OrderRepository {
  constructor(private db: DBType) {}

  create(data: CreateOrderParams, tx?: PostgresJsDatabase<any>) {
		const executor = tx ?? this.db;

    return executor.insert(ordersSchema).values(data).returning();
  }

  findByUserId(userId: string) {
    return this.db
    	.select()
      .from(ordersSchema)
      .where(eq(ordersSchema.userId, userId));
  }

  findById(id: string) {
    return this.db
			.select()
      .from(ordersSchema)
      .where(eq(ordersSchema.id, id))
      .limit(1);
  }

  updateStatus(id: string, status: OrderStatus) {
    return this.db
			.update(ordersSchema)
      .set({ status })
      .where(eq(ordersSchema.id, id));
  }
}
