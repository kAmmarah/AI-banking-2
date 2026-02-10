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

// Google Generative AI
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Simple AI chatbot endpoint (Gemini Integration)
app.post('/api/chat', async (req: Request, res: Response) => {
  const { message } = (req.body ?? {}) as { message?: unknown };

  if (typeof message !== 'string') {
    return res.status(400).json({
      error: 'Invalid request: "message" must be a string.',
    });
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Provide context to the AI about its role
    const prompt = `
      You are an expert AI Fraud Detection Assistant for a banking dashboard.
      Your role is to help users understand fraud risks, analyze transaction patterns, and explain dashboard features.
      
      Dashboard Context:
      - Total Transactions: 12,500
      - Flagged Transactions: 32
      - Confirmed Fraud: 8
      - Prevented Losses: $45,600
      - Features: Transaction Feed, Fraud Analysis Charts, Risk Scoring, Customer Profiles.
      
      User Question: ${message}
      
      Please provide a helpful, professional, and concise response related to banking fraud detection.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ reply: text });
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({
      reply: 'I apologize, but I am having trouble connecting to the AI service at the moment.',
      error: 'Failed to generate response'
    });
  }
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