import React from 'react';
import { Search, Plus, LayoutDashboard, GraduationCap, X } from 'lucide-react';

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
    <header className="sticky top-0 z-30 w-full bg-white border-b-2 border-slate-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo - Sharp FTU Theme */}
        <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => setSearchQuery('')}>
          <div className="w-11 h-11 bg-rose-900 text-white font-black flex items-center justify-center border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.9)]">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-black tracking-tight text-slate-900">
                Uni<span className="text-rose-900">Find</span>
              </span>
              <span className="px-2 py-0.5 text-[10px] font-extrabold bg-rose-100 text-rose-900 border border-rose-300">
                FTU HANOI
              </span>
            </div>
            <p className="text-[11px] text-slate-600 font-bold hidden sm:block">
              Mạng xã hội Tìm đồ Thất lạc • 91 Chùa Láng
            </p>
          </div>
        </div>

        {/* Global Search Bar - Sharp */}
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
              className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border-2 border-slate-900 text-xs sm:text-sm text-slate-900 placeholder-slate-400 font-semibold focus:bg-white focus:border-rose-900 outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Action Buttons - Sharp */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Dashboard Button */}
          <button
            onClick={onOpenDashboard}
            className="relative flex items-center gap-2 px-3.5 py-2.5 bg-white text-slate-900 border-2 border-slate-900 hover:bg-slate-100 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.9)] active:translate-x-0.5 active:translate-y-0.5 text-xs sm:text-sm font-extrabold transition-all"
          >
            <LayoutDashboard className="w-4 h-4 text-rose-900" />
            <span className="hidden sm:inline">Tin của tôi</span>
            <span className="sm:hidden">Quản lý</span>

            {/* Badge Count */}
            {(myPostsCount > 0 || pendingClaimsCount > 0) && (
              <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[11px] font-bold text-white bg-rose-900 border border-slate-900">
                {pendingClaimsCount > 0 ? `${pendingClaimsCount} yêu cầu` : myPostsCount}
              </span>
            )}
          </button>

          {/* New Post Button */}
          <button
            onClick={onOpenCreateModal}
            className="flex items-center gap-2 px-4 py-2.5 bg-rose-900 hover:bg-rose-800 text-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.9)] active:translate-x-0.5 active:translate-y-0.5 text-xs sm:text-sm font-extrabold transition-all"
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
            className="w-full pl-10 pr-9 py-2 bg-slate-50 border-2 border-slate-900 text-xs text-slate-900 placeholder-slate-400 font-semibold"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
