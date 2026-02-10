import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Dashboard from './components/Dashboard/Dashboard';
import CustomerAnalysis from './components/CustomerAnalysis/CustomerAnalysis';
import Navigation from './components/Navigation/Navigation';
import EnhancedDashboard from './components/EnhancedDashboard/EnhancedDashboard';
import PieChartPage from './components/PieChartPage/PieChartPage';
import TransactionsPage from './components/TransactionsPage/TransactionsPage';
import AlertsPage from './components/AlertsPage/AlertsPage';
import AnalyticsPage from './components/AnalyticsPage/AnalyticsPage';
import ChatbotWidget from './components/ChatbotWidget/ChatbotWidget';

// Create consistent theme matching our CSS variables
const theme = createTheme({
  palette: {
    primary: {
      main: '#40e0ff',
      light: '#70e6ff',
      dark: '#1e90ff',
    },
    secondary: {
      main: '#2c5364',
    },
    background: {
      default: '#0f2027',
      paper: 'rgba(15, 32, 39, 0.9)',
    },
    text: {
      primary: '#e0e0e0',
      secondary: '#b0b0b0',
    },
    divider: 'rgba(64, 224, 255, 0.4)',
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    h1: {
      background: 'linear-gradient(135deg, #40e0ff 0%, #ffffff 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      fontWeight: 'bold',
    },
    h2: {
      background: 'linear-gradient(135deg, #70e6ff 0%, #a0f0ff 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      fontWeight: 'bold',
    },
    h3: {
      color: '#e0e0e0',
      fontWeight: '600',
    },
    h4: {
      color: '#e0e0e0',
      fontWeight: '500',
    },
    h5: {
      color: '#e0e0e0',
      fontWeight: '500',
    },
    h6: {
      color: '#e0e0e0',
      fontWeight: '500',
    },
    body1: {
      color: '#e0e0e0',
    },
    body2: {
      color: '#b0b0b0',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, rgba(15, 32, 39, 0.95) 0%, rgba(32, 58, 67, 0.95) 100%)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(64, 224, 255, 0.2)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          textTransform: 'none',
          fontWeight: 'bold',
          transition: 'all 0.3s ease',
        },
        contained: {
          background: 'linear-gradient(135deg, #40e0ff 0%, #1e90ff 100%)',
          color: '#0f2027',
          boxShadow: '0 0 15px rgba(64, 224, 255, 0.5)',
          '&:hover': {
            background: 'linear-gradient(135deg, #1e90ff 0%, #40e0ff 100%)',
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(64, 224, 255, 0.6)',
          },
        },
        outlined: {
          borderColor: 'rgba(64, 224, 255, 0.5)',
          color: '#40e0ff',
          '&:hover': {
            backgroundColor: 'rgba(64, 224, 255, 0.1)',
            borderColor: '#40e0ff',
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'rgba(15, 32, 39, 0.9)',
          border: '1px solid rgba(64, 224, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(15, 32, 39, 0.9)',
          border: '1px solid rgba(64, 224, 255, 0.3)',
          backdropFilter: 'blur(15px)',
          borderRadius: '20px',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 25px rgba(64, 224, 255, 0.3)',
            borderColor: '#40e0ff',
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App animated-bg">
          <Navigation />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/customers" element={<CustomerAnalysis />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/enhanced-dashboard" element={<EnhancedDashboard />} />
            <Route path="/pie-chart" element={<PieChartPage />} />
            <Route path="/previous-dashboard" element={<iframe src="/previous-dashboard.html" style={{width: '100%', height: '100vh', border: 'none'}} title="Previous AI-Banking Dashboard" />} />
          </Routes>
          <ChatbotWidget />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;