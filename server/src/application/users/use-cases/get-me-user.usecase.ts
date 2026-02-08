import userRepository from "../../../domain/repositories/user.repository";

class GetMeUserUseCase {
  async execute({ id }: { id: string; }) {
    const user = await userRepository.findById(id);
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

export default new GetMeUserUseCase();
