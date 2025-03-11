// ordersRouter.js (or your router file)
import { Router } from "express";
import getOrders from '../controlz/order/get-orders.js'; // Import the handler

const router = Router();


router.get('/', getOrders);

export default router; // Export the router
