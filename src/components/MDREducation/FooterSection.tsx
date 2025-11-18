import React from 'react';

const FooterSection: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">MDR EDUCATION™</h3>
            <p className="text-slate-400 text-sm mb-4">
              Europejski Instytut Nauki Regulacyjnej i Kompetencji Klinicznych
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-8 h-8 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition">
                <i className="fab fa-facebook-f text-sm"></i>
              </a>
              <a href="#" className="w-8 h-8 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition">
                <i className="fab fa-linkedin-in text-sm"></i>
              </a>
              <a href="#" className="w-8 h-8 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition">
                <i className="fab fa-twitter text-sm"></i>
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Kontakt</h4>
            <div className="space-y-2 text-sm">
              <p className="text-slate-400">ul. Sarmacka 4/70</p>
              <p className="text-slate-400">02-972 Warszawa</p>
              <a href="tel:+48501234567" className="text-blue-400 hover:text-blue-300 block">
                Tel: +48 501 234 567
              </a>
              <a href="mailto:compliance@mdr.edu.pl" className="text-blue-400 hover:text-blue-300 block">
                compliance@mdr.edu.pl
              </a>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h4 className="text-white font-semibold mb-4">Certyfikacje</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-slate-400">
                <i className="fas fa-check text-green-400"></i>
                MDR Ready™ Certified
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <i className="fas fa-check text-green-400"></i>
                IMPR™ Standard
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <i className="fas fa-check text-green-400"></i>
                Blockchain Verified
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <i className="fas fa-check text-green-400"></i>
                ISO Compliant
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Informacje prawne</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-slate-400 hover:text-blue-400">Polityka prywatności</a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-blue-400">Regulamin</a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-blue-400">RODO</a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-blue-400">Cookies</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm text-center md:text-left">
              © 2025 MDR EDUCATION™ - MDR PHILOSOPHY PSA. Wszystkie prawa zastrzeżone.
            </p>
            <div className="flex items-center gap-4 text-slate-500 text-sm">
              <span>KRS: 0001116165</span>
              <span>|</span>
              <span>NIP: 951-260-5993</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
