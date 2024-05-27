import { Router } from "express";
import ordersRoutes from './orders.route';

const routes = Router();
routes.use('/orders', ordersRoutes);
export default routes;