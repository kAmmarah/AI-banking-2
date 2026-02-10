import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  CircularProgress
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
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  borderRadius: '15px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
}));

interface TransactionData {
  name: string;
  safe: number;
  partialCritical: number;
  fraudulent: number;
}

interface AnalysisData {
  name: string;
  value: number;
}



interface TransactionRecord {
  transaction_id: string;
  customer_id: string;
  amount: string;
  transaction_type: string;
  is_fraud: string;
}

interface FraudCase {
  transaction_id: string;
  customer_id: string;
  amount: string;
  transaction_type: string;
  is_fraud: string;
}

// Color scheme: Red for fraudulent, Orange for partial critical, Green for safe
const COLORS = ['#FF6B6B', '#FFD700', '#4ECDC4'];

export const Analytics: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [transactionData, setTransactionData] = useState<TransactionData[]>([]);
  const [transactionAnalysis, setTransactionAnalysis] = useState<AnalysisData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('Loading CSV data...');
        // Load CSV data
        const [customersResponse, transactionsResponse, fraudResponse] = await Promise.all([
          fetch('/customers.csv'),
          fetch('/transactions_sales.csv'),
          fetch('/fraud_cases.csv')
        ]);

        console.log('Responses received:', {
          customers: customersResponse.status,
          transactions: transactionsResponse.status,
          fraud: fraudResponse.status
        });

        if (!customersResponse.ok || !transactionsResponse.ok || !fraudResponse.ok) {
          throw new Error(`HTTP error! status: ${customersResponse.status}, ${transactionsResponse.status}, ${fraudResponse.status}`);
        }

        const customersText = await customersResponse.text();
        const transactionsText = await transactionsResponse.text();
        const fraudText = await fraudResponse.text();

        console.log('Data loaded - lengths:', {
          customers: customersText.length,
          transactions: transactionsText.length,
          fraud: fraudText.length
        });

        // Parse CSV data
        const parseCSV = (csvText: string) => {
          const lines = csvText.trim().split('\n');
          const headers = lines[0].split(',');
          return lines.slice(1).map(line => {
            const values = line.split(',');
            const obj: any = {};
            headers.forEach((header, index) => {
              obj[header.trim()] = values[index]?.trim() || '';
            });
            return obj;
          });
        };

        const customersData = parseCSV(customersText);
        const transactionsData = parseCSV(transactionsText);
        const fraudData = parseCSV(fraudText);

        console.log('Parsed data:', {
          customers: customersData.length,
          transactions: transactionsData.length,
          fraud: fraudData.length,
          sampleTransaction: transactionsData[0],
          sampleFraud: fraudData[0]
        });

        // Process data for charts
        const processTransactionData = (transactions: TransactionRecord[], fraudCases: FraudCase[]) => {
          // Group by transaction type for bar chart
          const typeCounts: Record<string, { safe: number; fraudulent: number }> = {};

          transactions.forEach(transaction => {
            const type = transaction.transaction_type;
            if (!typeCounts[type]) {
              typeCounts[type] = { safe: 0, fraudulent: 0 };
            }
            if (transaction.is_fraud === '1') {
              typeCounts[type].fraudulent++;
            } else {
              typeCounts[type].safe++;
            }
          });

          const chartData = Object.entries(typeCounts).map(([type, counts]) => ({
            name: type,
            safe: counts.safe,
            partialCritical: Math.floor(counts.safe * 0.1), // 10% of safe as partial critical
            fraudulent: counts.fraudulent
          }));

          console.log('Chart data generated:', chartData);
          setTransactionData(chartData);
        };

        const processAnalysisData = (transactions: TransactionRecord[], fraudCases: FraudCase[]) => {
          const totalTransactions = transactions.length;
          const fraudulentCount = fraudCases.length;
          const safeCount = totalTransactions - fraudulentCount;

          const analysisData = [
            { name: 'Safe', value: Math.round((safeCount / totalTransactions) * 100) },
            { name: 'Partial Critical', value: 10 }, // Fixed percentage
            { name: 'Fraudulent', value: Math.round((fraudulentCount / totalTransactions) * 100) }
          ];

          console.log('Analysis data generated:', analysisData);
          setTransactionAnalysis(analysisData);
        };

        processTransactionData(transactionsData, fraudData);
        processAnalysisData(transactionsData, fraudData);

        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setError(error instanceof Error ? error.message : 'Unknown error');
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
        <CircularProgress sx={{ color: '#40e0ff' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center', color: '#ff6b6b' }}>
        <Typography variant="h6" gutterBottom>
          Error Loading Data
        </Typography>
        <Typography variant="body1">
          {error}
        </Typography>
      </Box>
    );
  }

  console.log('Rendering Analytics component', { transactionData, transactionAnalysis });
  return (
    <Box sx={{ width: '100%', height: 400 }}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          color: '#40e0ff',
          fontWeight: 'bold',
          mb: 2,
          borderBottom: '2px solid rgba(64, 224, 255, 0.3)',
          pb: 1
        }}
      >
        Transaction Analysis ({transactionData.reduce((sum, item) => sum + item.safe + item.fraudulent, 0)} Transactions)
      </Typography>
      {/* Debug info */}
      <Box sx={{ mb: 2, p: 1, bgcolor: 'rgba(64, 224, 255, 0.1)', borderRadius: 1 }}>
        <Typography variant="body2" sx={{ color: '#b0b0b0' }}>
          Debug: Loaded {transactionData.length} transaction types, {transactionAnalysis.reduce((sum, item) => sum + item.value, 0)}% total
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <StyledPaper sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={transactionData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.2)" />
                <XAxis
                  dataKey="name"
                  stroke="#b0b0b0"
                  tick={{ fill: '#e0e0e0' }}
                />
                <YAxis
                  stroke="#b0b0b0"
                  tick={{ fill: '#e0e0e0' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 32, 39, 0.9)',
                    border: '1px solid rgba(64, 224, 255, 0.3)',
                    borderRadius: '8px',
                    color: '#e0e0e0'
                  }}
                />
                <Legend
                  wrapperStyle={{ color: '#e0e0e0' }}
                />
                <Bar dataKey="safe" fill="#4ECDC4" name="Safe Transactions" />
                <Bar dataKey="partialCritical" fill="#FFD700" name="Partial Critical" />
                <Bar dataKey="fraudulent" fill="#FF6B6B" name="Fraudulent" />
              </BarChart>
            </ResponsiveContainer>
          </StyledPaper>
        </Grid>
        <Grid item xs={4}>
          <StyledPaper sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={transactionAnalysis}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                    const safeMidAngle = midAngle ?? 0;
                    const safePercent = percent ?? 0;
                    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                    const x = cx + radius * Math.cos(-safeMidAngle * Math.PI / 180);
                    const y = cy + radius * Math.sin(-safeMidAngle * Math.PI / 180);

                    return (
                      <text
                        x={x}
                        y={y}
                        fill="white"
                        textAnchor={x > cx ? 'start' : 'end'}
                        dominantBaseline="central"
                        fontSize="12"
                        fontWeight="bold"
                      >
                        {`${(safePercent * 100).toFixed(0)}%`}
                      </text>
                    );
                  }}
                >
                  {transactionAnalysis.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 32, 39, 0.9)',
                    border: '1px solid rgba(64, 224, 255, 0.3)',
                    borderRadius: '8px',
                    color: '#e0e0e0'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </StyledPaper>
        </Grid>
      </Grid>
    </Box>
  );
};