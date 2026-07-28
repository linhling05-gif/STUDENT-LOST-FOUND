import React from 'react';
import { ToastMessage } from '../types';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4">
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />,
          error: <AlertCircle className="w-5 h-5 text-rose-700 shrink-0" />,
          info: <Info className="w-5 h-5 text-indigo-700 shrink-0" />,
          warning: <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />,
        };

        const bgStyles = {
          success: 'bg-emerald-50 text-emerald-950 border-emerald-600',
          error: 'bg-rose-50 text-rose-950 border-rose-600',
          info: 'bg-indigo-50 text-indigo-950 border-indigo-600',
          warning: 'bg-amber-50 text-amber-950 border-amber-600',
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start justify-between p-4 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,0.9)] animate-fade-in transition-all ${bgStyles[toast.type]}`}
          >
            <div className="flex items-start gap-3">
              {icons[toast.type]}
              <div>
                <h4 className="font-extrabold text-sm leading-snug">{toast.title}</h4>
                <p className="text-xs font-semibold opacity-90 mt-0.5 leading-relaxed">{toast.message}</p>
              </div>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="text-slate-500 hover:text-slate-900 p-1 border border-slate-400 hover:bg-slate-200 transition-colors ml-2"
              aria-label="Đóng"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
