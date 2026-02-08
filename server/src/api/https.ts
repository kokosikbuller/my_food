import { Elysia } from "elysia";
import { routes } from "./routes/index";
import jwt from "@elysiajs/jwt";

export const app = new Elysia();

app.use(
  jwt({ name: "jwt", secret: "secret_1234" })
)
app.use(routes);
