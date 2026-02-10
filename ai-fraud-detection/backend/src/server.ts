import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { transactionRoutes } from './routes/transactionRoutes';
import { fraudDetectionRoutes } from './routes/fraudDetectionRoutes';
import { WebSocketService } from './services/WebSocketService';
import { Server as HttpServer } from 'http';

dotenv.config();

const app = express();
const server = new HttpServer(app);
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(express.json({ limit: '10mb' })); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));

// Initialize WebSocket service
const webSocketService = WebSocketService.getInstance();
webSocketService.initialize(server);

// Routes
app.use('/api/transactions', transactionRoutes);
app.use('/api/fraud', fraudDetectionRoutes);

// Simple AI chatbot endpoint (rule-based placeholder)
app.post('/api/chat', (req: Request, res: Response) => {
  const { message } = (req.body ?? {}) as { message?: unknown };

  if (typeof message !== 'string') {
    return res.status(400).json({
      error: 'Invalid request: "message" must be a string.',
    });
  }

  const text = message.toLowerCase();

  let reply =
    'I am your AI fraud assistant. I can help explain risk scores, alerts, and transactions in this dashboard.';

  if (text.includes('risk') || text.includes('score')) {
    reply =
      'Risk scores summarize how likely a transaction is to be fraudulent. Higher scores (above 70%) should be reviewed first.';
  } else if (text.includes('fraud') || text.includes('alert')) {
    reply =
      'Fraud alerts are generated when unusual patterns are detected, such as high-value payments in new locations or rapid consecutive transactions.';
  } else if (text.includes('transaction') || text.includes('customer')) {
    reply =
      'You can inspect individual customers and transactions on the dashboard pages. Use filters and risk labels to prioritize investigations.';
  } else if (text.includes('hello') || text.includes('hi')) {
    reply = 'Hello! How can I help you understand your fraud detection data today?';
  }

  res.status(200).json({ reply });
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Server is running',
    webSocketClients: webSocketService.getConnectedClientsCount()
  });
});

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ 
    message: 'AI-Powered Fraud Detection System API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      transactions: '/api/transactions',
      fraud: '/api/fraud'
    },
    webSocketClients: webSocketService.getConnectedClientsCount()
  });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: any) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check available at http://localhost:${PORT}/health`);
  console.log(`WebSocket server initialized`);
});

export { app, server, webSocketService };