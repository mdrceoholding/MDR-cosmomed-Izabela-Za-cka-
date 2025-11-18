const { MedicalConsent, User } = require('../models');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// @desc    Create medical consent
// @route   POST /api/medical-consent
// @access  Private
exports.createMedicalConsent = async (req, res, next) => {
  try {
    const {
      medicalHistory,
      contraindications,
      medications,
      consentToParticipate,
      consentToDataProcessing,
      consentToEmergencyContact,
      acknowledgedRisks,
      signatureData
    } = req.body;

    // Check for existing valid consent
    const existingConsent = await MedicalConsent.findOne({
      where: {
        userId: req.user.id,
        isValid: true
      }
    });

    if (existingConsent) {
      return res.status(400).json({
        success: false,
        message: 'Posiadasz już ważną zgodę medyczną'
      });
    }

    // Check if any contraindications are present
    const hasContraindications = Object.values(contraindications || {}).some(
      value => value === true
    );

    if (hasContraindications && !acknowledgedRisks) {
      return res.status(400).json({
        success: false,
        message: 'Wykryto przeciwwskazania - wymagane potwierdzenie świadomości ryzyka'
      });
    }

    // Create consent
    const consent = await MedicalConsent.create({
      userId: req.user.id,
      medicalHistory,
      contraindications,
      hasContraindications,
      medications,
      consentToParticipate,
      consentToDataProcessing,
      consentToEmergencyContact,
      acknowledgedRisks,
      signatureData,
      ipAddress: req.ip,
      consentDate: new Date(),
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
      isValid: true
    });

    // Generate PDF consent form
    const pdfPath = await generateConsentPDF(consent, req.user);
    await consent.update({ pdfUrl: pdfPath });

    res.status(201).json({
      success: true,
      data: consent,
      message: hasContraindications ?
        'Zgoda została zapisana. UWAGA: Wykryto przeciwwskazania - zalecana konsultacja z lekarzem przed sesją.' :
        'Zgoda medyczna została pomyślnie zapisana'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's medical consent
// @route   GET /api/medical-consent
// @access  Private
exports.getMedicalConsent = async (req, res, next) => {
  try {
    const consent = await MedicalConsent.findOne({
      where: {
        userId: req.user.id,
        isValid: true
      }
    });

    if (!consent) {
      return res.status(404).json({
        success: false,
        message: 'Nie znaleziono ważnej zgody medycznej'
      });
    }

    res.status(200).json({
      success: true,
      data: consent
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update medical consent
// @route   PUT /api/medical-consent/:id
// @access  Private
exports.updateMedicalConsent = async (req, res, next) => {
  try {
    const consent = await MedicalConsent.findByPk(req.params.id);

    if (!consent) {
      return res.status(404).json({
        success: false,
        message: 'Zgoda medyczna nie została znaleziona'
      });
    }

    if (consent.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Brak uprawnień'
      });
    }

    const allowedFields = [
      'medicalHistory',
      'contraindications',
      'medications',
      'acknowledgedRisks'
    ];

    const updateData = {};
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    if (updateData.contraindications) {
      updateData.hasContraindications = Object.values(updateData.contraindications).some(
        value => value === true
      );
    }

    await consent.update(updateData);

    res.status(200).json({
      success: true,
      data: consent
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Revoke medical consent
// @route   DELETE /api/medical-consent/:id
// @access  Private
exports.revokeMedicalConsent = async (req, res, next) => {
  try {
    const consent = await MedicalConsent.findByPk(req.params.id);

    if (!consent) {
      return res.status(404).json({
        success: false,
        message: 'Zgoda medyczna nie została znaleziona'
      });
    }

    if (consent.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Brak uprawnień'
      });
    }

    await consent.update({ isValid: false });

    res.status(200).json({
      success: true,
      message: 'Zgoda medyczna została wycofana'
    });
  } catch (error) {
    next(error);
  }
};

// Helper function to generate PDF consent form
async function generateConsentPDF(consent, user) {
  return new Promise((resolve, reject) => {
    try {
      const fileName = `consent_${user.id}_${Date.now()}.pdf`;
      const filePath = path.join(__dirname, '../../public/consents', fileName);

      // Ensure directory exists
      if (!fs.existsSync(path.dirname(filePath))) {
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
      }

      const doc = new PDFDocument();
      const stream = fs.createWriteStream(filePath);

      doc.pipe(stream);

      // Header
      doc.fontSize(20).text('ZGODA NA UDZIAŁ W SESJI ODDECHOWEJ', { align: 'center' });
      doc.moveDown();
      doc.fontSize(16).text('Holotropic Breathwork / Oddech Holotropowy', { align: 'center' });
      doc.moveDown(2);

      // User info
      doc.fontSize(12);
      doc.text(`Imię i nazwisko: ${user.firstName} ${user.lastName}`);
      doc.text(`Email: ${user.email}`);
      doc.text(`Data zgody: ${new Date(consent.consentDate).toLocaleDateString('pl-PL')}`);
      doc.text(`Ważność do: ${new Date(consent.expiryDate).toLocaleDateString('pl-PL')}`);
      doc.moveDown(2);

      // Contraindications
      doc.fontSize(14).text('PRZECIWWSKAZANIA:', { underline: true });
      doc.moveDown();
      doc.fontSize(11);

      const contraindications = consent.contraindications;
      Object.keys(contraindications).forEach(key => {
        const label = {
          pregnancy: 'Ciąża',
          epilepsy: 'Epilepsja',
          cardiovascularDisease: 'Choroby sercowo-naczyniowe',
          highBloodPressure: 'Nadciśnienie',
          psychoticDisorders: 'Zaburzenia psychotyczne',
          recentSurgery: 'Niedawna operacja',
          glaucoma: 'Jaskra',
          severeAsthma: 'Ciężka astma'
        }[key];

        if (label) {
          doc.text(`☐ ${contraindications[key] ? '✓' : ' '} ${label}`);
        }
      });

      doc.moveDown(2);

      // Consents
      doc.fontSize(14).text('ZGODY:', { underline: true });
      doc.moveDown();
      doc.fontSize(11);
      doc.text(`☐ ${consent.consentToParticipate ? '✓' : ' '} Wyrażam zgodę na udział w sesji oddechowej`);
      doc.text(`☐ ${consent.consentToDataProcessing ? '✓' : ' '} Wyrażam zgodę na przetwarzanie danych osobowych (RODO)`);
      doc.text(`☐ ${consent.consentToEmergencyContact ? '✓' : ' '} Wyrażam zgodę na kontakt w sytuacji awaryjnej`);
      doc.text(`☐ ${consent.acknowledgedRisks ? '✓' : ' '} Potwierdzam świadomość ryzyka związanego z techniką`);

      doc.moveDown(2);

      // Disclaimer
      doc.fontSize(10);
      doc.text('OŚWIADCZENIE:', { underline: true });
      doc.text(
        'Oświadczam, że zostałem/-am poinformowany/-a o charakterze sesji oddechowej, ' +
        'potencjalnych ryzykach i przeciwwskazaniach. Rozumiem, że sesja ma charakter ' +
        'eksperymentalny i nie zastępuje leczenia medycznego ani psychoterapii. ' +
        'Przyjmuję pełną odpowiedzialność za swoją decyzję o udziale w sesji.',
        { align: 'justify' }
      );

      doc.moveDown(2);

      // Signature
      doc.text(`IP: ${consent.ipAddress}`);
      doc.text('Podpis cyfrowy zaakceptowany w systemie');

      doc.end();

      stream.on('finish', () => {
        resolve(`/consents/${fileName}`);
      });

      stream.on('error', reject);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = exports;
