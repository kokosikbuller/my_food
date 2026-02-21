import { Elysia } from "elysia";
import type { ProductsController } from "../controllers/product.controller";

export const createProductsRoutes = (
  productController: ProductsController
) =>
  new Elysia({ prefix: "/products" })
    .get("/", () => {
      return productController.getAll();
    });
