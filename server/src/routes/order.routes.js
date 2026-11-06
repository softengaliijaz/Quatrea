import { Router } from 'express';
import { createOrder, myOrders, getOrder, cancelOrder, listOrders, updateOrderStatus } from '../controllers/order.controller.js';
import { protect, authorize } from '../middleware/auth.js';
import validate from '../middleware/validate.js';
import { orderRules, orderStatusRules, idParam } from '../validators/index.js';

const router = Router();
router.use(protect);
router.post('/', orderRules, validate, createOrder);
router.get('/mine', myOrders);
router.get('/', authorize('admin'), listOrders);
router.get('/:id', idParam(), validate, getOrder);
router.patch('/:id/cancel', idParam(), validate, cancelOrder);
router.patch('/:id/status', authorize('admin'), idParam(), orderStatusRules, validate, updateOrderStatus);
export default router;
