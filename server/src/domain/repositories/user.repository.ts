import { db } from "../../infrastructure/db/client";
import { usersSchema } from "../../infrastructure/db/schema/users";
import { eq } from "drizzle-orm";

class UserRepository {
  async createUser(user: {
    name: string;
    email: string;
    passwordHash: string;
    phone: string;
  }) {
    return db.insert(usersSchema).values(user).returning();
  }

  async findByEmail(email: string) {
    return db
      .select()
      .from(usersSchema)
      .where(eq(usersSchema.email, email))
      .limit(1);
  }

  async findById(id: string) {
    return db
      .select()
      .from(usersSchema)
      .where(eq(usersSchema.id, id))
      .limit(1);
  }
}

export default new UserRepository();