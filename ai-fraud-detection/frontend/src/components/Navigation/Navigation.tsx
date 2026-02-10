import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import WarningIcon from '@mui/icons-material/Warning';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import HistoryIcon from '@mui/icons-material/History';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import PieChartIcon from '@mui/icons-material/PieChart';

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
    { path: '/previous-dashboard', label: 'AI Data', icon: <HistoryIcon /> },
  ];

  return (
    <AppBar
      position="static"
      sx={{
        mb: 4,
        background: 'transparent',
        boxShadow: 'none',
        pt: 2
      }}
    >
      <Toolbar
        sx={{
          background: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '50px',
          border: '1px solid rgba(64, 224, 255, 0.2)',
          px: '24px !important',
          minHeight: '70px !important',
          justifyContent: 'space-between',
          flexWrap: 'wrap', // Allow wrapping if needed on small screens
          gap: 1
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            className="animated-logo-container"
            sx={{
              width: 44,
              height: 44,
              mr: 2,
              borderRadius: '12px',
              border: '2px solid rgba(64, 224, 255, 0.9)',
              boxShadow: '0 0 15px rgba(64, 224, 255, 0.5)',
              background: 'conic-gradient(from 0deg, #40e0ff, #1e90ff, #70e6ff, #40e0ff)',
              backgroundSize: '400% 400%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: '10px',
                background: 'conic-gradient(from 0deg, transparent, rgba(255,255,255,0.3), transparent)',
                animation: 'logoGlowAnimation 6s linear infinite',
                zIndex: 1,
              }
            }}
          >
            <Avatar
              src="/logo.png"
              alt="AI Banking Logo"
              sx={{
                width: 40,
                height: 40,
                borderRadius: '10px',
                backgroundColor: 'rgba(10, 25, 41, 0.7)',
                zIndex: 2,
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff', lineHeight: 1.2 }}>
              AI Fraud Detection
            </Typography>
            <Typography variant="caption" sx={{ color: '#40e0ff', letterSpacing: 1 }}>
              System
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', justifyContent: 'center' }}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              startIcon={item.icon}
              sx={{
                borderRadius: '25px',
                textTransform: 'none',
                fontWeight: 'bold',
                px: 2,
                py: 1,
                fontSize: '0.85rem',
                backgroundColor: location.pathname === item.path
                  ? '#40e0ff'
                  : 'transparent',
                color: location.pathname === item.path ? '#000' : 'rgba(64, 224, 255, 0.7)',
                border: location.pathname === item.path
                  ? 'none'
                  : '1px solid rgba(64, 224, 255, 0.3)',
                '&:hover': {
                  backgroundColor: location.pathname === item.path
                    ? '#70e6ff'
                    : 'rgba(64, 224, 255, 0.1)',
                  borderColor: '#40e0ff',
                  transform: 'translateY(-1px)'
                },
                transition: 'all 0.2s ease'
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