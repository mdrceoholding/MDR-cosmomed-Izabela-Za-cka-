import React, { useEffect } from 'react';
import { useToast } from '../context/ToastContext';
import { ToastMessage } from '../types';

const Toast: React.FC = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
};

interface ToastItemProps {
  toast: ToastMessage;
  onRemove: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onRemove }) => {
  const [isExiting, setIsExiting] = React.useState(false);

  useEffect(() => {
    // Start exit animation before removal
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, (toast.duration || 4000) - 300);

    return () => clearTimeout(exitTimer);
  }, [toast.duration]);

  const getToastStyles = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-green-600 border-green-500';
      case 'error':
        return 'bg-red-600 border-red-500';
      case 'warning':
        return 'bg-yellow-600 border-yellow-500';
      case 'info':
        return 'bg-blue-600 border-blue-500';
      default:
        return 'bg-gray-600 border-gray-500';
    }
  };

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return 'fa-check-circle';
      case 'error':
        return 'fa-exclamation-circle';
      case 'warning':
        return 'fa-exclamation-triangle';
      case 'info':
        return 'fa-info-circle';
      default:
        return 'fa-bell';
    }
  };

  return (
    <div
      className={`
        ${getToastStyles()}
        border-l-4 rounded-lg shadow-lg p-4 min-w-[300px] max-w-md
        flex items-start gap-3
        transition-all duration-300 transform
        ${isExiting ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'}
      `}
    >
      <i className={`fas ${getIcon()} text-white text-xl mt-0.5`}></i>
      <div className="flex-1">
        <p className="text-white font-medium">{toast.message}</p>
      </div>
      <button
        onClick={() => onRemove(toast.id)}
        className="text-white hover:text-gray-200 transition-colors"
      >
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
};

export default Toast;
