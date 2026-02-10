import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  Card, 
  CardContent,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
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

const StyledCard = styled(Card)(({ theme }) => ({
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
}));

const CustomerAnalysis: React.FC = () => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Load customer data from CSV
    const loadCustomerData = async () => {
      try {
        const response = await fetch('/customers.csv');
        const text = await response.text();
        const parsedData = parseCSV(text);
        setCustomers(parsedData);
        setFilteredCustomers(parsedData);
      } catch (error) {
        console.error('Error loading customer data:', error);
      }
    };

    loadCustomerData();
  }, []);

  useEffect(() => {
    // Filter customers based on search term
    if (!searchTerm) {
      setFilteredCustomers(customers);
    } else {
      const filtered = customers.filter(customer => 
        customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.account_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.risk_profile?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCustomers(filtered);
    }
  }, [searchTerm, customers]);

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



  return (
    <Box sx={{ 
      flexGrow: 1, 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
      padding: '20px 0'
    }}>
      
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {/* Stats Cards */}
          <Grid item xs={12} sm={6} md={3}>
            <StyledCard>
              <CardContent>
                <Typography 
                  color="textSecondary" 
                  gutterBottom
                  sx={{ 
                    color: '#b0b0b0',
                    fontWeight: 500
                  }}
                >
                  Total Customers
                </Typography>
                <Typography 
                  variant="h5" 
                  component="h2"
                  sx={{ 
                    color: '#40e0ff',
                    fontWeight: 'bold',
                    background: 'linear-gradient(135deg, #40e0ff 0%, #ffffff 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  {customers.length}
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <StyledCard>
              <CardContent>
                <Typography 
                  color="textSecondary" 
                  gutterBottom
                  sx={{ 
                    color: '#b0b0b0',
                    fontWeight: 500
                  }}
                >
                  High Risk
                </Typography>
                <Typography 
                  variant="h5" 
                  component="h2" 
                  sx={{ 
                    color: '#FF6B6B',
                    fontWeight: 'bold'
                  }}
                >
                  {customers.filter(c => c.risk_profile === 'High').length}
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <StyledCard>
              <CardContent>
                <Typography 
                  color="textSecondary" 
                  gutterBottom
                  sx={{ 
                    color: '#b0b0b0',
                    fontWeight: 500
                  }}
                >
                  Medium Risk
                </Typography>
                <Typography 
                  variant="h5" 
                  component="h2" 
                  sx={{ 
                    color: '#FFD700',
                    fontWeight: 'bold'
                  }}
                >
                  {customers.filter(c => c.risk_profile === 'Medium').length}
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <StyledCard>
              <CardContent>
                <Typography 
                  color="textSecondary" 
                  gutterBottom
                  sx={{ 
                    color: '#b0b0b0',
                    fontWeight: 500
                  }}
                >
                  Low Risk
                </Typography>
                <Typography 
                  variant="h5" 
                  component="h2" 
                  sx={{ 
                    color: '#4ECDC4',
                    fontWeight: 'bold'
                  }}
                >
                  {customers.filter(c => c.risk_profile === 'Low').length}
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>

          {/* Search and Table */}
          <Grid item xs={12}>
            <StyledPaper>
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
                Customer Database
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search customers by name, city, account type, or risk profile..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ 
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(64, 224, 255, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(64, 224, 255, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#40e0ff',
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
                      <TableCell sx={{ color: '#40e0ff', fontWeight: 'bold' }}><strong>ID</strong></TableCell>
                      <TableCell sx={{ color: '#40e0ff', fontWeight: 'bold' }}><strong>Name</strong></TableCell>
                      <TableCell sx={{ color: '#40e0ff', fontWeight: 'bold' }}><strong>Age</strong></TableCell>
                      <TableCell sx={{ color: '#40e0ff', fontWeight: 'bold' }}><strong>Account Type</strong></TableCell>
                      <TableCell sx={{ color: '#40e0ff', fontWeight: 'bold' }}><strong>City</strong></TableCell>
                      <TableCell sx={{ color: '#40e0ff', fontWeight: 'bold' }}><strong>Risk Profile</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredCustomers.map((customer) => (
                      <TableRow 
                        key={customer.customer_id} 
                        hover
                        sx={{ 
                          '&:hover': { 
                            backgroundColor: 'rgba(64, 224, 255, 0.1)' 
                          },
                          '&:nth-of-type(odd)': {
                            backgroundColor: 'rgba(255, 255, 255, 0.02)',
                          }
                        }}
                      >
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

export default CustomerAnalysis;