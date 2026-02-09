import { Router } from 'express';
import { FraudDetectionController } from '../controllers/FraudDetectionController';

const router = Router();

// Analyze a transaction for fraud
router.post('/analyze', FraudDetectionController.analyzeTransaction);

// Get fraud alerts
router.get('/alerts', FraudDetectionController.getFraudAlerts);

// Get fraud statistics
router.get('/stats', FraudDetectionController.getFraudStats);

// Update fraud model
router.post('/model/train', FraudDetectionController.trainModel);

export const fraudDetectionRoutes = router;