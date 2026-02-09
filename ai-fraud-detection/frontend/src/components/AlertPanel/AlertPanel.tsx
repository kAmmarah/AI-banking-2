import React, { useState, useEffect } from 'react';
import { 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon, 
  ListItemButton,
  Paper,
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
      <Typography variant="h6" gutterBottom>
        Fraud Alerts
      </Typography>
      <List dense>
        {alerts.map((alert) => (
          <ListItem 
            key={alert.id} 
            disablePadding
            secondaryAction={
              <Chip 
                label={(alert.riskScore * 100).toFixed(0) + '%'} 
                size="small"
                color={
                  alert.riskScore > 0.8 ? 'error' :
                  alert.riskScore > 0.5 ? 'warning' :
                  'default'
                }
              />
            }
          >
            <ListItemButton>
              <ListItemIcon>
                {alert.status === 'resolved' ? (
                  <CheckCircleIcon color="success" />
                ) : (
                  <WarningIcon color="warning" />
                )}
              </ListItemIcon>
              <ListItemText
                primary={`TX: ${alert.transactionId}`}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="text.primary">
                      {alert.description}
                    </Typography>
                    <br />
                    <Chip 
                      label={alert.status.toUpperCase()} 
                      size="small"
                      color={
                        alert.status === 'open' ? 'error' :
                        alert.status === 'investigating' ? 'warning' :
                        'success'
                      }
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