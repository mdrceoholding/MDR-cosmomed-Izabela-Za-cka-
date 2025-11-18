const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const crypto = require('crypto');

const ENCRYPTION_ALGORITHM = 'aes-256-gcm';
const ENCRYPTION_KEY = Buffer.from(process.env.ENCRYPTION_KEY || 'default-key-change-in-production-32', 'utf8');

// Encrypt sensitive medical data (RODO compliance)
function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ENCRYPTION_ALGORITHM, ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag();
  return iv.toString('hex') + ':' + authTag.toString('hex') + ':' + encrypted;
}

// Decrypt sensitive medical data
function decrypt(text) {
  const parts = text.split(':');
  const iv = Buffer.from(parts[0], 'hex');
  const authTag = Buffer.from(parts[1], 'hex');
  const encrypted = parts[2];
  const decipher = crypto.createDecipheriv(ENCRYPTION_ALGORITHM, ENCRYPTION_KEY, iv);
  decipher.setAuthTag(authTag);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

const MedicalConsent = sequelize.define('MedicalConsent', {
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
  // RODO compliant encrypted medical data
  medicalHistory: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const rawValue = this.getDataValue('medicalHistory');
      return rawValue ? decrypt(rawValue) : null;
    },
    set(value) {
      this.setDataValue('medicalHistory', value ? encrypt(value) : null);
    }
  },
  // Contraindications checklist
  contraindications: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: {
      pregnancy: false,
      epilepsy: false,
      cardiovascularDisease: false,
      highBloodPressure: false,
      psychoticDisorders: false,
      recentSurgery: false,
      glaucoma: false,
      severeAsthma: false,
      other: null
    }
  },
  hasContraindications: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  medications: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const rawValue = this.getDataValue('medications');
      return rawValue ? decrypt(rawValue) : null;
    },
    set(value) {
      this.setDataValue('medications', value ? encrypt(value) : null);
    }
  },
  // Consent agreements
  consentToParticipate: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  consentToDataProcessing: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  consentToEmergencyContact: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  acknowledgedRisks: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  signatureData: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Base64 encoded signature image'
  },
  ipAddress: {
    type: DataTypes.STRING,
    allowNull: true
  },
  consentDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  expiryDate: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Consent valid for 1 year'
  },
  pdfUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'URL to generated PDF consent form'
  },
  isValid: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: true
});

module.exports = MedicalConsent;
