const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Journal = sequelize.define('Journal', {
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
  sessionId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'Sessions',
      key: 'id'
    }
  },
  entryType: {
    type: DataTypes.ENUM('text', 'voice', 'mixed'),
    defaultValue: 'text'
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  voiceRecordingUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  voiceRecordingDuration: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Duration in seconds'
  },
  // Emotional tagging
  emotions: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
    defaultValue: []
  },
  emotionIntensity: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: {},
    comment: 'Map of emotion -> intensity (1-10)'
  },
  // Symbols and themes
  symbols: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
    defaultValue: []
  },
  themes: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
    defaultValue: []
  },
  // Integration insights
  insights: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  bodyExperiences: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  visualExperiences: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  // Rating and reflection
  sessionRating: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 10
    }
  },
  wouldRecommend: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  // Privacy
  isPrivate: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  sharedWithFacilitator: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  entryDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: true,
  indexes: [
    {
      fields: ['userId', 'entryDate']
    },
    {
      fields: ['sessionId']
    }
  ]
});

module.exports = Journal;
