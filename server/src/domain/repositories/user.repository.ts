import { DBType } from "../../infrastructure/db/client";
import { usersSchema } from "../../infrastructure/db/schema/users";
import { eq } from "drizzle-orm";

export class UserRepository {
  constructor(private db: DBType) {}

  async createUser(user: {
    name: string;
    email: string;
    passwordHash: string;
    phone: string;
  }) {
    return this.db.insert(usersSchema).values(user).returning();
  }

  async findByEmail(email: string) {
    return this.db
      .select()
      .from(usersSchema)
      .where(eq(usersSchema.email, email))
      .limit(1);
  }

  async findById(id: string) {
    return this.db
      .select()
      .from(usersSchema)
      .where(eq(usersSchema.id, id))
      .limit(1);
  }
}
