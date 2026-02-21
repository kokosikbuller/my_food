import { UserRepository } from "../../../domain/repositories/user.repository";

export class GetMeUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ id }: { id: string; }) {
    const user = await this.userRepository.findById(id);
    
    if (!user[0]) {
      throw new Error("Invalid email or password");
    }

    const resUser = {
      user: {
        id: user[0].id,
        email: user[0].email,
        name: user[0].name,
        phone: user[0].phone,
      }
    };

    return resUser;
  }
}
