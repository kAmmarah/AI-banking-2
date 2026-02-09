import WebSocket from 'ws';
import { Server as HttpServer } from 'http';
import { FraudDetectionService } from './ml-service/FraudDetectionService';

export interface WebSocketMessage {
  type: string;
  data: any;
  timestamp: Date;
}

export class WebSocketService {
  private static instance: WebSocketService;
  private wss: WebSocket.Server | null = null;
  private connectedClients: Set<WebSocket> = new Set();

  private constructor() {}

  public static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  public initialize(server: HttpServer): void {
    this.wss = new WebSocket.Server({ server });

    this.wss.on('connection', (ws: WebSocket) => {
      console.log('New client connected');
      this.connectedClients.add(ws);

      ws.on('close', () => {
        console.log('Client disconnected');
        this.connectedClients.delete(ws);
      });

      ws.on('error', (error: Error) => {
        console.error('WebSocket error:', error);
        this.connectedClients.delete(ws);
      });

      // Send welcome message
      this.sendMessage(ws, {
        type: 'CONNECTION_ESTABLISHED',
        data: { message: 'Connected to fraud detection system' },
        timestamp: new Date()
      });
    });

    console.log('WebSocket server initialized');
  }

  public broadcastMessage(message: WebSocketMessage): void {
    if (!this.wss) {
      console.error('WebSocket server not initialized');
      return;
    }

    const messageStr = JSON.stringify(message);
    this.connectedClients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(messageStr);
      }
    });
  }

  public sendMessage(client: WebSocket, message: WebSocketMessage): void {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  }

  public handleNewTransaction(transactionData: any): void {
    // Analyze the transaction for fraud
    FraudDetectionService.analyzeTransaction(transactionData)
      .then(result => {
        // Broadcast the analysis result to all connected clients
        this.broadcastMessage({
          type: 'TRANSACTION_ANALYSIS_RESULT',
          data: result,
          timestamp: new Date()
        });

        // If transaction is flagged as fraud, send a specific alert
        if (result.isFraud) {
          this.broadcastMessage({
            type: 'FRAUD_ALERT',
            data: {
              ...result,
              transaction: transactionData
            },
            timestamp: new Date()
          });
        }
      })
      .catch(error => {
        console.error('Error analyzing transaction:', error);
        this.broadcastMessage({
          type: 'ANALYSIS_ERROR',
          data: { error: error.message },
          timestamp: new Date()
        });
      });
  }

  public getConnectedClientsCount(): number {
    return this.connectedClients.size;
  }
}