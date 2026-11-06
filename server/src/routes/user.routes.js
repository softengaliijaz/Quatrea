import { Router } from 'express';
import { updateProfile, changePassword, getWishlist, toggleWishlist, listUsers, updateRole, deleteUser } from '../controllers/user.controller.js';
import { protect, authorize } from '../middleware/auth.js';
import validate from '../middleware/validate.js';
import { profileRules, passwordRules, roleRules, idParam } from '../validators/index.js';

const router = Router();
router.use(protect);
router.put('/me', profileRules, validate, updateProfile);
router.put('/me/password', passwordRules, validate, changePassword);
router.get('/me/wishlist', getWishlist);
router.post('/me/wishlist/:perfumeId', idParam('perfumeId'), validate, toggleWishlist);

router.get('/', authorize('admin'), listUsers);
router.patch('/:id/role', authorize('admin'), idParam(), roleRules, validate, updateRole);
router.delete('/:id', authorize('admin'), idParam(), validate, deleteUser);
export default router;
