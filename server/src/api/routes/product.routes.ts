import { Elysia } from "elysia";
import productsController from "../controllers/product.controller";

export const productsRoutes = new Elysia({ prefix: "/products" })
  .get("/", async () => await productsController.getAll())