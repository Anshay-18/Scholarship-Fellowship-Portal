import { Router } from 'express';
import { createOrder, getBuyerOrders, getFarmerOrders } from '../controllers/orderController.js';
import { verifyToken, requireRole } from '../middleware/authMiddleware.js';

const router = Router();

// Buyer places order directly with farmer
router.post('/', verifyToken, requireRole('BUYER'), createOrder);

// Buyer order history
router.get('/buyer', verifyToken, requireRole('BUYER'), getBuyerOrders);

// Farmer incoming orders & fulfillment
router.get('/farmer', verifyToken, requireRole('FARMER'), getFarmerOrders);

export default router;
