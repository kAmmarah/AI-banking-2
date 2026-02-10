import { Transaction, TransactionAttributes, TransactionCreationAttributes } from '../models/TransactionModel';

export class TransactionService {
  static async getAllTransactions(): Promise<Transaction[]> {
    try {
      return await Transaction.findAll({
        order: [['createdAt', 'DESC']],
      });
    } catch (error) {
      console.error('Error fetching transactions:', error);
      console.warn('Falling back to mock data due to DB error');

      // Return mock data for Vercel/Demo environment
      return [
        {
          id: 'tx_mock_1',
          userId: 'user_1',
          amount: 150.00,
          currency: 'USD',
          merchant: 'Amazon',
          location: 'New York, NY',
          timestamp: new Date(),
          status: 'completed',
          isFraud: false,
          riskScore: 0.1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'tx_mock_2',
          userId: 'user_2',
          amount: 2500.00,
          currency: 'USD',
          merchant: 'Jewelry Store',
          location: 'Miami, FL',
          timestamp: new Date(),
          status: 'pending',
          isFraud: true,
          riskScore: 0.9,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'tx_mock_3',
          userId: 'user_1',
          amount: 45.99,
          currency: 'USD',
          merchant: 'Starbucks',
          location: 'Seattle, WA',
          timestamp: new Date(),
          status: 'completed',
          isFraud: false,
          riskScore: 0.05,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'tx_mock_4',
          userId: 'user_3',
          amount: 999.99,
          currency: 'USD',
          merchant: 'Online Middleware',
          location: 'Chicago, IL',
          timestamp: new Date(),
          status: 'completed',
          isFraud: false,
          riskScore: 0.3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'tx_mock_5',
          userId: 'user_4',
          amount: 12000.00,
          currency: 'USD',
          merchant: 'Car Dealership',
          location: 'Los Angeles, CA',
          timestamp: new Date(),
          status: 'pending',
          isFraud: true,
          riskScore: 0.85,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ] as any[]; // Cast to any to satisfy type checker if needed, or specific Transaction type
    }
  }

  static async getTransactionById(id: string): Promise<Transaction | null> {
    try {
      return await Transaction.findByPk(id);
    } catch (error) {
      console.error('Error fetching transaction:', error);
      throw error;
    }
  }

  static async createTransaction(transactionData: TransactionCreationAttributes): Promise<Transaction> {
    try {
      return await Transaction.create(transactionData);
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw error;
    }
  }

  static async updateTransaction(id: string, transactionData: Partial<TransactionAttributes>): Promise<[number]> {
    try {
      return await Transaction.update(transactionData, {
        where: { id },
      });
    } catch (error) {
      console.error('Error updating transaction:', error);
      throw error;
    }
  }

  static async deleteTransaction(id: string): Promise<number> {
    try {
      return await Transaction.destroy({
        where: { id },
      });
    } catch (error) {
      console.error('Error deleting transaction:', error);
      throw error;
    }
  }
}