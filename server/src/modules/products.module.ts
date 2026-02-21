import Elysia from "elysia";
import { ProductsController } from "../api/controllers/product.controller";
import { GetProductsUseCase } from "../application/products/use-cases/get-products.usecase";
import { ProductRepository } from "../domain/repositories/product.repository";
import { DBType } from "../infrastructure/db/client";
import { createProductsRoutes } from "../api/routes/product.routes";

export const createProductsModule = (db: DBType) => {
  const productRepo = new ProductRepository(db);
  const getProductsUseCase = new GetProductsUseCase(productRepo);
  const productController = new ProductsController(getProductsUseCase);

  return new Elysia()
    .use(createProductsRoutes(productController));
};