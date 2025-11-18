import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { journalAPI } from '../services/api';
import { EMOTION_OPTIONS, THEME_OPTIONS } from '../types';
import type { Journal } from '../types';

export default function JournalPage() {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    loadJournals();
  }, []);

  const loadJournals = async () => {
    try {
      const response = await journalAPI.getAll({ limit: 50 });
      setJournals(response.data.data);
    } catch (error) {
      toast.error('Błąd podczas ładowania dziennika');
    }
  };

  const onSubmit = async (data: any) => {
    try {
      await journalAPI.create({
        content: data.content,
        insights: data.insights,
        bodyExperiences: data.bodyExperiences,
        visualExperiences: data.visualExperiences,
        emotions: selectedEmotions,
        themes: selectedThemes,
        sessionRating: data.sessionRating ? parseInt(data.sessionRating) : undefined,
        entryType: 'text',
      });

      toast.success('Wpis zapisany!');
      reset();
      setSelectedEmotions([]);
      setSelectedThemes([]);
      setIsCreating(false);
      loadJournals();
    } catch (error) {
      toast.error('Błąd podczas zapisywania wpisu');
    }
  };

  const handleDeleteJournal = async (id: string) => {
    if (!window.confirm('Czy na pewno chcesz usunąć ten wpis?')) return;

    try {
      await journalAPI.delete(id);
      toast.success('Wpis usunięty');
      loadJournals();
    } catch (error) {
      toast.error('Błąd podczas usuwania wpisu');
    }
  };

  const toggleEmotion = (emotion: string) => {
    setSelectedEmotions((prev) =>
      prev.includes(emotion) ? prev.filter((e) => e !== emotion) : [...prev, emotion]
    );
  };

  const toggleTheme = (theme: string) => {
    setSelectedThemes((prev) =>
      prev.includes(theme) ? prev.filter((t) => t !== theme) : [...prev, theme]
    );
  };

  return (
    <div className="section">
      <div className="container-custom max-w-5xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-dark-text">
            Dziennik doświadczeń
          </h1>
          <button onClick={() => setIsCreating(!isCreating)} className="btn-primary">
            <PlusIcon className="h-5 w-5 inline mr-2" />
            Nowy wpis
          </button>
        </div>

        {/* New Entry Form */}
        {isCreating && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="card-elevated mb-8"
          >
            <h2 className="text-xl font-bold text-dark-text mb-6">
              Nowy wpis w dzienniku
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-dark-text mb-2">
                  Główne doświadczenie
                </label>
                <textarea
                  {...register('content')}
                  rows={5}
                  className="input-primary"
                  placeholder="Opisz swoje doświadczenie podczas sesji..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-text mb-3">
                  Emocje
                </label>
                <div className="flex flex-wrap gap-2">
                  {EMOTION_OPTIONS.map((emotion) => (
                    <button
                      key={emotion}
                      type="button"
                      onClick={() => toggleEmotion(emotion)}
                      className={`px-4 py-2 rounded-full text-sm transition-all ${
                        selectedEmotions.includes(emotion)
                          ? 'bg-primary-600 text-white'
                          : 'bg-dark-elevated text-dark-text-secondary hover:bg-dark-border'
                      }`}
                    >
                      {emotion}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-text mb-3">
                  Tematy
                </label>
                <div className="flex flex-wrap gap-2">
                  {THEME_OPTIONS.map((theme) => (
                    <button
                      key={theme}
                      type="button"
                      onClick={() => toggleTheme(theme)}
                      className={`px-4 py-2 rounded-full text-sm transition-all ${
                        selectedThemes.includes(theme)
                          ? 'bg-gold-500 text-white'
                          : 'bg-dark-elevated text-dark-text-secondary hover:bg-dark-border'
                      }`}
                    >
                      {theme}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-dark-text mb-2">
                    Doświadczenia cielesne
                  </label>
                  <textarea
                    {...register('bodyExperiences')}
                    rows={3}
                    className="input-primary"
                    placeholder="Uczucia, drgania, temperatura..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-text mb-2">
                    Doświadczenia wizualne
                  </label>
                  <textarea
                    {...register('visualExperiences')}
                    rows={3}
                    className="input-primary"
                    placeholder="Obrazy, wizje, kolory..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-text mb-2">
                  Wglądy i przemyślenia
                </label>
                <textarea
                  {...register('insights')}
                  rows={4}
                  className="input-primary"
                  placeholder="Czego się nauczyłeś? Jakie otrzymałeś przesłanie?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-text mb-2">
                  Ocena sesji (1-10)
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  {...register('sessionRating')}
                  className="input-primary"
                />
              </div>

              <div className="flex space-x-4">
                <button type="submit" className="btn-primary flex-1">
                  Zapisz wpis
                </button>
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="btn-secondary flex-1"
                >
                  Anuluj
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Journal Entries */}
        <div className="space-y-6">
          {journals.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-dark-text-secondary">
                Nie masz jeszcze żadnych wpisów w dzienniku
              </p>
            </div>
          ) : (
            journals.map((journal) => (
              <motion.div
                key={journal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-dark-text-secondary">
                      {new Date(journal.entryDate).toLocaleDateString('pl-PL', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                    {journal.sessionRating && (
                      <div className="mt-1">
                        <span className="text-gold-400 font-medium">
                          ★ {journal.sessionRating}/10
                        </span>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteJournal(journal.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>

                {journal.content && (
                  <p className="text-dark-text mb-4">{journal.content}</p>
                )}

                {journal.emotions.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs text-dark-text-secondary mb-2">Emocje:</p>
                    <div className="flex flex-wrap gap-2">
                      {journal.emotions.map((emotion) => (
                        <span
                          key={emotion}
                          className="px-3 py-1 bg-primary-600/20 text-primary-400 rounded-full text-xs"
                        >
                          {emotion}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {journal.themes.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs text-dark-text-secondary mb-2">Tematy:</p>
                    <div className="flex flex-wrap gap-2">
                      {journal.themes.map((theme) => (
                        <span
                          key={theme}
                          className="px-3 py-1 bg-gold-500/20 text-gold-400 rounded-full text-xs"
                        >
                          {theme}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {journal.insights && (
                  <div className="mt-4 p-4 bg-dark-elevated rounded-lg">
                    <p className="text-xs text-dark-text-secondary mb-1">Wglądy:</p>
                    <p className="text-sm text-dark-text">{journal.insights}</p>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
