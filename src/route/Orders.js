
import { Router } from "express";
import getOrders from '../controlz/order/get-orders.js'; 
import postOrder from "../controlz/order/post-order.js";
const router = Router();

router.get('/all', getOrders);
router.post('/order', postOrder)
export default router;
