import { Request, Response } from 'express';
import { FraudDetectionService } from '../services/ml-service/FraudDetectionService';

export class FraudDetectionController {
  static async analyzeTransaction(req: Request, res: Response) {
    try {
      const transactionData = req.body;
      const result = await FraudDetectionService.analyzeTransaction(transactionData);
      res.status(200).json(result);
    } catch (error) {
      console.error('Error analyzing transaction:', error);
      res.status(500).json({ error: 'Failed to analyze transaction for fraud' });
    }
  }

  static async getFraudAlerts(req: Request, res: Response) {
    try {
      const alerts = await FraudDetectionService.getFraudAlerts();
      res.status(200).json(alerts);
    } catch (error) {
      console.error('Error fetching fraud alerts:', error);
      res.status(500).json({ error: 'Failed to fetch fraud alerts' });
    }
  }

  static async getFraudStats(req: Request, res: Response) {
    try {
      const stats = await FraudDetectionService.getFraudStats();
      res.status(200).json(stats);
    } catch (error) {
      console.error('Error fetching fraud stats:', error);
      res.status(500).json({ error: 'Failed to fetch fraud statistics' });
    }
  }

  static async trainModel(req: Request, res: Response) {
    try {
      const trainingData = req.body;
      const result = await FraudDetectionService.trainModel(trainingData);
      res.status(200).json(result);
    } catch (error) {
      console.error('Error training model:', error);
      res.status(500).json({ error: 'Failed to train fraud detection model' });
    }
  }
}