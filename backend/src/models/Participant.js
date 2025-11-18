const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Participant = sequelize.define('Participant', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  groupSessionId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'GroupSessions',
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  registrationDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  status: {
    type: DataTypes.ENUM('registered', 'confirmed', 'attended', 'cancelled', 'no_show'),
    defaultValue: 'registered'
  },
  paymentStatus: {
    type: DataTypes.ENUM('pending', 'completed', 'refunded', 'waived'),
    defaultValue: 'pending'
  },
  medicalConsentCompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  medicalConsentId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'MedicalConsents',
      key: 'id'
    }
  },
  preSessionQuestionnaireCompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  preSessionQuestionnaire: {
    type: DataTypes.JSON,
    allowNull: true
  },
  // Real-time monitoring during session
  currentStatus: {
    type: DataTypes.ENUM('not_started', 'active', 'peak_phase', 'integration', 'completed', 'needs_assistance'),
    defaultValue: 'not_started'
  },
  needsAssistance: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  assistanceNote: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  // Biometric alerts
  biometricAlerts: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  // Notes from facilitator
  facilitatorNotes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  postSessionFollowUp: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['groupSessionId', 'userId']
    }
  ]
});

module.exports = Participant;
