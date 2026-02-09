import React from 'react';
import { 
  Box, 
  Typography,
  Grid,
  Paper
} from '@mui/material';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Mock data for charts
const transactionData = [
  { name: 'Mon', transactions: 4000, fraud: 2400 },
  { name: 'Tue', transactions: 3000, fraud: 1398 },
  { name: 'Wed', transactions: 2000, fraud: 9800 },
  { name: 'Thu', transactions: 2780, fraud: 3908 },
  { name: 'Fri', transactions: 1890, fraud: 4800 },
  { name: 'Sat', transactions: 2390, fraud: 3800 },
  { name: 'Sun', transactions: 3490, fraud: 4300 },
];

const fraudByCategory = [
  { name: 'High Amount', value: 45 },
  { name: 'Unusual Location', value: 25 },
  { name: 'Rapid Transactions', value: 15 },
  { name: 'Other', value: 15 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const Analytics: React.FC = () => {
  return (
    <Box sx={{ width: '100%', height: 400 }}>
      <Typography variant="h6" gutterBottom>
        Transaction & Fraud Analytics
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Paper elevation={3} sx={{ p: 2, height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={transactionData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="transactions" fill="#8884d8" name="Total Transactions" />
                <Bar dataKey="fraud" fill="#82ca9d" name="Fraudulent Transactions" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={3} sx={{ p: 2, height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={fraudByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name || 'Unknown'} ${((percent ?? 0) * 100).toFixed(0)}%`}
                >
                  {fraudByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};