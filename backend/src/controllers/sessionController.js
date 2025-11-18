const { Session, User, GroupSession, Journal } = require('../models');
const { Op } = require('sequelize');

// @desc    Start a new breathwork session
// @route   POST /api/sessions
// @access  Private
exports.createSession = async (req, res, next) => {
  try {
    const {
      sessionType,
      intensity,
      duration,
      audioTrack,
      voiceGuidance,
      language,
      groupSessionId,
      location
    } = req.body;

    const session = await Session.create({
      userId: req.user.id,
      sessionType: sessionType || 'individual',
      intensity: intensity || 'medium',
      duration: duration || 60,
      audioTrack,
      voiceGuidance: voiceGuidance !== undefined ? voiceGuidance : true,
      language: language || req.user.language || 'pl',
      groupSessionId,
      location,
      status: 'in_progress',
      startTime: new Date()
    });

    res.status(201).json({
      success: true,
      data: session
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update session (for biometric data, status changes)
// @route   PUT /api/sessions/:id
// @access  Private
exports.updateSession = async (req, res, next) => {
  try {
    const session = await Session.findByPk(req.params.id);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Sesja nie została znaleziona'
      });
    }

    // Check if user owns this session or is facilitator
    if (session.userId !== req.user.id && session.facilitatorId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Brak uprawnień do tej sesji'
      });
    }

    const {
      status,
      biometricData,
      emergencyStopUsed,
      emergencyStopReason,
      actualDuration,
      notes
    } = req.body;

    const updateData = {};

    if (status) updateData.status = status;
    if (biometricData) updateData.biometricData = biometricData;
    if (emergencyStopUsed !== undefined) {
      updateData.emergencyStopUsed = emergencyStopUsed;
      updateData.emergencyStopTime = new Date();
    }
    if (emergencyStopReason) updateData.emergencyStopReason = emergencyStopReason;
    if (actualDuration) updateData.actualDuration = actualDuration;
    if (notes) updateData.notes = notes;

    if (status === 'completed' || status === 'interrupted') {
      updateData.endTime = new Date();
    }

    await session.update(updateData);

    res.status(200).json({
      success: true,
      data: session
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's sessions
// @route   GET /api/sessions
// @access  Private
exports.getSessions = async (req, res, next) => {
  try {
    const { status, startDate, endDate, limit = 20, offset = 0 } = req.query;

    const where = { userId: req.user.id };

    if (status) {
      where.status = status;
    }

    if (startDate || endDate) {
      where.startTime = {};
      if (startDate) where.startTime[Op.gte] = new Date(startDate);
      if (endDate) where.startTime[Op.lte] = new Date(endDate);
    }

    const sessions = await Session.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['startTime', 'DESC']],
      include: [
        {
          model: User,
          as: 'facilitator',
          attributes: ['id', 'firstName', 'lastName']
        },
        {
          model: GroupSession,
          as: 'groupSession',
          attributes: ['id', 'name', 'scheduledDate']
        },
        {
          model: Journal,
          as: 'journals',
          attributes: ['id', 'entryDate', 'sessionRating']
        }
      ]
    });

    res.status(200).json({
      success: true,
      count: sessions.count,
      data: sessions.rows
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single session
// @route   GET /api/sessions/:id
// @access  Private
exports.getSession = async (req, res, next) => {
  try {
    const session = await Session.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'participant',
          attributes: ['id', 'firstName', 'lastName']
        },
        {
          model: User,
          as: 'facilitator',
          attributes: ['id', 'firstName', 'lastName']
        },
        {
          model: GroupSession,
          as: 'groupSession'
        },
        {
          model: Journal,
          as: 'journals'
        }
      ]
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Sesja nie została znaleziona'
      });
    }

    // Check permissions
    if (session.userId !== req.user.id &&
        session.facilitatorId !== req.user.id &&
        req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Brak uprawnień do tej sesji'
      });
    }

    res.status(200).json({
      success: true,
      data: session
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get session statistics
// @route   GET /api/sessions/stats/summary
// @access  Private
exports.getSessionStats = async (req, res, next) => {
  try {
    const totalSessions = await Session.count({
      where: { userId: req.user.id }
    });

    const completedSessions = await Session.count({
      where: {
        userId: req.user.id,
        status: 'completed'
      }
    });

    const totalMinutes = await Session.sum('actualDuration', {
      where: {
        userId: req.user.id,
        status: 'completed'
      }
    }) || 0;

    const averageRating = await Journal.findOne({
      attributes: [
        [sequelize.fn('AVG', sequelize.col('sessionRating')), 'avgRating']
      ],
      where: {
        userId: req.user.id,
        sessionRating: { [Op.not]: null }
      },
      raw: true
    });

    const intensityBreakdown = await Session.findAll({
      attributes: [
        'intensity',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      where: { userId: req.user.id },
      group: ['intensity'],
      raw: true
    });

    res.status(200).json({
      success: true,
      data: {
        totalSessions,
        completedSessions,
        totalMinutes,
        totalHours: Math.round(totalMinutes / 60 * 10) / 10,
        averageRating: averageRating?.avgRating ? parseFloat(averageRating.avgRating).toFixed(1) : null,
        intensityBreakdown
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Emergency stop session
// @route   POST /api/sessions/:id/emergency-stop
// @access  Private
exports.emergencyStop = async (req, res, next) => {
  try {
    const session = await Session.findByPk(req.params.id);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Sesja nie została znaleziona'
      });
    }

    if (session.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Brak uprawnień do tej sesji'
      });
    }

    await session.update({
      status: 'interrupted',
      emergencyStopUsed: true,
      emergencyStopTime: new Date(),
      emergencyStopReason: req.body.reason || 'Emergency stop activated',
      endTime: new Date(),
      actualDuration: Math.floor((new Date() - session.startTime) / 60000)
    });

    // TODO: Send notification to emergency contact if configured
    // TODO: Alert facilitator if this is a group session

    res.status(200).json({
      success: true,
      message: 'Sesja została zatrzymana w trybie awaryjnym',
      data: session
    });
  } catch (error) {
    next(error);
  }
};
