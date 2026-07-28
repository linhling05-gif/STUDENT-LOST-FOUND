import React from 'react';
import { HelpCircle, CheckCircle } from 'lucide-react';

interface QuickPostBoxProps {
  onOpenCreateModal: () => void;
}

export const QuickPostBox: React.FC<QuickPostBoxProps> = ({ onOpenCreateModal }) => {
  return (
    <div className="bg-white border-2 border-slate-900 p-4 shadow-[4px_4px_0px_0px_rgba(15,23,42,0.9)] mb-6 transition-all">
      <div className="flex items-center gap-3">
        {/* User avatar - sharp square */}
        <div className="w-11 h-11 bg-rose-900 text-white font-black text-sm flex items-center justify-center border-2 border-slate-900 shrink-0">
          FTU
        </div>

        {/* Prompt input bar */}
        <button
          onClick={onOpenCreateModal}
          className="flex-1 text-left px-4 py-3 bg-slate-50 hover:bg-rose-50/50 border border-slate-300 hover:border-rose-700 text-slate-500 text-xs sm:text-sm font-semibold transition-colors flex items-center justify-between group"
        >
          <span>Bạn vừa đánh mất hay nhặt được gì ở FTU?</span>
          <span className="text-xs font-bold text-rose-700 group-hover:translate-x-0.5 transition-transform hidden sm:inline">
            + Đăng tin ngay
          </span>
        </button>
      </div>

      {/* Quick Action Badges */}
      <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-between gap-2 text-xs font-bold">
        <button
          onClick={onOpenCreateModal}
          className="flex-1 py-2 px-3 bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-300 flex items-center justify-center gap-1.5 transition-colors"
        >
          <HelpCircle className="w-4 h-4 text-rose-700" />
          <span>Báo mất đồ (Lost)</span>
        </button>

        <button
          onClick={onOpenCreateModal}
          className="flex-1 py-2 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center justify-center gap-1.5 transition-colors"
        >
          <CheckCircle className="w-4 h-4 text-emerald-700" />
          <span>Báo nhặt được (Found)</span>
        </button>
      </div>
    </div>
  );
};
