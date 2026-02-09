import { Request, Response } from 'express';
import { TransactionService } from '../services/TransactionService';

export class TransactionController {
  static async getAllTransactions(req: Request, res: Response) {
    try {
      const transactions = await TransactionService.getAllTransactions();
      res.status(200).json(transactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      res.status(500).json({ error: 'Failed to fetch transactions' });
    }
  }

  static async getTransactionById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      // Ensure id is a string, not an array
      const transactionId = Array.isArray(id) ? id[0] : id;
      const transaction = await TransactionService.getTransactionById(transactionId);
      
      if (!transaction) {
        return res.status(404).json({ error: 'Transaction not found' });
      }
      
      res.status(200).json(transaction);
    } catch (error) {
      console.error('Error fetching transaction:', error);
      res.status(500).json({ error: 'Failed to fetch transaction' });
    }
  }

  static async createTransaction(req: Request, res: Response) {
    try {
      const transactionData = req.body;
      const newTransaction = await TransactionService.createTransaction(transactionData);
      res.status(201).json(newTransaction);
    } catch (error) {
      console.error('Error creating transaction:', error);
      res.status(500).json({ error: 'Failed to create transaction' });
    }
  }

  static async updateTransaction(req: Request, res: Response) {
    try {
      const { id } = req.params;
      // Ensure id is a string, not an array
      const transactionId = Array.isArray(id) ? id[0] : id;
      const transactionData = req.body;
      const updatedTransaction = await TransactionService.updateTransaction(transactionId, transactionData);
      
      if (!updatedTransaction) {
        return res.status(404).json({ error: 'Transaction not found' });
      }
      
      res.status(200).json(updatedTransaction);
    } catch (error) {
      console.error('Error updating transaction:', error);
      res.status(500).json({ error: 'Failed to update transaction' });
    }
  }

  static async deleteTransaction(req: Request, res: Response) {
    try {
      const { id } = req.params;
      // Ensure id is a string, not an array
      const transactionId = Array.isArray(id) ? id[0] : id;
      const deleted = await TransactionService.deleteTransaction(transactionId);
      
      if (!deleted) {
        return res.status(404).json({ error: 'Transaction not found' });
      }
      
      res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
      console.error('Error deleting transaction:', error);
      res.status(500).json({ error: 'Failed to delete transaction' });
    }
  }
}