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
import GlobalChatbot from './components/GlobalChatbot/GlobalChatbot';

const theme = createTheme({
  palette: {
    primary: {
      main: '#40e0ff',
    },
    secondary: {
      main: '#40e0ff',
    },
    background: {
      default: '#0f2027',
      paper: 'rgba(255, 255, 255, 0.05)',
    },
    text: {
      primary: '#e0e0e0',
      secondary: '#b0b0b0',
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
    h6: {
      background: 'linear-gradient(135deg, #40e0ff 0%, #ffffff 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      fontWeight: 'bold',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          textTransform: 'none',
          fontWeight: 'bold',
          transition: 'all 0.3s ease',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: '15px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        },
      },
    },
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
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
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
          <GlobalChatbot />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;