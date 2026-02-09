import { Transaction } from '../../models/TransactionModel';

export interface FeatureVector {
  amount: number;
  hour: number;
  dayOfWeek: number;
  merchantRisk: number;
  locationRisk: number;
  userBehaviorDeviation: number;
  transactionFrequency: number;
  velocity: number;
}

export interface PredictionResult {
  isFraud: boolean;
  riskScore: number;
  confidence: number;
  explanations: string[];
}

export class FraudDetectionMLModel {
  private static instance: FraudDetectionMLModel;
  private modelTrained: boolean = false;
  private featureWeights: Record<string, number>;
  
  private constructor() {
    // Initialize with default weights
    this.featureWeights = {
      amount: 0.25,
      hour: 0.15,
      dayOfWeek: 0.10,
      merchantRisk: 0.20,
      locationRisk: 0.15,
      userBehaviorDeviation: 0.10,
      transactionFrequency: 0.03,
      velocity: 0.02
    };
  }
  
  public static getInstance(): FraudDetectionMLModel {
    if (!FraudDetectionMLModel.instance) {
      FraudDetectionMLModel.instance = new FraudDetectionMLModel();
    }
    return FraudDetectionMLModel.instance;
  }
  
  /**
   * Train the model with historical transaction data
   */
  public async trainModel(transactions: Transaction[]): Promise<void> {
    console.log(`Training fraud detection model with ${transactions.length} transactions`);
    
    // In a real implementation, we would use machine learning libraries like TensorFlow.js
    // For this demo, we'll simulate training by analyzing the data patterns
    
    // Calculate average transaction amounts by merchant
    const merchantAmounts: Record<string, number[]> = {};
    transactions.forEach(tx => {
      if (!merchantAmounts[tx.merchant]) {
        merchantAmounts[tx.merchant] = [];
      }
      merchantAmounts[tx.merchant].push(Number(tx.amount));
    });
    
    // Calculate average transaction amounts by location
    const locationAmounts: Record<string, number[]> = {};
    transactions.forEach(tx => {
      if (!locationAmounts[tx.location]) {
        locationAmounts[tx.location] = [];
      }
      locationAmounts[tx.location].push(Number(tx.amount));
    });
    
    // Update model state based on training data
    this.modelTrained = true;
    
    console.log('Fraud detection model training completed');
  }
  
  /**
   * Predict if a transaction is fraudulent
   */
  public predict(transaction: Transaction): PredictionResult {
    if (!this.modelTrained) {
      console.warn('Model not trained, using default heuristics');
    }
    
    // Extract features from the transaction
    const features = this.extractFeatures(transaction);
    
    // Calculate risk score using weighted features
    let riskScore = 0;
    const explanations: string[] = [];
    
    // Amount-based risk (higher amounts = higher risk)
    if (features.amount > 2000) {
      riskScore += this.featureWeights.amount * 0.8;
      explanations.push(`High transaction amount: $${features.amount.toFixed(2)}`);
    } else if (features.amount > 1000) {
      riskScore += this.featureWeights.amount * 0.5;
      explanations.push(`Medium-high transaction amount: $${features.amount.toFixed(2)}`);
    } else if (features.amount > 500) {
      riskScore += this.featureWeights.amount * 0.2;
      explanations.push(`Moderate transaction amount: $${features.amount.toFixed(2)}`);
    }
    
    // Time-based risk (transactions at unusual hours)
    if (features.hour >= 22 || features.hour <= 5) {
      riskScore += this.featureWeights.hour * 0.7;
      explanations.push(`Transaction at unusual hour: ${features.hour}:00`);
    }
    
    // Day of week risk (weekend transactions may be riskier)
    if (features.dayOfWeek === 0 || features.dayOfWeek === 6) {
      riskScore += this.featureWeights.dayOfWeek * 0.3;
      explanations.push('Weekend transaction');
    }
    
    // Merchant risk (based on historical fraud rates)
    if (features.merchantRisk > 0.5) {
      riskScore += this.featureWeights.merchantRisk * 0.9;
      explanations.push(`High-risk merchant: ${transaction.merchant}`);
    } else if (features.merchantRisk > 0.2) {
      riskScore += this.featureWeights.merchantRisk * 0.4;
      explanations.push(`Medium-risk merchant: ${transaction.merchant}`);
    }
    
    // Location risk (unusual location compared to user history)
    if (features.locationRisk > 0.7) {
      riskScore += this.featureWeights.locationRisk * 0.8;
      explanations.push(`Unusual location: ${transaction.location}`);
    } else if (features.locationRisk > 0.4) {
      riskScore += this.featureWeights.locationRisk * 0.4;
      explanations.push(`Somewhat unusual location: ${transaction.location}`);
    }
    
    // User behavior deviation
    if (features.userBehaviorDeviation > 0.8) {
      riskScore += this.featureWeights.userBehaviorDeviation * 0.9;
      explanations.push('Significant deviation from user behavior');
    } else if (features.userBehaviorDeviation > 0.5) {
      riskScore += this.featureWeights.userBehaviorDeviation * 0.5;
      explanations.push('Moderate deviation from user behavior');
    }
    
    // Transaction frequency (many transactions in short time)
    if (features.transactionFrequency > 5) {
      riskScore += this.featureWeights.transactionFrequency * 0.6;
      explanations.push('High transaction frequency');
    }
    
    // Velocity risk (multiple high-value transactions in short time)
    if (features.velocity > 0.8) {
      riskScore += this.featureWeights.velocity * 0.7;
      explanations.push('High transaction velocity');
    }
    
    // Ensure risk score is between 0 and 1
    riskScore = Math.min(1.0, Math.max(0.0, riskScore));
    
    // Determine if transaction is fraudulent (threshold of 0.5)
    const isFraud = riskScore > 0.5;
    
    // Calculate confidence (based on how far the score is from the decision boundary)
    const confidence = Math.abs(riskScore - 0.5) * 2;
    
    return {
      isFraud,
      riskScore: parseFloat(riskScore.toFixed(3)),
      confidence: parseFloat(confidence.toFixed(3)),
      explanations
    };
  }
  
  /**
   * Extract features from a transaction for the ML model
   */
  private extractFeatures(transaction: Transaction): FeatureVector {
    const date = new Date(transaction.timestamp);
    
    // Calculate merchant risk (simulated - in real world, this would come from historical data)
    const merchantRisk = this.calculateMerchantRisk(transaction.merchant);
    
    // Calculate location risk (simulated)
    const locationRisk = this.calculateLocationRisk(transaction.location);
    
    // Calculate user behavior deviation (simulated)
    const userBehaviorDeviation = this.calculateUserBehaviorDeviation(transaction);
    
    // Calculate transaction frequency (simulated)
    const transactionFrequency = this.calculateTransactionFrequency(transaction.userId);
    
    // Calculate velocity (simulated)
    const velocity = this.calculateVelocity(transaction.userId, transaction.timestamp);
    
    return {
      amount: Number(transaction.amount),
      hour: date.getHours(),
      dayOfWeek: date.getDay(),
      merchantRisk,
      locationRisk,
      userBehaviorDeviation,
      transactionFrequency,
      velocity
    };
  }
  
  /**
   * Calculate merchant risk based on historical data
   */
  private calculateMerchantRisk(merchant: string): number {
    // In a real implementation, this would use historical fraud rates
    // For this demo, we'll return simulated values based on merchant type
    const highRiskMerchants = ['casino', 'gambling', 'crypto exchange', 'jewelry'];
    const mediumRiskMerchants = ['online shopping', 'electronics', 'luxury goods'];
    
    const lowerMerchant = merchant.toLowerCase();
    
    if (highRiskMerchants.some(hr => lowerMerchant.includes(hr))) {
      return 0.8;
    } else if (mediumRiskMerchants.some(mr => lowerMerchant.includes(mr))) {
      return 0.5;
    } else {
      return 0.1; // Low risk for most merchants
    }
  }
  
  /**
   * Calculate location risk based on user's historical locations
   */
  private calculateLocationRisk(location: string): number {
    // In a real implementation, this would compare against user's historical locations
    // For this demo, we'll return simulated values based on location type
    const highRiskLocations = ['nigeria', 'somalia', 'north korea', 'iran'];
    const mediumRiskLocations = ['caribbean', 'panama', 'cayman islands'];
    
    const lowerLocation = location.toLowerCase();
    
    if (highRiskLocations.some(hr => lowerLocation.includes(hr))) {
      return 0.9;
    } else if (mediumRiskLocations.some(mr => lowerLocation.includes(mr))) {
      return 0.6;
    } else {
      return 0.2; // Lower risk for most locations
    }
  }
  
  /**
   * Calculate user behavior deviation
   */
  private calculateUserBehaviorDeviation(transaction: Transaction): number {
    // In a real implementation, this would compare against user's historical patterns
    // For this demo, we'll return a simulated value
    return Math.random(); // Random value between 0 and 1
  }
  
  /**
   * Calculate transaction frequency for user
   */
  private calculateTransactionFrequency(userId: string): number {
    // In a real implementation, this would count recent transactions
    // For this demo, we'll return a simulated value
    return Math.floor(Math.random() * 10); // 0 to 9 recent transactions
  }
  
  /**
   * Calculate transaction velocity
   */
  private calculateVelocity(userId: string, timestamp: Date): number {
    // In a real implementation, this would measure transaction speed
    // For this demo, we'll return a simulated value
    return Math.random(); // Random value between 0 and 1
  }
  
  /**
   * Evaluate model performance
   */
  public evaluateModel(testTransactions: Transaction[], actualLabels: boolean[]): { 
    accuracy: number; 
    precision: number; 
    recall: number; 
    f1Score: number 
  } {
    const predictions = testTransactions.map(tx => this.predict(tx));
    
    let truePositives = 0;
    let falsePositives = 0;
    let trueNegatives = 0;
    let falseNegatives = 0;
    
    for (let i = 0; i < predictions.length; i++) {
      const predicted = predictions[i].isFraud;
      const actual = actualLabels[i];
      
      if (predicted && actual) {
        truePositives++;
      } else if (predicted && !actual) {
        falsePositives++;
      } else if (!predicted && !actual) {
        trueNegatives++;
      } else {
        falseNegatives++;
      }
    }
    
    const accuracy = (truePositives + trueNegatives) / (truePositives + trueNegatives + falsePositives + falseNegatives);
    const precision = truePositives / (truePositives + falsePositives);
    const recall = truePositives / (truePositives + falseNegatives);
    const f1Score = 2 * (precision * recall) / (precision + recall);
    
    return {
      accuracy: parseFloat(accuracy.toFixed(3)),
      precision: isNaN(precision) ? 0 : parseFloat(precision.toFixed(3)),
      recall: isNaN(recall) ? 0 : parseFloat(recall.toFixed(3)),
      f1Score: isNaN(f1Score) ? 0 : parseFloat(f1Score.toFixed(3))
    };
  }
}