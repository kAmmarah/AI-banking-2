import { Transaction, TransactionAttributes, TransactionCreationAttributes } from '../models/TransactionModel';

export class TransactionService {
  static async getAllTransactions(): Promise<Transaction[]> {
    try {
      return await Transaction.findAll({
        order: [['createdAt', 'DESC']],
      });
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error;
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