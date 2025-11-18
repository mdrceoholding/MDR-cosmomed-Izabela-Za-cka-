import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { medicalConsentAPI } from '../services/api';
import type { MedicalConsent, Contraindications } from '../types';

export default function MedicalConsentPage() {
  const [existingConsent, setExistingConsent] = useState<MedicalConsent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [signature, setSignature] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { register, handleSubmit, watch } = useForm();

  const contraindications = watch('contraindications') || {};
  const hasAnyContraindication = Object.values(contraindications).some((v) => v === true);

  useEffect(() => {
    loadConsent();
  }, []);

  const loadConsent = async () => {
    try {
      const response = await medicalConsentAPI.get();
      setExistingConsent(response.data.data);
    } catch (error) {
      // No consent exists yet
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: any) => {
    if (!data.consentToParticipate || !data.consentToDataProcessing || !data.acknowledgedRisks) {
      toast.error('Wszystkie zgody są wymagane');
      return;
    }

    try {
      const payload: Partial<MedicalConsent> = {
        medicalHistory: data.medicalHistory,
        contraindications: {
          pregnancy: data.contraindications?.pregnancy || false,
          epilepsy: data.contraindications?.epilepsy || false,
          cardiovascularDisease: data.contraindications?.cardiovascularDisease || false,
          highBloodPressure: data.contraindications?.highBloodPressure || false,
          psychoticDisorders: data.contraindications?.psychoticDisorders || false,
          recentSurgery: data.contraindications?.recentSurgery || false,
          glaucoma: data.contraindications?.glaucoma || false,
          severeAsthma: data.contraindications?.severeAsthma || false,
          other: data.contraindications?.other,
        },
        medications: data.medications,
        consentToParticipate: data.consentToParticipate,
        consentToDataProcessing: data.consentToDataProcessing,
        consentToEmergencyContact: data.consentToEmergencyContact,
        acknowledgedRisks: data.acknowledgedRisks,
        signatureData: signature,
      };

      await medicalConsentAPI.create(payload);
      toast.success('Zgoda medyczna zapisana pomyślnie!');
      loadConsent();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Błąd podczas zapisywania zgody');
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
    </div>;
  }

  if (existingConsent && existingConsent.isValid) {
    return (
      <div className="section">
        <div className="container-custom max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-elevated"
          >
            <div className="flex items-center space-x-3 mb-6">
              <CheckCircleIcon className="h-12 w-12 text-green-400" />
              <div>
                <h1 className="text-2xl font-bold text-dark-text">
                  Zgoda medyczna aktywna
                </h1>
                <p className="text-dark-text-secondary">
                  Ważna do: {new Date(existingConsent.expiryDate!).toLocaleDateString('pl-PL')}
                </p>
              </div>
            </div>

            {existingConsent.hasContraindications && (
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg mb-6">
                <div className="flex items-start space-x-3">
                  <ExclamationTriangleIcon className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-yellow-400 mb-1">
                      Wykryto przeciwwskazania
                    </p>
                    <p className="text-sm text-dark-text-secondary">
                      Skonsultuj się z lekarzem przed kontynuowaniem praktyki.
                      Jeśli stan zdrowia się zmienił, zaktualizuj formularz.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="p-4 bg-dark-elevated rounded-lg">
                <p className="text-sm font-medium text-dark-text mb-2">Status:</p>
                <p className="text-dark-text-secondary">
                  ✓ Zgoda na udział w sesjach<br />
                  ✓ Zgoda na przetwarzanie danych (RODO)<br />
                  ✓ Potwierdzenie świadomości ryzyka
                </p>
              </div>

              {existingConsent.pdfUrl && (
                <a
                  href={existingConsent.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline w-full block text-center"
                >
                  Pobierz PDF zgody
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container-custom max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-elevated"
        >
          <h1 className="text-3xl font-bold text-gradient mb-2">
            Zgoda medyczna i RODO
          </h1>
          <p className="text-dark-text-secondary mb-8">
            Przed rozpoczęciem praktyki holotropowego oddechu wymagane jest wypełnienie
            formularza medycznego zgodnie z polskimi standardami RODO
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Warning */}
            <div className="p-6 bg-red-500/10 border-2 border-red-500/30 rounded-xl">
              <div className="flex items-start space-x-3">
                <ExclamationTriangleIcon className="h-8 w-8 text-red-400 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-red-400 mb-2">
                    Ważne informacje bezpieczeństwa
                  </h3>
                  <p className="text-sm text-dark-text-secondary mb-4">
                    Holotropowy oddech jest intensywną praktyką, która może prowadzić
                    do zmienionych stanów świadomości. Nie praktykuj, jeśli masz
                    którekolwiek z poniższych przeciwwskazań.
                  </p>
                </div>
              </div>
            </div>

            {/* Contraindications */}
            <div>
              <h3 className="text-xl font-bold text-dark-text mb-4">
                Przeciwwskazania
              </h3>
              <div className="space-y-3">
                {[
                  { key: 'pregnancy', label: 'Ciąża' },
                  { key: 'epilepsy', label: 'Epilepsja lub historia napadów' },
                  { key: 'cardiovascularDisease', label: 'Choroby sercowo-naczyniowe' },
                  { key: 'highBloodPressure', label: 'Nadciśnienie tętnicze' },
                  { key: 'psychoticDisorders', label: 'Zaburzenia psychotyczne (schizofrenia, psychoza)' },
                  { key: 'recentSurgery', label: 'Niedawna operacja chirurgiczna' },
                  { key: 'glaucoma', label: 'Jaskra' },
                  { key: 'severeAsthma', label: 'Ciężka astma' },
                ].map((item) => (
                  <label key={item.key} className="flex items-center space-x-3 p-3 bg-dark-elevated rounded-lg cursor-pointer hover:bg-dark-border transition-colors">
                    <input
                      type="checkbox"
                      {...register(`contraindications.${item.key}`)}
                      className="h-5 w-5 text-primary-600 focus:ring-primary-500 border-dark-border rounded"
                    />
                    <span className="text-dark-text">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {hasAnyContraindication && (
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <p className="text-yellow-400 font-medium">
                  ⚠️ Wykryto przeciwwskazania - zalecana konsultacja z lekarzem przed praktyką
                </p>
              </div>
            )}

            {/* Medical History */}
            <div>
              <label className="block text-sm font-medium text-dark-text mb-2">
                Historia medyczna (opcjonalnie)
              </label>
              <textarea
                {...register('medicalHistory')}
                rows={4}
                className="input-primary"
                placeholder="Opisz istotne problemy zdrowotne, które powinniśmy znać..."
              />
            </div>

            {/* Medications */}
            <div>
              <label className="block text-sm font-medium text-dark-text mb-2">
                Przyjmowane leki (opcjonalnie)
              </label>
              <textarea
                {...register('medications')}
                rows={3}
                className="input-primary"
                placeholder="Wymień leki, które obecnie przyjmujesz..."
              />
            </div>

            {/* Consents */}
            <div className="space-y-4 p-6 bg-dark-elevated rounded-lg">
              <h3 className="text-lg font-bold text-dark-text mb-4">Zgody</h3>

              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  {...register('consentToParticipate', { required: true })}
                  className="mt-1 h-5 w-5 text-primary-600"
                />
                <span className="text-sm text-dark-text">
                  Wyrażam zgodę na udział w sesjach holotropowego oddechu i potwierdzam,
                  że jestem świadomy ryzyka związanego z tą praktyką
                </span>
              </label>

              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  {...register('consentToDataProcessing', { required: true })}
                  className="mt-1 h-5 w-5 text-primary-600"
                />
                <span className="text-sm text-dark-text">
                  Wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z RODO
                </span>
              </label>

              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  {...register('consentToEmergencyContact')}
                  className="mt-1 h-5 w-5 text-primary-600"
                />
                <span className="text-sm text-dark-text">
                  Wyrażam zgodę na kontakt w sytuacji awaryjnej
                </span>
              </label>

              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  {...register('acknowledgedRisks', { required: true })}
                  className="mt-1 h-5 w-5 text-primary-600"
                />
                <span className="text-sm text-dark-text">
                  Potwierdzam, że przeczytałem i zrozumiałem wszystkie informacje
                  dotyczące przeciwwskazań i ryzyka
                </span>
              </label>
            </div>

            <button type="submit" className="btn-primary w-full text-lg">
              Zapisz zgodę medyczną
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
