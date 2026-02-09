import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface TransactionAttributes {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  merchant: string;
  location: string;
  ipAddress?: string;
  deviceFingerprint?: string;
  timestamp: Date;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  isFraud: boolean;
  riskScore: number;
}

type TransactionCreationAttributes = Optional<TransactionAttributes, 'id' | 'timestamp' | 'isFraud' | 'riskScore'>;

class Transaction extends Model<TransactionAttributes, TransactionCreationAttributes> implements TransactionAttributes {
  public id!: string;
  public userId!: string;
  public amount!: number;
  public currency!: string;
  public merchant!: string;
  public location!: string;
  public ipAddress?: string;
  public deviceFingerprint?: string;
  public timestamp!: Date;
  public status!: 'pending' | 'completed' | 'failed' | 'cancelled';
  public isFraud!: boolean;
  public riskScore!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Transaction.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'user_id'
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    currency: {
      type: DataTypes.STRING,
      defaultValue: 'USD'
    },
    merchant: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ipAddress: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'ip_address'
    },
    deviceFingerprint: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'device_fingerprint'
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed', 'failed', 'cancelled'),
      defaultValue: 'pending',
      allowNull: false
    },
    isFraud: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'is_fraud'
    },
    riskScore: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
      field: 'risk_score'
    }
  },
  {
    tableName: 'Transactions',
    sequelize, // passing the sequelize instance is required
    timestamps: true, // adds createdAt and updatedAt fields
  }
);

export { Transaction };
export type { TransactionAttributes, TransactionCreationAttributes };