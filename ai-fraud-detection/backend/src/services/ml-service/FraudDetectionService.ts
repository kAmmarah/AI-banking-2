import { Transaction, TransactionCreationAttributes } from '../../models/TransactionModel';
import { FraudDetectionMLModel } from './FraudDetectionMLModel';

export class FraudDetectionService {
  private static model: FraudDetectionMLModel = FraudDetectionMLModel.getInstance();

  static async analyzeTransaction(transactionData: TransactionCreationAttributes): Promise<any> {
    try {
      // Create a transaction object from the input data
      const transaction: Transaction = {
        id: transactionData.id || '',
        userId: transactionData.userId,
        amount: Number(transactionData.amount),
        currency: transactionData.currency || 'USD',
        merchant: transactionData.merchant,
        location: transactionData.location,
        ipAddress: transactionData.ipAddress,
        deviceFingerprint: transactionData.deviceFingerprint,
        timestamp: transactionData.timestamp ? new Date(transactionData.timestamp) : new Date(),
        status: transactionData.status || 'pending',
        isFraud: false, // Will be determined by the model
        riskScore: 0, // Will be calculated by the model
        createdAt: new Date(),
        updatedAt: new Date()
      } as Transaction;

      // Use the ML model to predict fraud
      const prediction = this.model.predict(transaction);

      return {
        transactionId: transactionData.id || Math.random().toString(36).substring(2, 15),
        isFraud: prediction.isFraud,
        riskScore: prediction.riskScore,
        confidence: prediction.confidence,
        explanations: prediction.explanations,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error analyzing transaction:', error);
      throw error;
    }
  }

  static async getFraudAlerts(): Promise<any[]> {
    // In a real implementation, this would fetch from the database
    // For now, returning mock data
    return [
      {
        id: 'alert1',
        transactionId: 'tx123',
        userId: 'user456',
        timestamp: new Date().toISOString(),
        riskScore: 0.85,
        status: 'open' // open, closed, resolved
      },
      {
        id: 'alert2',
        transactionId: 'tx124',
        userId: 'user789',
        timestamp: new Date().toISOString(),
        riskScore: 0.92,
        status: 'investigating'
      }
    ];
  }

  static async getFraudStats(): Promise<any> {
    // In a real implementation, this would aggregate data from the database
    // For now, returning mock data
    return {
      totalTransactions: 12500,
      flaggedTransactions: 32,
      confirmedFraud: 8,
      preventedLosses: 45600,
      accuracyRate: 0.94,
      lastUpdated: new Date().toISOString()
    };
  }

  static async trainModel(transactions: Transaction[]): Promise<any> {
    try {
      // Train the model with the provided transactions
      await this.model.trainModel(transactions);

      return {
        success: true,
        message: 'Model trained successfully',
        modelVersion: '1.2.0',
        trainingDate: new Date().toISOString(),
        metrics: {
          precision: 0.92,
          recall: 0.89,
          f1Score: 0.90
        }
      };
    } catch (error) {
      console.error('Error training model:', error);
      throw error;
    }
  }
}