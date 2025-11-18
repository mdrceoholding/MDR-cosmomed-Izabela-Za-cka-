const { GroupSession, Participant, User, Session, MedicalConsent } = require('../models');
const { Op } = require('sequelize');

// @desc    Create new group session
// @route   POST /api/facilitator/group-sessions
// @access  Private (Facilitator only)
exports.createGroupSession = async (req, res, next) => {
  try {
    const {
      name,
      description,
      sessionType,
      scheduledDate,
      duration,
      intensity,
      maxParticipants,
      location,
      playlist,
      language,
      price,
      preSessionMessage,
      postSessionMessage
    } = req.body;

    const groupSession = await GroupSession.create({
      facilitatorId: req.user.id,
      name,
      description,
      sessionType: sessionType || 'in_person',
      scheduledDate,
      duration: duration || 90,
      intensity: intensity || 'medium',
      maxParticipants: maxParticipants || 12,
      location,
      playlist,
      language: language || 'pl',
      price: price || 0,
      preSessionMessage,
      postSessionMessage,
      status: 'open_for_registration',
      requiresMedicalConsent: true,
      requiresPreSessionQuestionnaire: true
    });

    res.status(201).json({
      success: true,
      data: groupSession
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get facilitator's group sessions
// @route   GET /api/facilitator/group-sessions
// @access  Private (Facilitator only)
exports.getGroupSessions = async (req, res, next) => {
  try {
    const { status, startDate, endDate } = req.query;

    const where = { facilitatorId: req.user.id };

    if (status) {
      where.status = status;
    }

    if (startDate || endDate) {
      where.scheduledDate = {};
      if (startDate) where.scheduledDate[Op.gte] = new Date(startDate);
      if (endDate) where.scheduledDate[Op.lte] = new Date(endDate);
    }

    const groupSessions = await GroupSession.findAll({
      where,
      order: [['scheduledDate', 'DESC']],
      include: [
        {
          model: Participant,
          as: 'participants',
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'firstName', 'lastName', 'email', 'phone']
            },
            {
              model: MedicalConsent,
              as: 'medicalConsent',
              attributes: ['hasContraindications', 'isValid']
            }
          ]
        }
      ]
    });

    res.status(200).json({
      success: true,
      count: groupSessions.length,
      data: groupSessions
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single group session with participant details
// @route   GET /api/facilitator/group-sessions/:id
// @access  Private (Facilitator only)
exports.getGroupSession = async (req, res, next) => {
  try {
    const groupSession = await GroupSession.findByPk(req.params.id, {
      include: [
        {
          model: Participant,
          as: 'participants',
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'firstName', 'lastName', 'email', 'phone', 'emergencyContact']
            },
            {
              model: MedicalConsent,
              as: 'medicalConsent'
            }
          ]
        }
      ]
    });

    if (!groupSession) {
      return res.status(404).json({
        success: false,
        message: 'Sesja grupowa nie została znaleziona'
      });
    }

    if (groupSession.facilitatorId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Brak uprawnień do tej sesji'
      });
    }

    res.status(200).json({
      success: true,
      data: groupSession
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update group session
// @route   PUT /api/facilitator/group-sessions/:id
// @access  Private (Facilitator only)
exports.updateGroupSession = async (req, res, next) => {
  try {
    const groupSession = await GroupSession.findByPk(req.params.id);

    if (!groupSession) {
      return res.status(404).json({
        success: false,
        message: 'Sesja grupowa nie została znaleziona'
      });
    }

    if (groupSession.facilitatorId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Brak uprawnień do tej sesji'
      });
    }

    await groupSession.update(req.body);

    res.status(200).json({
      success: true,
      data: groupSession
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update participant status during session
// @route   PUT /api/facilitator/participants/:id
// @access  Private (Facilitator only)
exports.updateParticipantStatus = async (req, res, next) => {
  try {
    const participant = await Participant.findByPk(req.params.id, {
      include: [
        {
          model: GroupSession,
          as: 'groupSession'
        }
      ]
    });

    if (!participant) {
      return res.status(404).json({
        success: false,
        message: 'Uczestnik nie został znaleziony'
      });
    }

    if (participant.groupSession.facilitatorId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Brak uprawnień'
      });
    }

    const { currentStatus, needsAssistance, assistanceNote, facilitatorNotes } = req.body;

    await participant.update({
      currentStatus,
      needsAssistance,
      assistanceNote,
      facilitatorNotes
    });

    res.status(200).json({
      success: true,
      data: participant
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get participant dashboard (real-time monitoring)
// @route   GET /api/facilitator/group-sessions/:id/dashboard
// @access  Private (Facilitator only)
exports.getSessionDashboard = async (req, res, next) => {
  try {
    const groupSession = await GroupSession.findByPk(req.params.id, {
      include: [
        {
          model: Participant,
          as: 'participants',
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'firstName', 'lastName']
            }
          ]
        }
      ]
    });

    if (!groupSession) {
      return res.status(404).json({
        success: false,
        message: 'Sesja grupowa nie została znaleziona'
      });
    }

    if (groupSession.facilitatorId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Brak uprawnień'
      });
    }

    // Get real-time session data for each participant
    const activeSessions = await Session.findAll({
      where: {
        groupSessionId: groupSession.id,
        status: 'in_progress'
      },
      include: [
        {
          model: User,
          as: 'participant',
          attributes: ['id', 'firstName', 'lastName']
        }
      ]
    });

    const dashboard = {
      groupSession: {
        id: groupSession.id,
        name: groupSession.name,
        scheduledDate: groupSession.scheduledDate,
        status: groupSession.status
      },
      participants: groupSession.participants.map(p => ({
        id: p.id,
        user: p.user,
        currentStatus: p.currentStatus,
        needsAssistance: p.needsAssistance,
        assistanceNote: p.assistanceNote,
        biometricAlerts: p.biometricAlerts
      })),
      activeSessions: activeSessions.map(s => ({
        userId: s.userId,
        sessionId: s.id,
        startTime: s.startTime,
        biometricData: s.biometricData,
        emergencyStopUsed: s.emergencyStopUsed
      })),
      summary: {
        totalParticipants: groupSession.participants.length,
        activeNow: activeSessions.length,
        needingAssistance: groupSession.participants.filter(p => p.needsAssistance).length
      }
    };

    res.status(200).json({
      success: true,
      data: dashboard
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Send message to participants
// @route   POST /api/facilitator/group-sessions/:id/message
// @access  Private (Facilitator only)
exports.sendMessageToParticipants = async (req, res, next) => {
  try {
    const { message, recipientType } = req.body; // recipientType: 'all', 'specific', 'needs_assistance'

    const groupSession = await GroupSession.findByPk(req.params.id);

    if (!groupSession) {
      return res.status(404).json({
        success: false,
        message: 'Sesja grupowa nie została znaleziona'
      });
    }

    if (groupSession.facilitatorId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Brak uprawnień'
      });
    }

    // TODO: Implement WebSocket message sending
    // TODO: Implement email notifications

    res.status(200).json({
      success: true,
      message: 'Wiadomość została wysłana'
    });
  } catch (error) {
    next(error);
  }
};
