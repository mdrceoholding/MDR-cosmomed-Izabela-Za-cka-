const express = require('express');
const {
  createJournal,
  getJournals,
  getJournal,
  updateJournal,
  deleteJournal,
  getJournalInsights
} = require('../controllers/journalController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getJournals)
  .post(createJournal);

router.get('/insights/patterns', getJournalInsights);

router.route('/:id')
  .get(getJournal)
  .put(updateJournal)
  .delete(deleteJournal);

module.exports = router;
