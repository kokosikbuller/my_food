import productRepository from "../../../domain/repositories/product.repository";

class GetProductsUseCase {
  private productRepo = productRepository;

  async execute() {
    const products = await this.productRepo.getAll();
    return products;
  }
}

export default new GetProductsUseCase();