import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRepository } from "../../../domain/repositories/user.repository";

const JWT_SECRET = "secret_1234"; // TODO: move to .env

export class LoginUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ email, password }: { email: string; password: string }) {
    const user = await this.userRepository.findByEmail(email);
    if (!user[0]) {
      throw new Error("Invalid email or password");
    }

    const valid = await bcrypt.compare(password, user[0].passwordHash);
    if (!valid) throw new Error("Invalid email or password");

    const token = jwt.sign({ userId: user[0].id }, JWT_SECRET, { expiresIn: "1d" });

    const resUser = {
      user: {
        id: user[0].id,
        email: user[0].email,
        name: user[0].name,
        phone: user[0].phone,
      },
      token
    };

    return resUser;
  }
}

