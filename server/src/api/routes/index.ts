import { basketRoutes } from "./basket.routes";
import { ordersRoutes } from "./order.routes";
import { paymentsRoutes } from "./payment.routes";
import { productsRoutes } from "./product.routes";
import { usersRoutes } from "./users.routes";

export const routes = [
  usersRoutes,
  productsRoutes,
  basketRoutes,
  ordersRoutes,
  paymentsRoutes
];