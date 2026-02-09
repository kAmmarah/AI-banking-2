import { DataTypes, QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('Transactions', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
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
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
      }
    });

    // Create indexes for better query performance
    await queryInterface.addIndex('Transactions', ['userId'], {
      name: 'idx_transactions_user_id'
    });

    await queryInterface.addIndex('Transactions', ['timestamp'], {
      name: 'idx_transactions_timestamp'
    });

    await queryInterface.addIndex('Transactions', ['isFraud'], {
      name: 'idx_transactions_is_fraud'
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('Transactions');
  }
};