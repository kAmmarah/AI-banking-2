import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AlertPanel } from '../AlertPanel/AlertPanel';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  borderRadius: '15px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
}));

const AlertsPage: React.FC = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
        py: 3,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: '#40e0ff',
            fontWeight: 'bold',
            mb: 3,
            borderBottom: '2px solid rgba(64, 224, 255, 0.3)',
            pb: 1,
          }}
        >
          Fraud Alerts
        </Typography>
        <StyledPaper>
          <AlertPanel />
        </StyledPaper>
      </Container>
    </Box>
  );
};

export default AlertsPage;

