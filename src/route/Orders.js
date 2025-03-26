
import { Router } from "express";
import getOrders from '../controlz/order/get-orders.js'; 
import postOrder from "../controlz/order/post-order.js";
const router = Router();

router.post('/all', getOrders);
router.post('/', postOrder)
export default router;
