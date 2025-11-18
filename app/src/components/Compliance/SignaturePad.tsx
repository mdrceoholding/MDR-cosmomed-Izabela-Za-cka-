import React, { useRef, useEffect, useState } from 'react';
import SignaturePadLib from 'signature_pad';
import { X, Check } from 'lucide-react';

interface SignaturePadProps {
  onSave: (signature: string) => void;
  onCancel: () => void;
}

export const SignaturePad: React.FC<SignaturePadProps> = ({ onSave, onCancel }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [signaturePad, setSignaturePad] = useState<SignaturePadLib | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const pad = new SignaturePadLib(canvasRef.current, {
        backgroundColor: 'rgb(255, 255, 255)',
        penColor: 'rgb(0, 0, 0)',
      });
      setSignaturePad(pad);

      return () => {
        pad.off();
      };
    }
  }, []);

  const handleClear = () => {
    signaturePad?.clear();
  };

  const handleSave = () => {
    if (signaturePad && !signaturePad.isEmpty()) {
      const dataURL = signaturePad.toDataURL();
      onSave(dataURL);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-lg w-full mx-4">
        <h3 className="text-lg font-semibold mb-4">Podpis</h3>
        <div className="border-2 border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden mb-4">
          <canvas
            ref={canvasRef}
            width={500}
            height={200}
            className="w-full touch-none"
          />
        </div>
        <div className="flex gap-2 justify-end">
          <button
            onClick={handleClear}
            className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            Wyczyść
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors flex items-center gap-2"
          >
            <X size={18} />
            Anuluj
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-2"
          >
            <Check size={18} />
            Zapisz
          </button>
        </div>
      </div>
    </div>
  );
};
