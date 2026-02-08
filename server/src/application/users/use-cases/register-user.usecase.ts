import bcrypt from "bcrypt";
import userRepository from "../../../domain/repositories/user.repository";

class RegisterUserUseCase {
  async execute({ name, email, password, phone }: { name: string; email: string; password: string; phone: string }) {
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser.length > 0) {
      throw new Error("User with this email already exists");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await userRepository.createUser({ name, email, passwordHash, phone });
    return user[0];
  }
}

export default new RegisterUserUseCase();
