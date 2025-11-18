const express = require('express');
const {
  createSession,
  updateSession,
  getSessions,
  getSession,
  getSessionStats,
  emergencyStop
} = require('../controllers/sessionController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getSessions)
  .post(createSession);

router.get('/stats/summary', getSessionStats);

router.route('/:id')
  .get(getSession)
  .put(updateSession);

router.post('/:id/emergency-stop', emergencyStop);

module.exports = router;
