import getMeUserUsecase from "../../application/users/use-cases/get-me-user.usecase";
import loginUserUsecase from "../../application/users/use-cases/login-user.usecase";
import registerUserUsecase from "../../application/users/use-cases/register-user.usecase";

class UsersController {
  async register({ name, email, password, phone }: any) {
    const useCase = registerUserUsecase;
    return useCase.execute({ name, email, password, phone });
  }

  async login({ email, password }: any) {
    const useCase = loginUserUsecase;
    return useCase.execute({ email, password });
  }

  async getMe(id: any) {
    console.log('getMe', id);
    
    const useCase = getMeUserUsecase;
    return useCase.execute({ id });
  }
};

export default new UsersController();