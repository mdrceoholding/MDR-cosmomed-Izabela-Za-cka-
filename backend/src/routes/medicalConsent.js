const express = require('express');
const {
  createMedicalConsent,
  getMedicalConsent,
  updateMedicalConsent,
  revokeMedicalConsent
} = require('../controllers/medicalConsentController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getMedicalConsent)
  .post(createMedicalConsent);

router.route('/:id')
  .put(updateMedicalConsent)
  .delete(revokeMedicalConsent);

module.exports = router;
