import { Router } from 'express';
import { listPerfumes, getPerfume, createPerfume, updatePerfume, deletePerfume } from '../controllers/perfume.controller.js';
import { protect, authorize } from '../middleware/auth.js';
import validate from '../middleware/validate.js';
import { perfumeRules, perfumeUpdateRules, idParam } from '../validators/index.js';
import { perfumeReviewRouter } from './review.routes.js';

const router = Router();
router.use('/:perfumeId/reviews', perfumeReviewRouter);

router.get('/', listPerfumes);
router.get('/:slug', getPerfume);
router.post('/', protect, authorize('admin'), perfumeRules, validate, createPerfume);
router.put('/:id', protect, authorize('admin'), idParam(), perfumeUpdateRules, validate, updatePerfume);
router.delete('/:id', protect, authorize('admin'), idParam(), validate, deletePerfume);
export default router;
