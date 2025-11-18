import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  PlayIcon,
  PauseIcon,
  StopIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/solid';
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline';
import BreathingCircle from '../components/BreathingCircle';
import { sessionAPI } from '../services/api';
import { useSessionStore, useUIStore, useAuthStore } from '../services/store';
import { BREATHING_PATTERNS } from '../types';
import type { Session } from '../types';

type Phase = 'inhale' | 'hold' | 'exhale';

export default function SessionPage() {
  const { user } = useAuthStore();
  const { currentSession, startSession, updateSession, endSession } = useSessionStore();
  const { setDoNotDisturb } = useUIStore();

  const [isConfiguring, setIsConfiguring] = useState(true);
  const [intensity, setIntensity] = useState<'gentle' | 'medium' | 'deep'>('medium');
  const [duration, setDuration] = useState(60);
  const [voiceGuidance, setVoiceGuidance] = useState(true);
  const [language, setLanguage] = useState<'pl' | 'en'>(user?.language || 'pl');

  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<Phase>('inhale');
  const [cycleCount, setCycleCount] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);

  const audioRef = useRef<HTMLAudioElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const pattern = BREATHING_PATTERNS[intensity];

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setDoNotDisturb(false);
    };
  }, []);

  const handleStartSession = async () => {
    try {
      const response = await sessionAPI.create({
        sessionType: 'individual',
        intensity,
        duration,
        voiceGuidance,
        language,
        status: 'in_progress',
      });

      const session: Session = response.data.data;
      startSession(session);
      setIsConfiguring(false);
      setIsSessionActive(true);
      setDoNotDisturb(true);
      setSessionStartTime(new Date());
      setTimeRemaining(duration * 60);

      // Start session timer
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            handleCompleteSession();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      toast.success('Sesja rozpoczęta - oddychaj głęboko');
    } catch (error) {
      toast.error('Błąd podczas uruchamiania sesji');
    }
  };

  const handlePauseSession = () => {
    setIsPaused(!isPaused);
    if (!isPaused && timerRef.current) {
      clearInterval(timerRef.current);
    } else {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            handleCompleteSession();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const handleCompleteSession = async () => {
    if (!currentSession) return;

    try {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      await sessionAPI.update(currentSession.id, {
        status: 'completed',
        actualDuration: Math.floor((Date.now() - new Date(currentSession.startTime).getTime()) / 60000),
      });

      endSession();
      setIsSessionActive(false);
      setDoNotDisturb(false);
      toast.success('Sesja ukończona! Świetna robota 🎉');
      setIsConfiguring(true);
    } catch (error) {
      toast.error('Błąd podczas kończenia sesji');
    }
  };

  const handleEmergencyStop = async () => {
    if (!currentSession) return;

    const confirmed = window.confirm(
      'Czy na pewno chcesz przerwać sesję w trybie awaryjnym? Zostaną powiadomione służby pomocowe.'
    );

    if (!confirmed) return;

    try {
      await sessionAPI.emergencyStop(currentSession.id, 'User initiated emergency stop');
      endSession();
      setIsSessionActive(false);
      setDoNotDisturb(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      toast.error('Sesja przerwana - SOS aktywowany');
      setIsConfiguring(true);
    } catch (error) {
      toast.error('Błąd podczas zatrzymywania sesji');
    }
  };

  const handlePhaseComplete = () => {
    if (isPaused) return;

    setCycleCount((prev) => prev + 1);

    // Cycle through breathing phases
    if (currentPhase === 'inhale') {
      setCurrentPhase('hold');
    } else if (currentPhase === 'hold') {
      setCurrentPhase('exhale');
    } else {
      setCurrentPhase('inhale');
    }
  };

  const getPhaseDuration = (): number => {
    switch (currentPhase) {
      case 'inhale':
        return pattern.inhale;
      case 'hold':
        return pattern.hold;
      case 'exhale':
        return pattern.exhale;
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isConfiguring) {
    return (
      <div className="section">
        <div className="container-custom max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-elevated"
          >
            <h1 className="text-3xl font-bold text-gradient mb-6">
              Nowa sesja oddechowa
            </h1>

            <div className="space-y-6">
              {/* Intensity */}
              <div>
                <label className="block text-sm font-medium text-dark-text mb-3">
                  Intensywność
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {(['gentle', 'medium', 'deep'] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => setIntensity(level)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        intensity === level
                          ? 'border-primary-500 bg-primary-500/20'
                          : 'border-dark-border hover:border-primary-500/50'
                      }`}
                    >
                      <div className="text-center">
                        <p className="font-medium text-dark-text capitalize">
                          {level === 'gentle'
                            ? 'Łagodna'
                            : level === 'medium'
                            ? 'Średnia'
                            : 'Głęboka'}
                        </p>
                        <p className="text-xs text-dark-text-secondary mt-1">
                          {BREATHING_PATTERNS[level].description}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-dark-text mb-3">
                  Czas trwania: {duration} min
                </label>
                <input
                  type="range"
                  min="30"
                  max="120"
                  step="30"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                  className="w-full h-2 bg-dark-elevated rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-dark-text-secondary mt-2">
                  <span>30 min</span>
                  <span>60 min</span>
                  <span>90 min</span>
                  <span>120 min</span>
                </div>
              </div>

              {/* Voice Guidance */}
              <div className="flex items-center justify-between p-4 bg-dark-elevated rounded-lg">
                <div>
                  <p className="font-medium text-dark-text">Przewodnictwo głosowe</p>
                  <p className="text-sm text-dark-text-secondary">
                    Instrukcje głosowe podczas sesji
                  </p>
                </div>
                <button
                  onClick={() => setVoiceGuidance(!voiceGuidance)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    voiceGuidance ? 'bg-primary-600' : 'bg-dark-border'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      voiceGuidance ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Language */}
              <div>
                <label className="block text-sm font-medium text-dark-text mb-3">
                  Język przewodnictwa
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setLanguage('pl')}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      language === 'pl'
                        ? 'border-primary-500 bg-primary-500/20'
                        : 'border-dark-border'
                    }`}
                  >
                    Polski
                  </button>
                  <button
                    onClick={() => setLanguage('en')}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      language === 'en'
                        ? 'border-primary-500 bg-primary-500/20'
                        : 'border-dark-border'
                    }`}
                  >
                    English
                  </button>
                </div>
              </div>

              <button onClick={handleStartSession} className="btn-primary w-full text-lg">
                <PlayIcon className="h-6 w-6 inline mr-2" />
                Rozpocznij sesję
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-primary flex flex-col items-center justify-center p-4">
      <AnimatePresence>
        {isSessionActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-4xl"
          >
            {/* Timer */}
            <div className="text-center mb-8">
              <div className="text-5xl font-bold text-gradient mb-2">
                {formatTime(timeRemaining)}
              </div>
              <div className="text-dark-text-secondary">
                Cykl {cycleCount} • {pattern.name}
              </div>
            </div>

            {/* Breathing Circle */}
            <div className="mb-12">
              <BreathingCircle
                phase={currentPhase}
                duration={getPhaseDuration()}
                onPhaseComplete={handlePhaseComplete}
              />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={handlePauseSession}
                className="btn-secondary p-4 rounded-full"
              >
                {isPaused ? (
                  <PlayIcon className="h-8 w-8" />
                ) : (
                  <PauseIcon className="h-8 w-8" />
                )}
              </button>

              <button
                onClick={() => setVoiceGuidance(!voiceGuidance)}
                className="btn-secondary p-4 rounded-full"
              >
                {voiceGuidance ? (
                  <SpeakerWaveIcon className="h-8 w-8" />
                ) : (
                  <SpeakerXMarkIcon className="h-8 w-8" />
                )}
              </button>

              <button onClick={handleCompleteSession} className="btn-primary p-4 rounded-full">
                <StopIcon className="h-8 w-8" />
              </button>

              <button onClick={handleEmergencyStop} className="btn-danger p-4 rounded-full">
                <ExclamationTriangleIcon className="h-8 w-8" />
              </button>
            </div>

            <div className="text-center mt-8 text-sm text-dark-text-secondary">
              <p>
                Przycisk SOS przerywa sesję i powiadamia kontakt awaryjny
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
