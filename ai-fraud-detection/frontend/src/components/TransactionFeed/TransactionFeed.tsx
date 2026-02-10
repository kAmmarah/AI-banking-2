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
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  background: 'transparent', // Using transparent here as it's inside the Dashboard's StyledPaper
  boxShadow: 'none',
  borderRadius: '0',
}));

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

      <TableContainer component={StyledPaper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#40e0ff', fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ color: '#40e0ff', fontWeight: 'bold' }}>Merchant</TableCell>
              <TableCell sx={{ color: '#40e0ff', fontWeight: 'bold' }}>Location</TableCell>
              <TableCell sx={{ color: '#40e0ff', fontWeight: 'bold' }} align="right">Amount</TableCell>
              <TableCell sx={{ color: '#40e0ff', fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ color: '#40e0ff', fontWeight: 'bold' }}>Risk Score</TableCell>
              <TableCell sx={{ color: '#40e0ff', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow
                key={transaction.id}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(64, 224, 255, 0.05)'
                  },
                  '&:nth-of-type(odd)': {
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  },
                  borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
                }}
              >
                <TableCell sx={{ color: '#e0e0e0' }}>{transaction.id}</TableCell>
                <TableCell sx={{ color: '#e0e0e0' }}>{transaction.merchant}</TableCell>
                <TableCell sx={{ color: '#e0e0e0' }}>{transaction.location}</TableCell>
                <TableCell sx={{ color: '#e0e0e0' }} align="right">${transaction.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <Chip
                    label={transaction.status}
                    size="small"
                    sx={{
                      backgroundColor:
                        transaction.status === 'completed' ? '#4ECDC4' :
                          transaction.status === 'pending' ? '#FFD700' : '#FF6B6B',
                      color: 'white',
                      fontWeight: 'bold'
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={`${(transaction.riskScore * 100).toFixed(0)}%`}
                    size="small"
                    sx={{
                      backgroundColor:
                        transaction.riskScore > 0.7 ? '#FF6B6B' :
                          transaction.riskScore > 0.3 ? '#FFD700' : '#4ECDC4',
                      color: transaction.riskScore > 0.3 && transaction.riskScore <= 0.7 ? '#333' : 'white',
                      fontWeight: 'bold'
                    }}
                  />
                </TableCell>
                <TableCell>
                  {transaction.isFraud && (
                    <Chip
                      label="FRAUD"
                      size="small"
                      sx={{
                        backgroundColor: '#FF6B6B',
                        color: 'white',
                        fontWeight: 'bold',
                        border: '1px solid #FF6B6B'
                      }}
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