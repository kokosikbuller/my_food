import { eq } from "drizzle-orm";
import { db } from "../../infrastructure/db/client";
import { basketsSchema } from "../../infrastructure/db/schema/basket";

class BasketRepository {
	async create(userId: string) {
		return db.insert(basketsSchema).values({ userId }).returning();
	}

	async getByUserId(userId: string) {
		const [basket] = await db.select()
			.from(basketsSchema)
			.where(eq(basketsSchema.userId, userId))
			.limit(1);

		return basket ?? null;
	}
}

export default new BasketRepository();
