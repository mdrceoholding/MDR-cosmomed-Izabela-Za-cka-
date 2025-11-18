const { sequelize } = require('../config/database');
const User = require('./User');
const MedicalConsent = require('./MedicalConsent');
const Session = require('./Session');
const Journal = require('./Journal');
const GroupSession = require('./GroupSession');
const Participant = require('./Participant');

// Define relationships
User.hasMany(Session, { foreignKey: 'userId', as: 'sessions' });
Session.belongsTo(User, { foreignKey: 'userId', as: 'participant' });

User.hasMany(Session, { foreignKey: 'facilitatorId', as: 'facilitatedSessions' });
Session.belongsTo(User, { foreignKey: 'facilitatorId', as: 'facilitator' });

User.hasMany(Journal, { foreignKey: 'userId', as: 'journals' });
Journal.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Session.hasMany(Journal, { foreignKey: 'sessionId', as: 'journals' });
Journal.belongsTo(Session, { foreignKey: 'sessionId', as: 'session' });

User.hasOne(MedicalConsent, { foreignKey: 'userId', as: 'medicalConsent' });
MedicalConsent.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(GroupSession, { foreignKey: 'facilitatorId', as: 'groupSessions' });
GroupSession.belongsTo(User, { foreignKey: 'facilitatorId', as: 'facilitator' });

GroupSession.hasMany(Session, { foreignKey: 'groupSessionId', as: 'sessions' });
Session.belongsTo(GroupSession, { foreignKey: 'groupSessionId', as: 'groupSession' });

GroupSession.hasMany(Participant, { foreignKey: 'groupSessionId', as: 'participants' });
Participant.belongsTo(GroupSession, { foreignKey: 'groupSessionId', as: 'groupSession' });

User.hasMany(Participant, { foreignKey: 'userId', as: 'participations' });
Participant.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Participant.belongsTo(MedicalConsent, { foreignKey: 'medicalConsentId', as: 'medicalConsent' });

// Sync database
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('✓ Database synchronized successfully');
  } catch (error) {
    console.error('✗ Database sync error:', error);
    throw error;
  }
};

module.exports = {
  sequelize,
  User,
  MedicalConsent,
  Session,
  Journal,
  GroupSession,
  Participant,
  syncDatabase
};
