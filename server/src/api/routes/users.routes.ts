import { Elysia } from "elysia";
import usersController from "../controllers/users.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export const usersRoutes = new Elysia({ prefix: "/users" })
  .post("/register", ({ body }) => usersController.register(body))
  .post("/login", ({ body }) => usersController.login(body))
  .get(
    "/me",
    ({ userId }) => {
      return usersController.getMe(userId);
    },
    {
      beforeHandle: authMiddleware,
    }
  );
