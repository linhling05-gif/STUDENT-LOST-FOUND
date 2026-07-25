import React from 'react';
import { Search, Plus, LayoutDashboard, Compass, GraduationCap, X } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenCreateModal: () => void;
  onOpenDashboard: () => void;
  myPostsCount: number;
  pendingClaimsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  onOpenCreateModal,
  onOpenDashboard,
  myPostsCount,
  pendingClaimsCount,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full glass-panel border-b border-rose-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo - FTU Rebranded */}
        <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => setSearchQuery('')}>
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-700 via-red-600 to-rose-900 flex items-center justify-center text-white shadow-md shadow-rose-900/25 ring-4 ring-rose-50">
            <GraduationCap className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-rose-950 via-red-900 to-rose-700 bg-clip-text text-transparent">
                Uni<span className="text-rose-600">Find</span>
              </span>
              <span className="px-2 py-0.5 text-[10px] font-extrabold bg-rose-100 text-rose-800 rounded-full border border-rose-200">
                FTU HANOI
              </span>
            </div>
            <p className="text-[11px] text-rose-900/70 font-semibold hidden sm:block">
              Hệ thống Tìm đồ Thất lạc • ĐH Ngoại thương Hà Nội
            </p>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-lg mx-2 hidden md:block">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo từ khóa (Ví dụ: Thẻ SV FTU, Nhà A, Căng tin, AirPods)..."
              className="w-full pl-10 pr-9 py-2.5 rounded-2xl glass-input text-sm text-slate-800 placeholder-slate-400 font-medium transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Dashboard Button */}
          <button
            onClick={onOpenDashboard}
            className="relative flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-white/80 hover:bg-white text-slate-700 hover:text-rose-900 border border-rose-100 shadow-sm text-xs sm:text-sm font-bold transition-all hover:shadow"
          >
            <LayoutDashboard className="w-4 h-4 text-rose-700" />
            <span className="hidden sm:inline">Bài của tôi</span>
            <span className="sm:hidden">Quản lý</span>

            {/* Badge Count */}
            {(myPostsCount > 0 || pendingClaimsCount > 0) && (
              <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[11px] font-bold text-white bg-rose-700 rounded-full">
                {pendingClaimsCount > 0 ? `${pendingClaimsCount} yêu cầu` : myPostsCount}
              </span>
            )}
          </button>

          {/* New Post Button */}
          <button
            onClick={onOpenCreateModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-rose-700 via-red-600 to-rose-800 text-white shadow-md shadow-rose-900/25 hover:shadow-lg hover:shadow-rose-900/35 hover:scale-[1.02] active:scale-[0.98] text-xs sm:text-sm font-bold transition-all"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Đăng bài mới</span>
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo từ khóa (Ví dụ: Thẻ SV FTU, Nhà A, Ví tiền)..."
            className="w-full pl-10 pr-9 py-2 rounded-xl glass-input text-xs text-slate-800 placeholder-slate-400 font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
