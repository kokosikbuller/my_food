import getProductsUsecase from '../../application/products/use-cases/get-products.usecase';

class ProductsController {
  async getAll() {
    return getProductsUsecase.execute();
  }
};

export default new ProductsController();