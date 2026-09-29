import { Router } from 'express';
import {
  assessCropQuality,
  checkPriceGuardrail,
  createCropListing,
  getAllProducts,
  getProductById
} from '../controllers/productController.js';
import { verifyToken, requireRole } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = Router();

// Public marketplace browsing
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// AI Computer Vision Quality Assessment (with multipart image upload)
router.post('/assess-quality', upload.single('image'), assessCropQuality);

// Fair-Price & Guardrails evaluation
router.post('/price-guardrail', checkPriceGuardrail);

// Farmer authenticated crop listing
router.post('/', verifyToken, requireRole('FARMER'), createCropListing);

export default router;
