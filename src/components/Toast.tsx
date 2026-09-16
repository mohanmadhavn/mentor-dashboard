import React, { useEffect } from 'react';
import { useMentor } from '../context/MentorContext';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast, clearToast } = useMentor();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        clearToast();
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [toast, clearToast]);

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
    info: <Info className="w-5 h-5 text-secondary shrink-0" />
  };

  const bgColors = {
    success: 'bg-emerald-50 border-emerald-200 text-emerald-950',
    warning: 'bg-amber-50 border-amber-200 text-amber-950',
    info: 'bg-blue-50 border-blue-200 text-blue-950'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-in slide-in-from-bottom-5 fade-in duration-200">
      <div className={`p-4 rounded-xl shadow-lg border flex items-start space-x-3.5 ${bgColors[toast.type]}`}>
        {icons[toast.type]}
        <div className="flex-1 pr-2">
          <h4 className="text-xs font-heading font-bold">{toast.title}</h4>
          <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">{toast.message}</p>
        </div>
        <button
          onClick={clearToast}
          className="text-outline hover:text-on-surface transition-colors p-1"
          aria-label="Dismiss toast"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
