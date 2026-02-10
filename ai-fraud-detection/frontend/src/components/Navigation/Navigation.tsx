import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box,
  Avatar
} from '@mui/material';
import { keyframes } from '@mui/system';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import WarningIcon from '@mui/icons-material/Warning';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import HistoryIcon from '@mui/icons-material/History';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import PieChartIcon from '@mui/icons-material/PieChart';

const logoFloat = keyframes`
  0% {
    transform: translateY(0) scale(1);
    filter: drop-shadow(0 0 4px rgba(64, 224, 255, 0.7)) drop-shadow(0 0 8px rgba(64, 224, 255, 0.3));
  }
  25% {
    filter: drop-shadow(0 0 6px rgba(64, 224, 255, 0.9)) drop-shadow(0 0 12px rgba(255, 255, 255, 0.2));
  }
  50% {
    transform: translateY(-3px) scale(1.05);
    filter: drop-shadow(0 0 8px rgba(64, 224, 255, 1)) drop-shadow(0 0 16px rgba(255, 255, 255, 0.4));
  }
  75% {
    filter: drop-shadow(0 0 6px rgba(64, 224, 255, 0.9)) drop-shadow(0 0 12px rgba(255, 255, 255, 0.2));
  }
  100% {
    transform: translateY(0) scale(1);
    filter: drop-shadow(0 0 4px rgba(64, 224, 255, 0.7)) drop-shadow(0 0 8px rgba(64, 224, 255, 0.3));
  }
`;

const logoPulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(64, 224, 255, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(64, 224, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(64, 224, 255, 0);
  }
`;

const Navigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: <HomeIcon /> },
    { path: '/customers', label: 'Customers', icon: <PeopleIcon /> },
    { path: '/transactions', label: 'Transactions', icon: <AccountBalanceIcon /> },
    { path: '/alerts', label: 'Alerts', icon: <WarningIcon /> },
    { path: '/analytics', label: 'Analytics', icon: <AnalyticsIcon /> },
    { path: '/pie-chart', label: 'Risk Pie Chart', icon: <PieChartIcon /> },
    { path: '/enhanced-dashboard', label: 'Enhanced Dashboard', icon: <AutoGraphIcon /> },
    { path: '/previous-dashboard', label: 'Data AI Banking', icon: <HistoryIcon /> },
  ];

  return (
    <AppBar 
      position="static" 
      sx={{ 
        mb: 4,
        background: 'linear-gradient(135deg, rgba(15, 32, 39, 0.95) 0%, rgba(32, 58, 67, 0.95) 100%)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(64, 224, 255, 0.2)',
        borderRadius: '0 0 20px 20px'
      }}
    >
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
          <Avatar
            src="/logo.png"
            alt="AI Banking Logo"
            sx={{
              width: 40,
              height: 40,
              mr: 1,
              borderRadius: '12px',
              border: '2px solid rgba(64, 224, 255, 0.9)',
              boxShadow: '0 0 12px rgba(64, 224, 255, 0.7)',
              animation: `${logoFloat} 6s ease-in-out infinite, ${logoPulse} 8s ease-in-out infinite`,
              backgroundColor: 'rgba(10, 25, 41, 0.9)',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '-2px',
                left: '-2px',
                right: '-2px',
                bottom: '-2px',
                borderRadius: '12px',
                background: 'linear-gradient(45deg, #40e0ff, #ffffff, #40e0ff)',
                zIndex: -1,
                animation: `${logoFloat} 6s ease-in-out infinite reverse`,
                opacity: 0.3,
              }
            }}
          />
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #40e0ff 0%, #ffffff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            AI Fraud Detection System
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              variant={location.pathname === item.path ? "contained" : "outlined"}
              startIcon={item.icon}
              sx={{ 
                borderRadius: '20px',
                textTransform: 'none',
                fontWeight: 'bold',
                backgroundColor: location.pathname === item.path 
                  ? 'linear-gradient(135deg, #40e0ff 0%, #1e90ff 100%)' 
                  : 'transparent',
                borderColor: 'rgba(64, 224, 255, 0.5)',
                color: location.pathname === item.path ? '#0f2027' : '#40e0ff',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: location.pathname === item.path 
                    ? 'linear-gradient(135deg, #1e90ff 0%, #40e0ff 100%)' 
                    : 'rgba(64, 224, 255, 0.1)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 5px 15px rgba(64, 224, 255, 0.4)',
                  borderColor: '#40e0ff'
                }
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;