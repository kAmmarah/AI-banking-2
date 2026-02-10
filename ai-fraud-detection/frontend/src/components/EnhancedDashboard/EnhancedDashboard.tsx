import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  Card, 
  CardContent,
  AppBar,
  Toolbar,
  Box,
  TextField,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import Footer from '../Footer/Footer';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  overflow: 'auto',
  flexDirection: 'column',
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  borderRadius: '15px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
}));

const EnhancedDashboard: React.FC = () => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [fraudCases, setFraudCases] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('customers');

  // Colors for charts
  const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];

  useEffect(() => {
    // Load data from CSV files
    const loadData = async () => {
      try {
        // Load customers data
        const customersResponse = await fetch('/customers.csv');
        const customersText = await customersResponse.text();
        const customersParsed = parseCSV(customersText);
        setCustomers(customersParsed);

        // Load transactions data
        const transactionsResponse = await fetch('/transactions_sales.csv');
        const transactionsText = await transactionsResponse.text();
        const transactionsParsed = parseCSV(transactionsText);
        setTransactions(transactionsParsed);

        // Load fraud cases data
        const fraudResponse = await fetch('/fraud_cases.csv');
        const fraudText = await fraudResponse.text();
        const fraudParsed = parseCSV(fraudText);
        setFraudCases(fraudParsed);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  // Parse CSV data
  const parseCSV = (csvText: string) => {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    const data: any[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      if (values.length === headers.length) {
        const obj: any = {};
        headers.forEach((header, index) => {
          // Ensure we don't set undefined values
          obj[header] = values[index] || '';
        });
        data.push(obj);
      }
    }
    
    return data;
  };

  // Format currency
  const formatCurrency = (amount: string) => {
    return 'PKR ' + parseInt(amount).toLocaleString();
  };

  // Get risk profile data for pie chart
  const getRiskProfileData = () => {
    const highRisk = customers.filter(c => c.risk_profile === 'High').length;
    const mediumRisk = customers.filter(c => c.risk_profile === 'Medium').length;
    const lowRisk = customers.filter(c => c.risk_profile === 'Low').length;
    
    return [
      { name: 'High Risk', value: highRisk, color: '#FF6B6B' },
      { name: 'Medium Risk', value: mediumRisk, color: '#FFEAA7' },
      { name: 'Low Risk', value: lowRisk, color: '#4ECDC4' }
    ];
  };

  // Get transaction type data for pie chart
  const getTransactionTypeData = () => {
    const typeCounts: { [key: string]: number } = {};
    
    transactions.forEach(transaction => {
      const type = transaction.transaction_type;
      if (type) {
        typeCounts[type] = (typeCounts[type] || 0) + 1;
      }
    });
    
    return Object.entries(typeCounts).map(([name, value], index) => ({
      name,
      value,
      color: COLORS[index % COLORS.length]
    }));
  };



  // Filter data based on search term
  const getFilteredCustomers = () => {
    if (!searchTerm) return customers;
    return customers.filter(customer => 
      customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.account_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.risk_profile?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getFilteredTransactions = () => {
    if (!searchTerm) return transactions;
    return transactions.filter(transaction => 
      transaction.transaction_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.customer_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.transaction_type?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getFilteredFraudCases = () => {
    if (!searchTerm) return fraudCases;
    return fraudCases.filter(fraud => 
      fraud.transaction_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fraud.customer_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fraud.transaction_type?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const renderActiveShape = (props: any) => {
    const { cx, cy, fill, payload, percent } = props;
    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} fontSize={16} fontWeight="bold">
          {`${(percent * 100).toFixed(0)}%`}
        </text>
        <text x={cx} y={cy} dy={24} textAnchor="middle" fill="#888" fontSize={12}>
          {payload.name}
        </text>
        <path
          d={`M${cx},${cy} L${cx + 10},${cy - 10} L${cx + 20},${cy - 5} Z`}
          fill={fill}
        />
      </g>
    );
  };

  return (
    <Box sx={{ 
      flexGrow: 1, 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
      padding: '20px 0'
    }}>
      <AppBar position="static" sx={{ 
        mb: 4,
        background: 'linear-gradient(135deg, rgba(15, 32, 39, 0.95) 0%, rgba(32, 58, 67, 0.95) 100%)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(64, 224, 255, 0.2)'
      }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ 
            flexGrow: 1, 
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #40e0ff 0%, #ffffff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Enhanced AI Banking Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          {/* Stats Cards */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 12px 40px rgba(64, 224, 255, 0.2)',
                border: '1px solid rgba(64, 224, 255, 0.4)',
              }
            }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Total Customers
                </Typography>
                <Typography variant="h3" component="div" fontWeight="bold">
                  {customers.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 12px 40px rgba(64, 224, 255, 0.2)',
                border: '1px solid rgba(64, 224, 255, 0.4)',
              }
            }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Total Transactions
                </Typography>
                <Typography variant="h3" component="div" fontWeight="bold">
                  {transactions.length.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 12px 40px rgba(64, 224, 255, 0.2)',
                border: '1px solid rgba(64, 224, 255, 0.4)',
              }
            }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Fraud Cases
                </Typography>
                <Typography variant="h3" component="div" fontWeight="bold">
                  {fraudCases.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 12px 40px rgba(64, 224, 255, 0.2)',
                border: '1px solid rgba(64, 224, 255, 0.4)',
              }
            }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Total Fraud Amount
                </Typography>
                <Typography variant="h3" component="div" fontWeight="bold" fontSize="1.8rem">
                  {formatCurrency(fraudCases.reduce((sum, fraud) => sum + parseInt(fraud.amount || 0), 0))}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Navigation Tabs */}
          <Grid item xs={12}>
            <Box sx={{ 
              display: 'flex', 
              gap: 2, 
              mb: 3,
              flexWrap: 'wrap'
            }}>
              {['customers', 'transactions', 'fraud'].map((tab) => (
                <Card 
                  key={tab}
                  sx={{ 
                    cursor: 'pointer',
                    flex: 1,
                    minWidth: '200px',
                    background: activeTab === tab 
                      ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)' 
                      : 'rgba(255, 255, 255, 0.1)',
                    color: activeTab === tab ? '#40e0ff' : '#e0e0e0',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)'
                    }
                  }}
                  onClick={() => setActiveTab(tab)}
                >
                  <CardContent>
                    <Typography 
                      variant="h6" 
                      align="center" 
                      fontWeight={activeTab === tab ? 'bold' : 'normal'}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Grid>

          {/* Charts Section */}
          <Grid item xs={12} md={6}>
            <StyledPaper>
              <Typography variant="h6" gutterBottom align="center" fontWeight="bold">
                Customer Risk Profile Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={getRiskProfileData()}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    activeShape={renderActiveShape}
                  >
                    {getRiskProfileData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [value, 'Customers']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </StyledPaper>
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledPaper>
              <Typography variant="h6" gutterBottom align="center" fontWeight="bold">
                Transaction Type Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={getTransactionTypeData()}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    activeShape={renderActiveShape}
                  >
                    {getTransactionTypeData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [value, 'Transactions']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </StyledPaper>
          </Grid>

          {/* Data Tables */}
          <Grid item xs={12}>
            <StyledPaper>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Database
              </Typography>
              
              <TextField
                fullWidth
                variant="outlined"
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ 
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#4ECDC4',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: '#e0e0e0',
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: '#b0b0b0',
                  }
                }}
              />
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      {activeTab === 'customers' && (
                        <>
                          <TableCell sx={{ color: '#40e0ff', fontWeight: 'bold' }}>ID</TableCell>
                          <TableCell sx={{ color: '#40e0ff', fontWeight: 'bold' }}>Name</TableCell>
                          <TableCell sx={{ color: '#40e0ff', fontWeight: 'bold' }}>Age</TableCell>
                          <TableCell sx={{ color: '#40e0ff', fontWeight: 'bold' }}>Account Type</TableCell>
                          <TableCell sx={{ color: '#40e0ff', fontWeight: 'bold' }}>City</TableCell>
                          <TableCell sx={{ color: '#40e0ff', fontWeight: 'bold' }}>Risk Profile</TableCell>
                        </>
                      )}
                      {activeTab === 'transactions' && (
                        <>
                          <TableCell sx={{ color: '#4ECDC4', fontWeight: 'bold' }}>Transaction ID</TableCell>
                          <TableCell sx={{ color: '#4ECDC4', fontWeight: 'bold' }}>Customer ID</TableCell>
                          <TableCell sx={{ color: '#4ECDC4', fontWeight: 'bold' }}>Amount</TableCell>
                          <TableCell sx={{ color: '#4ECDC4', fontWeight: 'bold' }}>Type</TableCell>
                          <TableCell sx={{ color: '#40e0ff', fontWeight: 'bold' }}>Status</TableCell>
                        </>
                      )}
                      {activeTab === 'fraud' && (
                        <>
                          <TableCell sx={{ color: '#4ECDC4', fontWeight: 'bold' }}>Transaction ID</TableCell>
                          <TableCell sx={{ color: '#4ECDC4', fontWeight: 'bold' }}>Customer ID</TableCell>
                          <TableCell sx={{ color: '#4ECDC4', fontWeight: 'bold' }}>Amount</TableCell>
                          <TableCell sx={{ color: '#4ECDC4', fontWeight: 'bold' }}>Type</TableCell>
                        </>
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {activeTab === 'customers' && getFilteredCustomers().map((customer) => (
                      <TableRow key={customer.customer_id} hover sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>
                        <TableCell sx={{ color: '#e0e0e0' }}>{customer.customer_id}</TableCell>
                        <TableCell sx={{ color: '#e0e0e0' }}>{customer.name}</TableCell>
                        <TableCell sx={{ color: '#e0e0e0' }}>{customer.age}</TableCell>
                        <TableCell sx={{ color: '#e0e0e0' }}>{customer.account_type}</TableCell>
                        <TableCell sx={{ color: '#e0e0e0' }}>{customer.city}</TableCell>
                        <TableCell>
                          <Chip 
                            label={customer.risk_profile} 
                            sx={{ 
                              backgroundColor: 
                                customer.risk_profile === 'High' ? '#FF6B6B' :
                                customer.risk_profile === 'Medium' ? '#FFD700' : '#4ECDC4',
                              color: customer.risk_profile === 'Medium' ? '#333' : 'white',
                              fontWeight: 'bold'
                            }}
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                    {activeTab === 'transactions' && getFilteredTransactions().map((transaction) => (
                      <TableRow key={transaction.transaction_id} hover sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>
                        <TableCell sx={{ color: '#e0e0e0' }}>{transaction.transaction_id}</TableCell>
                        <TableCell sx={{ color: '#e0e0e0' }}>{transaction.customer_id}</TableCell>
                        <TableCell sx={{ color: '#e0e0e0' }}>{formatCurrency(transaction.amount)}</TableCell>
                        <TableCell sx={{ color: '#e0e0e0' }}>{transaction.transaction_type}</TableCell>
                        <TableCell>
                          <Chip 
                            label={transaction.is_fraud === '1' ? 'Fraud' : 'Safe'}
                            sx={{ 
                              backgroundColor: transaction.is_fraud === '1' ? '#FF6B6B' : '#4ECDC4',
                              color: 'white',
                              fontWeight: 'bold'
                            }}
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                    {activeTab === 'fraud' && getFilteredFraudCases().map((fraud) => (
                      <TableRow key={fraud.transaction_id} hover sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>
                        <TableCell sx={{ color: '#e0e0e0' }}>{fraud.transaction_id}</TableCell>
                        <TableCell sx={{ color: '#e0e0e0' }}>{fraud.customer_id}</TableCell>
                        <TableCell sx={{ color: '#e0e0e0' }}>{formatCurrency(fraud.amount)}</TableCell>
                        <TableCell sx={{ color: '#e0e0e0' }}>{fraud.transaction_type}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </StyledPaper>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default EnhancedDashboard;