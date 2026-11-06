import { Router } from 'express';
import { getCart, addToCart, updateCartItem, removeCartItem, clearCart } from '../controllers/cart.controller.js';
import { protect } from '../middleware/auth.js';
import validate from '../middleware/validate.js';
import { cartAddRules, cartUpdateRules, idParam } from '../validators/index.js';

const router = Router();
router.use(protect);
router.get('/', getCart);
router.post('/', cartAddRules, validate, addToCart);
router.delete('/', clearCart);
router.put('/:perfumeId', idParam('perfumeId'), cartUpdateRules, validate, updateCartItem);
router.delete('/:perfumeId', idParam('perfumeId'), validate, removeCartItem);
export default router;
