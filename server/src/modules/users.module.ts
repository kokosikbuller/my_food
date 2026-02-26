import Elysia from "elysia";
import { GetMeUserUseCase } from "../application/users/use-cases/get-me-user.usecase";
import { LoginUserUseCase } from "../application/users/use-cases/login-user.usecase";
import { RegisterUserUseCase } from "../application/users/use-cases/register-user.usecase";
import { UserRepository } from "../domain/repositories/user.repository";
import { DBType } from "../infrastructure/db/client";
import { UsersController } from "../api/controllers/users.controller";
import { createUsersRoutes } from "../api/routes/users.routes";

export function createUsersModule(db: DBType) {
    const userRepository = new UserRepository(db);
    const getMeUserUseCase = new GetMeUserUseCase(userRepository);
    const loginUserUseCase = new LoginUserUseCase(userRepository);
    const registerUserUseCase = new RegisterUserUseCase(userRepository);

    const userController = new UsersController(getMeUserUseCase, loginUserUseCase, registerUserUseCase);

    return new Elysia().use(createUsersRoutes(userController))
}