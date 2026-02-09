import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Chip,
  Box,
  Typography
} from '@mui/material';

interface Transaction {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  merchant: string;
  location: string;
  timestamp: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  isFraud: boolean;
  riskScore: number;
}

export const TransactionFeed: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  useEffect(() => {
    // In a real app, fetch from the backend
    // For now, using mock data
    setTransactions([
      {
        id: '1',
        userId: 'user123',
        amount: 150.00,
        currency: 'USD',
        merchant: 'Amazon',
        location: 'New York, NY',
        timestamp: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago
        status: 'completed',
        isFraud: false,
        riskScore: 0.1
      },
      {
        id: '2',
        userId: 'user456',
        amount: 2500.00,
        currency: 'USD',
        merchant: 'Jewelry Store',
        location: 'Miami, FL',
        timestamp: new Date(Date.now() - 600000).toISOString(), // 10 minutes ago
        status: 'pending',
        isFraud: true,
        riskScore: 0.9
      },
      {
        id: '3',
        userId: 'user789',
        amount: 45.99,
        currency: 'USD',
        merchant: 'Starbucks',
        location: 'Seattle, WA',
        timestamp: new Date(Date.now() - 1200000).toISOString(), // 20 minutes ago
        status: 'completed',
        isFraud: false,
        riskScore: 0.05
      },
      {
        id: '4',
        userId: 'user101',
        amount: 999.99,
        currency: 'USD',
        merchant: 'Online Marketplace',
        location: 'Chicago, IL',
        timestamp: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
        status: 'completed',
        isFraud: false,
        riskScore: 0.3
      },
      {
        id: '5',
        userId: 'user202',
        amount: 12000.00,
        currency: 'USD',
        merchant: 'Car Dealership',
        location: 'Los Angeles, CA',
        timestamp: new Date(Date.now() - 2400000).toISOString(), // 40 minutes ago
        status: 'pending',
        isFraud: true,
        riskScore: 0.85
      }
    ]);
  }, []);
  
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Live Transaction Feed
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Merchant</TableCell>
              <TableCell>Location</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Risk Score</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.id}</TableCell>
                <TableCell>{transaction.merchant}</TableCell>
                <TableCell>{transaction.location}</TableCell>
                <TableCell align="right">${transaction.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <Chip 
                    label={transaction.status} 
                    size="small"
                    color={
                      transaction.status === 'completed' ? 'success' :
                      transaction.status === 'pending' ? 'warning' :
                      'error'
                    }
                  />
                </TableCell>
                <TableCell>
                  <Chip 
                    label={`${(transaction.riskScore * 100).toFixed(0)}%`} 
                    size="small"
                    color={
                      transaction.riskScore > 0.7 ? 'error' :
                      transaction.riskScore > 0.3 ? 'warning' :
                      'success'
                    }
                  />
                </TableCell>
                <TableCell>
                  {transaction.isFraud && (
                    <Chip 
                      label="FRAUD" 
                      size="small" 
                      color="error" 
                      variant="outlined" 
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};