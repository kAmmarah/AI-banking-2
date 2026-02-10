import React from 'react';
import { Box, Typography, Grid, Paper, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  borderRadius: '20px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
}));

// Example distribution of transaction risk levels
const PIE_DATA = [
  { name: 'Safe', value: 65 },
  { name: 'Under Review', value: 15 },
  { name: 'Suspicious', value: 12 },
  { name: 'Confirmed Fraud', value: 8 },
];

// Color palette for the segments
const COLORS = ['#4ECDC4', '#FFD700', '#FFA500', '#FF6B6B'];

const PieChartPage: React.FC = () => {
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
          Transaction Risk Distribution
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <StyledPaper>
              <Box sx={{ height: 360 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={PIE_DATA}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      dataKey="value"
                      labelLine={false}
                      label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                        const safeMidAngle = midAngle ?? 0;
                        const safePercent = percent ?? 0;
                        const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
                        const x = cx + radius * Math.cos(-safeMidAngle * Math.PI / 180);
                        const y = cy + radius * Math.sin(-safeMidAngle * Math.PI / 180);

                        return (
                          <text
                            x={x}
                            y={y}
                            fill="#ffffff"
                            textAnchor={x > cx ? 'start' : 'end'}
                            dominantBaseline="central"
                            fontSize="12"
                            fontWeight="bold"
                          >
                            {`${(safePercent * 100).toFixed(0)}%`}
                          </text>
                        );
                      }}
                    >
                      {PIE_DATA.map((entry, index) => (
                        <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(15, 32, 39, 0.9)',
                        border: '1px solid rgba(64, 224, 255, 0.3)',
                        borderRadius: '8px',
                        color: '#e0e0e0',
                      }}
                    />
                    <Legend
                      wrapperStyle={{
                        color: '#e0e0e0',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </StyledPaper>
          </Grid>

          <Grid item xs={12} md={5}>
            <StyledPaper>
              <Typography
                variant="h6"
                sx={{ color: '#40e0ff', fontWeight: 'bold', mb: 2 }}
              >
                What this chart shows
              </Typography>
              <Typography variant="body2" sx={{ color: '#e0e0e0', mb: 1.5 }}>
                This pie chart visualizes the distribution of recent transactions by
                risk category. Each colored segment represents the share of
                transactions that fall into a specific fraud risk level.
              </Typography>
              <Typography variant="body2" sx={{ color: '#e0e0e0', mb: 1 }}>
                - <strong style={{ color: '#4ECDC4' }}>Safe</strong>: Transactions
                that passed all fraud checks.
              </Typography>
              <Typography variant="body2" sx={{ color: '#e0e0e0', mb: 1 }}>
                - <strong style={{ color: '#FFD700' }}>Under Review</strong>:
                Transactions flagged for manual review.
              </Typography>
              <Typography variant="body2" sx={{ color: '#e0e0e0', mb: 1 }}>
                - <strong style={{ color: '#FFA500' }}>Suspicious</strong>:
                Transactions with strong fraud indicators.
              </Typography>
              <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                - <strong style={{ color: '#FF6B6B' }}>Confirmed Fraud</strong>:
                Transactions confirmed as fraudulent.
              </Typography>
            </StyledPaper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PieChartPage;

