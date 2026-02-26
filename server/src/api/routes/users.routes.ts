import { Elysia } from "elysia";
import { UsersController } from "../controllers/users.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export const createUsersRoutes = (
  userController: UsersController
) =>
  new Elysia({ prefix: "/users" })
    .post("/register", ({ body }) => userController.register(body))
    .post("/login", ({ body }) => userController.login(body))
    .get('/me', ({ userId }) => {
      return userController.getMe(userId);
    }, {
      beforeHandle: authMiddleware,
    })

