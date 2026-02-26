import { ProductRepository } from "../../../domain/repositories/product.repository";

export class GetProductsUseCase {
  constructor(private productRepo: ProductRepository) {}

  async execute() {
    const products = await this.productRepo.getAll();
    return products;
  }
}
