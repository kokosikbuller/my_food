import { GetProductsUseCase } from "../../application/products/use-cases/get-products.usecase";

export class ProductsController {
  constructor(private getProductsUsecase: GetProductsUseCase) {}

  async getAll() {
    return this.getProductsUsecase.execute();
  }
};