import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  Card, 
  CardContent, 
  CardHeader 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { TransactionFeed } from '../TransactionFeed/TransactionFeed';
import { AlertPanel } from '../AlertPanel/AlertPanel';
import { Analytics } from '../Analytics/Analytics';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  overflow: 'auto',
  flexDirection: 'column',
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
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Transactions
              </Typography>
              <Typography variant="h5" component="h2">
                {stats.totalTransactions.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Flagged Transactions
              </Typography>
              <Typography variant="h5" component="h2" color="warning.main">
                {stats.flaggedTransactions}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Confirmed Fraud
              </Typography>
              <Typography variant="h5" component="h2" color="error.main">
                {stats.confirmedFraud}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Prevented Losses
              </Typography>
              <Typography variant="h5" component="h2" color="success.main">
                ${stats.preventedLosses.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Transaction Feed */}
        <Grid item xs={12} md={8}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>
              Recent Transactions
            </Typography>
            <TransactionFeed />
          </StyledPaper>
        </Grid>

        {/* Alerts Panel */}
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>
              Fraud Alerts
            </Typography>
            <AlertPanel />
          </StyledPaper>
        </Grid>

        {/* Analytics */}
        <Grid item xs={12}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>
              Analytics
            </Typography>
            <Analytics />
          </StyledPaper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;