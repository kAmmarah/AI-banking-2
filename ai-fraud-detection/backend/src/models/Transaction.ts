export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  merchant: string;
  location: string;
  timestamp: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  isFraud?: boolean;
  riskScore?: number;
  ipAdress?: string;
  deviceFingerprint?: string;
}