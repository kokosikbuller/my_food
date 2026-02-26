import bcrypt from "bcrypt";
import { UserRepository } from "../../../domain/repositories/user.repository";

export class RegisterUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ name, email, password, phone }: { name: string; email: string; password: string; phone: string }) {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser.length > 0) {
      throw new Error("User with this email already exists");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await this.userRepository.createUser({ name, email, passwordHash, phone });
    return user[0];
  }
}
