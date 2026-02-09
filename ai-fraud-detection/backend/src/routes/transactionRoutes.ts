import { Router } from 'express';
import { TransactionController } from '../controllers/TransactionController';

const router = Router();

// Get all transactions
router.get('/', TransactionController.getAllTransactions);

// Get a specific transaction
router.get('/:id', TransactionController.getTransactionById);

// Create a new transaction
router.post('/', TransactionController.createTransaction);

// Update a transaction
router.put('/:id', TransactionController.updateTransaction);

// Delete a transaction
router.delete('/:id', TransactionController.deleteTransaction);

export const transactionRoutes = router;