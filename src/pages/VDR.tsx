import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUpload,
  faFolder,
  faFile,
  faEye,
  faDownload,
  faShare,
  faLock,
  faUnlock,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { mockVDRDocuments } from '../data/mockData';
import { VDRDocument, DocumentCategory } from '../types';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const VDR: React.FC = () => {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<VDRDocument[]>(mockVDRDocuments);
  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<VDRDocument | null>(null);

  const categories = [
    { value: 'all', label: 'Wszystkie', icon: faFolder, color: 'text-blue-400' },
    { value: 'due_diligence', label: 'Due Diligence', icon: faFolder, color: 'text-purple-400' },
    { value: 'financial', label: 'Finansowe', icon: faFolder, color: 'text-green-400' },
    { value: 'legal', label: 'Prawne', icon: faFolder, color: 'text-red-400' },
    { value: 'technical', label: 'Techniczne', icon: faFolder, color: 'text-yellow-400' },
  ];

  const filteredDocuments = documents.filter((doc) => {
    if (selectedCategory !== 'all' && doc.category !== selectedCategory) return false;
    if (searchQuery && !doc.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (!user) return false;
    if (user.role === 'guest') return false; // Guest nie ma dostępu do VDR
    if (user.role === 'admin') return true;
    return doc.allowedUsers.includes(user.id);
  });

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleDownload = (doc: VDRDocument) => {
    toast.success(`Pobieranie: ${doc.name}`);
  };

  const handleShare = (doc: VDRDocument) => {
    toast.success('Link udostępniający został skopiowany');
  };

  const handleUpload = () => {
    toast.success('Plik został przesłany');
    setShowUploadModal(false);
  };

  const getCategoryColor = (category: DocumentCategory) => {
    const cat = categories.find(c => c.value === category);
    return cat?.color || 'text-slate-400';
  };

  const getAccessLevelBadge = (level: string) => {
    switch (level) {
      case 'public':
        return <span className="px-2 py-1 rounded text-xs bg-green-900 text-green-200">Publiczny</span>;
      case 'restricted':
        return <span className="px-2 py-1 rounded text-xs bg-yellow-900 text-yellow-200">Ograniczony</span>;
      case 'confidential':
        return <span className="px-2 py-1 rounded text-xs bg-red-900 text-red-200">Poufny</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Wirtualna Sala Danych</h1>
          <p className="text-slate-400">Bezpieczne repozytorium dokumentów dla inwestorów</p>
        </div>
        {user?.role !== 'viewer' && user?.role !== 'guest' && (
          <button onClick={() => setShowUploadModal(true)} className="btn-primary">
            <FontAwesomeIcon icon={faUpload} className="mr-2" />
            Prześlij plik
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <p className="text-slate-400 text-sm mb-1">Wszystkie dokumenty</p>
          <p className="text-2xl font-bold text-white">{documents.length}</p>
        </div>
        <div className="card">
          <p className="text-slate-400 text-sm mb-1">Całkowity rozmiar</p>
          <p className="text-2xl font-bold text-white">
            {formatFileSize(documents.reduce((sum, doc) => sum + doc.size, 0))}
          </p>
        </div>
        <div className="card">
          <p className="text-slate-400 text-sm mb-1">Dostępne dla mnie</p>
          <p className="text-2xl font-bold text-white">{filteredDocuments.length}</p>
        </div>
        <div className="card">
          <p className="text-slate-400 text-sm mb-1">Z watermarkiem</p>
          <p className="text-2xl font-bold text-white">
            {documents.filter(d => d.watermarked).length}
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Szukaj dokumentów..."
              className="input w-full pl-12"
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value as any)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all ${
              selectedCategory === cat.value
                ? 'border-blue-500 bg-blue-900 bg-opacity-20'
                : 'border-slate-700 hover:border-slate-600'
            }`}
          >
            <FontAwesomeIcon icon={cat.icon} className={cat.color} />
            <span className="text-white">{cat.label}</span>
            <span className="text-slate-400 text-sm">
              ({cat.value === 'all' ? documents.length : documents.filter(d => d.category === cat.value).length})
            </span>
          </button>
        ))}
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredDocuments.map((doc) => (
          <div key={doc.id} className="card hover:border-blue-500 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className={`text-3xl ${getCategoryColor(doc.category)}`}>
                  <FontAwesomeIcon icon={faFile} />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-1">{doc.name}</h3>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
                    <span>{formatFileSize(doc.size)}</span>
                    <span>•</span>
                    <span>{new Date(doc.uploadedAt).toLocaleDateString('pl-PL')}</span>
                    <span>•</span>
                    <span>{doc.uploadedBy}</span>
                    {doc.watermarked && (
                      <>
                        <span>•</span>
                        <span className="text-blue-400">
                          <FontAwesomeIcon icon={faLock} className="mr-1" />
                          Watermark
                        </span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    {getAccessLevelBadge(doc.accessLevel)}
                    <span className="px-2 py-1 rounded text-xs bg-slate-700 text-slate-300 capitalize">
                      {categories.find(c => c.value === doc.category)?.label}
                    </span>
                  </div>
                  {doc.accessLog.length > 0 && (
                    <p className="text-xs text-slate-500 mt-2">
                      Ostatnio oglądany przez {doc.accessLog[doc.accessLog.length - 1].userName}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedDocument(doc)}
                  className="text-blue-400 hover:text-blue-300 px-3 py-2"
                  title="Zobacz szczegóły"
                >
                  <FontAwesomeIcon icon={faEye} />
                </button>
                <button
                  onClick={() => handleDownload(doc)}
                  className="text-green-400 hover:text-green-300 px-3 py-2"
                  title="Pobierz"
                >
                  <FontAwesomeIcon icon={faDownload} />
                </button>
                {user?.role === 'admin' && (
                  <button
                    onClick={() => handleShare(doc)}
                    className="text-purple-400 hover:text-purple-300 px-3 py-2"
                    title="Udostępnij"
                  >
                    <FontAwesomeIcon icon={faShare} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <div className="card text-center py-12">
          <p className="text-slate-400">Brak dokumentów spełniających kryteria</p>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-white mb-4">Prześlij dokument</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-slate-300 mb-2">Kategoria</label>
                <select className="input w-full">
                  <option value="due_diligence">Due Diligence</option>
                  <option value="financial">Finansowe</option>
                  <option value="legal">Prawne</option>
                  <option value="technical">Techniczne</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-2">Poziom dostępu</label>
                <select className="input w-full">
                  <option value="public">Publiczny</option>
                  <option value="restricted">Ograniczony</option>
                  <option value="confidential">Poufny</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-2">Plik (max 10MB)</label>
                <input type="file" className="input w-full" />
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" id="watermark" className="w-5 h-5" />
                <label htmlFor="watermark" className="text-slate-300">
                  Dodaj watermark
                </label>
              </div>

              <div className="flex space-x-3">
                <button onClick={handleUpload} className="btn-primary flex-1">
                  Prześlij
                </button>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="btn-secondary flex-1"
                >
                  Anuluj
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Document Details Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">{selectedDocument.name}</h2>
              <button
                onClick={() => setSelectedDocument(null)}
                className="text-slate-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-400 text-sm">Rozmiar</p>
                  <p className="text-white">{formatFileSize(selectedDocument.size)}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Typ pliku</p>
                  <p className="text-white uppercase">{selectedDocument.fileType}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Przesłano</p>
                  <p className="text-white">
                    {new Date(selectedDocument.uploadedAt).toLocaleDateString('pl-PL')}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Przez</p>
                  <p className="text-white">{selectedDocument.uploadedBy}</p>
                </div>
              </div>

              <div className="border-t border-slate-700 pt-4">
                <h3 className="text-white font-semibold mb-3">Historia dostępu</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {selectedDocument.accessLog.map((log, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-slate-700 rounded">
                      <div>
                        <p className="text-white text-sm">{log.userName}</p>
                        <p className="text-slate-400 text-xs">
                          Oglądał: {new Date(log.viewedAt).toLocaleString('pl-PL')}
                        </p>
                        {log.downloadedAt && (
                          <p className="text-slate-400 text-xs">
                            Pobrał: {new Date(log.downloadedAt).toLocaleString('pl-PL')}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                  {selectedDocument.accessLog.length === 0 && (
                    <p className="text-slate-400 text-sm">Brak historii dostępu</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VDR;
