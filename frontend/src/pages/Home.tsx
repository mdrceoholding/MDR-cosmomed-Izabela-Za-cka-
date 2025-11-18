import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HeartIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

export default function Home() {
  const features = [
    {
      icon: HeartIcon,
      title: 'Personalizowane ścieżki oddechowe',
      description: 'Wybierz intensywność i czas trwania sesji dopasowane do Twojego poziomu doświadczenia',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Bezpieczeństwo i RODO',
      description: 'Wszystkie dane medyczne szyfrowane end-to-end, zgodnie z polskimi standardami',
    },
    {
      icon: UserGroupIcon,
      title: 'Sesje grupowe i indywidualne',
      description: 'Dołącz do sesji prowadzonych przez certyfikowanych facilitatorów',
    },
    {
      icon: ChartBarIcon,
      title: 'Dziennik doświadczeń',
      description: 'Rejestruj swoje wglądy, emocje i postępy w prywatnym dzienniku',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-primary">
      {/* Hero Section */}
      <div className="container-custom section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-gradient">
            Holotropic Breathwork
          </h1>
          <p className="text-xl md:text-2xl text-dark-text-secondary max-w-3xl mx-auto">
            Odkryj głębię swojej świadomości przez starożytną praktykę oddechu,
            wspieraną nowoczesną technologią
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link to="/register" className="btn-primary text-lg px-8 py-4">
              Rozpocznij swoją podróż
            </Link>
            <Link to="/login" className="btn-outline text-lg px-8 py-4">
              Zaloguj się
            </Link>
          </div>
        </motion.div>

        {/* Animated breathing circle */}
        <motion.div
          className="mt-20 flex justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <div className="relative">
            <motion.div
              className="w-64 h-64 rounded-full bg-gradient-to-br from-primary-600 to-gold-400 shadow-2xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute inset-0 w-64 h-64 rounded-full border-4 border-primary-500/30"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="container-custom section">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-dark-text mb-12">
          Funkcje aplikacji
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="p-3 bg-primary-600/20 rounded-xl">
                      <Icon className="h-8 w-8 text-primary-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-dark-text mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-dark-text-secondary">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Disclaimer Section */}
      <div className="container-custom section">
        <div className="card-elevated max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gold-400 mb-4">
            ⚠️ Ważne informacje
          </h3>
          <div className="space-y-3 text-dark-text-secondary">
            <p>
              Holotropowy oddech to intensywna praktyka, która może prowadzić do
              zmienionych stanów świadomości. Przed rozpoczęciem:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Skonsultuj się z lekarzem jeśli masz problemy zdrowotne</li>
              <li>Nie praktykuj w ciąży ani przy chorobach psychicznych</li>
              <li>Zawsze rozpoczynaj od łagodnych sesji</li>
              <li>W przypadku dyskomfortu natychmiast przerwij sesję</li>
            </ul>
            <p className="text-sm pt-4">
              Aplikacja nie zastępuje profesjonalnej opieki medycznej ani
              psychoterapii. W przypadku poważnych problemów zdrowotnych
              skonsultuj się ze specjalistą.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-dark-border mt-20">
        <div className="container-custom py-8">
          <p className="text-center text-dark-text-secondary">
            © 2024 Holotropic Breathwork. Wszelkie prawa zastrzeżone. | Zgodność z RODO
          </p>
        </div>
      </footer>
    </div>
  );
}
