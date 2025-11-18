const { Journal, Session } = require('../models');
const { Op } = require('sequelize');

// @desc    Create journal entry
// @route   POST /api/journals
// @access  Private
exports.createJournal = async (req, res, next) => {
  try {
    const {
      sessionId,
      entryType,
      content,
      voiceRecordingUrl,
      voiceRecordingDuration,
      emotions,
      emotionIntensity,
      symbols,
      themes,
      insights,
      bodyExperiences,
      visualExperiences,
      sessionRating,
      wouldRecommend,
      sharedWithFacilitator
    } = req.body;

    const journal = await Journal.create({
      userId: req.user.id,
      sessionId,
      entryType: entryType || 'text',
      content,
      voiceRecordingUrl,
      voiceRecordingDuration,
      emotions: emotions || [],
      emotionIntensity: emotionIntensity || {},
      symbols: symbols || [],
      themes: themes || [],
      insights,
      bodyExperiences,
      visualExperiences,
      sessionRating,
      wouldRecommend,
      sharedWithFacilitator: sharedWithFacilitator || false,
      isPrivate: true,
      entryDate: new Date()
    });

    res.status(201).json({
      success: true,
      data: journal
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's journal entries
// @route   GET /api/journals
// @access  Private
exports.getJournals = async (req, res, next) => {
  try {
    const { sessionId, startDate, endDate, emotions, limit = 20, offset = 0 } = req.query;

    const where = { userId: req.user.id };

    if (sessionId) {
      where.sessionId = sessionId;
    }

    if (startDate || endDate) {
      where.entryDate = {};
      if (startDate) where.entryDate[Op.gte] = new Date(startDate);
      if (endDate) where.entryDate[Op.lte] = new Date(endDate);
    }

    if (emotions) {
      where.emotions = {
        [Op.contains]: Array.isArray(emotions) ? emotions : [emotions]
      };
    }

    const journals = await Journal.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['entryDate', 'DESC']],
      include: [
        {
          model: Session,
          as: 'session',
          attributes: ['id', 'intensity', 'duration', 'startTime']
        }
      ]
    });

    res.status(200).json({
      success: true,
      count: journals.count,
      data: journals.rows
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single journal entry
// @route   GET /api/journals/:id
// @access  Private
exports.getJournal = async (req, res, next) => {
  try {
    const journal = await Journal.findByPk(req.params.id, {
      include: [
        {
          model: Session,
          as: 'session'
        }
      ]
    });

    if (!journal) {
      return res.status(404).json({
        success: false,
        message: 'Wpis dziennika nie został znaleziony'
      });
    }

    // Check permissions
    if (journal.userId !== req.user.id) {
      // Check if user is facilitator and entry is shared
      if (!journal.sharedWithFacilitator || req.user.role !== 'facilitator') {
        return res.status(403).json({
          success: false,
          message: 'Brak uprawnień do tego wpisu'
        });
      }
    }

    res.status(200).json({
      success: true,
      data: journal
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update journal entry
// @route   PUT /api/journals/:id
// @access  Private
exports.updateJournal = async (req, res, next) => {
  try {
    const journal = await Journal.findByPk(req.params.id);

    if (!journal) {
      return res.status(404).json({
        success: false,
        message: 'Wpis dziennika nie został znaleziony'
      });
    }

    if (journal.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Brak uprawnień do tego wpisu'
      });
    }

    const allowedFields = [
      'content',
      'emotions',
      'emotionIntensity',
      'symbols',
      'themes',
      'insights',
      'bodyExperiences',
      'visualExperiences',
      'sessionRating',
      'wouldRecommend',
      'sharedWithFacilitator'
    ];

    const updateData = {};
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    await journal.update(updateData);

    res.status(200).json({
      success: true,
      data: journal
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete journal entry
// @route   DELETE /api/journals/:id
// @access  Private
exports.deleteJournal = async (req, res, next) => {
  try {
    const journal = await Journal.findByPk(req.params.id);

    if (!journal) {
      return res.status(404).json({
        success: false,
        message: 'Wpis dziennika nie został znaleziony'
      });
    }

    if (journal.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Brak uprawnień do tego wpisu'
      });
    }

    await journal.destroy();

    res.status(200).json({
      success: true,
      message: 'Wpis dziennika został usunięty'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get journal insights and patterns
// @route   GET /api/journals/insights/patterns
// @access  Private
exports.getJournalInsights = async (req, res, next) => {
  try {
    const journals = await Journal.findAll({
      where: { userId: req.user.id },
      attributes: ['emotions', 'themes', 'sessionRating', 'entryDate'],
      order: [['entryDate', 'DESC']]
    });

    // Analyze emotion patterns
    const emotionFrequency = {};
    const themeFrequency = {};

    journals.forEach(journal => {
      journal.emotions.forEach(emotion => {
        emotionFrequency[emotion] = (emotionFrequency[emotion] || 0) + 1;
      });

      journal.themes.forEach(theme => {
        themeFrequency[theme] = (themeFrequency[theme] || 0) + 1;
      });
    });

    const topEmotions = Object.entries(emotionFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const topThemes = Object.entries(themeFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    res.status(200).json({
      success: true,
      data: {
        totalEntries: journals.length,
        topEmotions,
        topThemes,
        recentEntries: journals.slice(0, 5)
      }
    });
  } catch (error) {
    next(error);
  }
};
