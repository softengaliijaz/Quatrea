import { Router } from 'express';
import { listReviews, createReview, deleteReview } from '../controllers/review.controller.js';
import { protect } from '../middleware/auth.js';
import validate from '../middleware/validate.js';
import { reviewRules, idParam } from '../validators/index.js';

// Mounted at /api/perfumes/:perfumeId/reviews
export const perfumeReviewRouter = Router({ mergeParams: true });
perfumeReviewRouter.get('/', idParam('perfumeId'), validate, listReviews);
perfumeReviewRouter.post('/', protect, idParam('perfumeId'), reviewRules, validate, createReview);

// Mounted at /api/reviews
const router = Router();
router.delete('/:id', protect, idParam(), validate, deleteReview);
export default router;
