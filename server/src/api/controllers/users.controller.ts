import { GetMeUserUseCase } from "../../application/users/use-cases/get-me-user.usecase";
import { LoginUserUseCase } from "../../application/users/use-cases/login-user.usecase";
import { RegisterUserUseCase } from "../../application/users/use-cases/register-user.usecase";

export class UsersController {
  constructor(private getMeUserUsecase: GetMeUserUseCase, private loginUserUsecase: LoginUserUseCase, private registerUserUsecase: RegisterUserUseCase) { }

  async register({ name, email, password, phone }: any) {
    const useCase = this.registerUserUsecase;
    return useCase.execute({ name, email, password, phone });
  }

  async login({ email, password }: any) {
    const useCase = this.loginUserUsecase;
    return useCase.execute({ email, password });
  }

  async getMe(id: any) {
    console.log('getMe', id);

    const useCase = this.getMeUserUsecase;
    return useCase.execute({ id });
  }
};
