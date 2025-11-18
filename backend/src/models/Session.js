const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Session = sequelize.define('Session', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  facilitatorId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'Users',
      key: 'id'
    },
    comment: 'Optional - for group sessions'
  },
  groupSessionId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'GroupSessions',
      key: 'id'
    }
  },
  sessionType: {
    type: DataTypes.ENUM('individual', 'group', 'remote'),
    defaultValue: 'individual'
  },
  intensity: {
    type: DataTypes.ENUM('gentle', 'medium', 'deep'),
    allowNull: false,
    defaultValue: 'medium'
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 60,
    comment: 'Duration in minutes'
  },
  actualDuration: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Actual duration if session was ended early'
  },
  startTime: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('scheduled', 'in_progress', 'completed', 'interrupted', 'cancelled'),
    defaultValue: 'scheduled'
  },
  audioTrack: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Selected audio playlist ID'
  },
  voiceGuidance: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  language: {
    type: DataTypes.ENUM('pl', 'en'),
    defaultValue: 'pl'
  },
  // Biometric data (if available from wearables)
  biometricData: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: {
      averageHeartRate: null,
      maxHeartRate: null,
      minHeartRate: null,
      hrv: null,
      oxygenSaturation: null,
      alerts: []
    }
  },
  // Safety features
  emergencyStopUsed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  emergencyStopTime: {
    type: DataTypes.DATE,
    allowNull: true
  },
  emergencyStopReason: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  // Location for emergency purposes
  location: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: {
      latitude: null,
      longitude: null,
      address: null
    }
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: true
});

module.exports = Session;
