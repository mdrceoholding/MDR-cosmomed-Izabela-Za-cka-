const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const GroupSession = sequelize.define('GroupSession', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  facilitatorId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  sessionType: {
    type: DataTypes.ENUM('in_person', 'remote', 'hybrid'),
    defaultValue: 'in_person'
  },
  scheduledDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 90,
    comment: 'Duration in minutes'
  },
  intensity: {
    type: DataTypes.ENUM('gentle', 'medium', 'deep'),
    defaultValue: 'medium'
  },
  maxParticipants: {
    type: DataTypes.INTEGER,
    defaultValue: 12
  },
  currentParticipants: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  status: {
    type: DataTypes.ENUM('scheduled', 'open_for_registration', 'full', 'in_progress', 'completed', 'cancelled'),
    defaultValue: 'scheduled'
  },
  location: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: {
      address: null,
      city: null,
      country: 'Poland',
      virtualRoomUrl: null
    }
  },
  // Audio and guidance settings
  playlist: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  voiceGuidanceEnabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  language: {
    type: DataTypes.ENUM('pl', 'en', 'both'),
    defaultValue: 'pl'
  },
  // WebRTC room for remote sessions
  webrtcRoomId: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  webrtcRoomPassword: {
    type: DataTypes.STRING,
    allowNull: true
  },
  // Registration requirements
  requiresMedicalConsent: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  requiresPreSessionQuestionnaire: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: 0
  },
  currency: {
    type: DataTypes.STRING,
    defaultValue: 'PLN'
  },
  // Communication
  preSessionMessage: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  postSessionMessage: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  integrationPeriodDays: {
    type: DataTypes.INTEGER,
    defaultValue: 7,
    comment: 'Days for post-session support'
  }
}, {
  timestamps: true
});

module.exports = GroupSession;
