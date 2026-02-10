import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Box
} from '@mui/material';

import { styled } from '@mui/material/styles';
import { TransactionFeed } from '../TransactionFeed/TransactionFeed';
import { AlertPanel } from '../AlertPanel/AlertPanel';
import { Analytics } from '../Analytics/Analytics';
import Footer from '../Footer/Footer';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  overflow: 'auto',
  flexDirection: 'column',
  background: 'rgba(15, 23, 42, 0.6)', // Darker blue-grey
  backdropFilter: 'blur(20px)',
  borderRadius: '16px',
  border: '1px solid rgba(64, 224, 255, 0.1)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'rgba(30, 41, 59, 0.7)', // Solid dark card
  backdropFilter: 'blur(20px)',
  borderRadius: '16px',
  border: '1px solid rgba(64, 224, 255, 0.1)',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 40px rgba(64, 224, 255, 0.15)',
    border: '1px solid rgba(64, 224, 255, 0.3)',
  }
}));

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalTransactions: 0,
    flaggedTransactions: 0,
    confirmedFraud: 0,
    preventedLosses: 0,
  });

  useEffect(() => {
    // In a real app, fetch stats from the backend
    // For now, using mock data
    setStats({
      totalTransactions: 12500,
      flaggedTransactions: 32,
      confirmedFraud: 8,
      preventedLosses: 45600,
    });
  }, []);

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
                  Total Transactions
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
                  {stats.totalTransactions.toLocaleString()}
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
                  Flagged Transactions
                </Typography>
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                    color: '#FFD700',
                    fontWeight: 'bold'
                  }}
                >
                  {stats.flaggedTransactions}
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
                  Confirmed Fraud
                </Typography>
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                    color: '#FF6B6B',
                    fontWeight: 'bold'
                  }}
                >
                  {stats.confirmedFraud}
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
                  Prevented Losses
                </Typography>
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                    color: '#4ECDC4',
                    fontWeight: 'bold'
                  }}
                >
                  ${stats.preventedLosses.toLocaleString()}
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>

          {/* Transaction Feed */}
          <Grid item xs={12} md={8}>
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
                Recent Transactions
              </Typography>
              <TransactionFeed />
            </StyledPaper>
          </Grid>

          {/* Alerts Panel */}
          <Grid item xs={12} md={4}>
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
                Fraud Alerts
              </Typography>
              <AlertPanel />
            </StyledPaper>
          </Grid>

          {/* Analytics */}
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
                Analytics
              </Typography>
              <Analytics />
            </StyledPaper>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default Dashboard;