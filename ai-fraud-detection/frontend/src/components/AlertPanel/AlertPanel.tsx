import React, { useState, useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Typography,
  Box,
  Chip
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface Alert {
  id: string;
  transactionId: string;
  userId: string;
  timestamp: string;
  riskScore: number;
  status: 'open' | 'investigating' | 'resolved' | 'closed';
  description: string;
}

export const AlertPanel: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    // In a real app, fetch from the backend
    // For now, using mock data
    setAlerts([
      {
        id: 'alert1',
        transactionId: 'tx123',
        userId: 'user456',
        timestamp: new Date(Date.now() - 60000).toISOString(), // 1 minute ago
        riskScore: 0.85,
        status: 'open',
        description: 'Unusual transaction amount for user'
      },
      {
        id: 'alert2',
        transactionId: 'tx124',
        userId: 'user789',
        timestamp: new Date(Date.now() - 120000).toISOString(), // 2 minutes ago
        riskScore: 0.92,
        status: 'investigating',
        description: 'Transaction from high-risk location'
      },
      {
        id: 'alert3',
        transactionId: 'tx125',
        userId: 'user101',
        timestamp: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago
        riskScore: 0.78,
        status: 'resolved',
        description: 'Rapid consecutive transactions'
      }
    ]);
  }, []);

  return (
    <Box>

      <List dense>
        {alerts.map((alert) => (
          <ListItem
            key={alert.id}
            disablePadding
            sx={{
              mb: 1.5,
              borderRadius: '12px',
              backgroundColor: 'rgba(30, 41, 59, 0.7)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(64, 224, 255, 0.1)',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: 'rgba(30, 41, 59, 0.9)',
                border: '1px solid rgba(64, 224, 255, 0.3)',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
              }
            }}
            secondaryAction={
              <Chip
                label={(alert.riskScore * 100).toFixed(0) + '%'}
                size="small"
                sx={{
                  backgroundColor:
                    alert.riskScore > 0.8 ? '#FF6B6B' :
                      alert.riskScore > 0.5 ? '#FFD700' : '#4ECDC4',
                  color: alert.riskScore > 0.5 && alert.riskScore <= 0.8 ? '#333' : 'white',
                  fontWeight: 'bold'
                }}
              />
            }
          >
            <ListItemButton>
              <ListItemIcon>
                {alert.status === 'resolved' ? (
                  <CheckCircleIcon sx={{ color: '#4ECDC4' }} />
                ) : (
                  <WarningIcon sx={{ color: '#FFD700' }} />
                )}
              </ListItemIcon>
              <ListItemText
                primary={`TX: ${alert.transactionId}`}
                primaryTypographyProps={{
                  sx: { color: '#e0e0e0', fontWeight: 'bold' }
                }}
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ color: '#b0b0b0' }}
                    >
                      {alert.description}
                    </Typography>
                    <br />
                    <Chip
                      label={alert.status.toUpperCase()}
                      size="small"
                      sx={{
                        backgroundColor:
                          alert.status === 'open' ? '#FF6B6B' :
                            alert.status === 'investigating' ? '#FFD700' : '#4ECDC4',
                        color: alert.status === 'investigating' ? '#333' : 'white',
                        fontWeight: 'bold',
                        mt: 0.5
                      }}
                    />
                  </>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};