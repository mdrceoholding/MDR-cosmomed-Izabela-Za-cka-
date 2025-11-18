const express = require('express');
const {
  createGroupSession,
  getGroupSessions,
  getGroupSession,
  updateGroupSession,
  updateParticipantStatus,
  getSessionDashboard,
  sendMessageToParticipants
} = require('../controllers/facilitatorController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);
router.use(authorize('facilitator', 'admin'));

router.route('/group-sessions')
  .get(getGroupSessions)
  .post(createGroupSession);

router.route('/group-sessions/:id')
  .get(getGroupSession)
  .put(updateGroupSession);

router.get('/group-sessions/:id/dashboard', getSessionDashboard);
router.post('/group-sessions/:id/message', sendMessageToParticipants);

router.put('/participants/:id', updateParticipantStatus);

module.exports = router;
