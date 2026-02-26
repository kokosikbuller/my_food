import { eq } from "drizzle-orm";
import { DBType } from "../../infrastructure/db/client";
import { basketsSchema } from "../../infrastructure/db/schema/basket";

export class BasketRepository {
	constructor(private db: DBType) {}

	async create(userId: string) {
		return this.db.insert(basketsSchema).values({ userId }).returning();
	}

	async getByUserId(userId: string) {
		const [basket] = await this.db.select()
			.from(basketsSchema)
			.where(eq(basketsSchema.userId, userId))
			.limit(1);

		return basket ?? null;
	}
}
