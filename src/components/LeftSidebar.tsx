import React from 'react';
import { Newspaper, User, CheckCircle2, MapPin, Building, GraduationCap } from 'lucide-react';

interface LeftSidebarProps {
  activeTab: 'all' | 'lost' | 'found' | 'resolved';
  setActiveTab: (tab: 'all' | 'lost' | 'found' | 'resolved') => void;
  selectedLocation: string;
  setSelectedLocation: (loc: string) => void;
  onOpenDashboard: () => void;
  myPostsCount: number;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  activeTab,
  setActiveTab,
  selectedLocation,
  setSelectedLocation,
  onOpenDashboard,
  myPostsCount,
}) => {
  const ftuLocations = ['Tòa A', 'Tòa B', 'Thư viện FTU', 'Căng tin FTU', 'Nhà xe', 'Sân nhà D'];

  return (
    <aside className="space-y-6">
      {/* FTU Student Profile Card */}
      <div className="bg-white border-2 border-slate-900 p-5 shadow-[4px_4px_0px_0px_rgba(15,23,42,0.9)]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-rose-900 text-white font-black text-lg flex items-center justify-center border-2 border-slate-900 shrink-0">
            FTU
          </div>
          <div>
            <div className="flex items-center gap-1">
              <h3 className="font-extrabold text-slate-900 text-sm">Sinh viên FTU</h3>
              <GraduationCap className="w-4 h-4 text-rose-700" />
            </div>
            <p className="text-xs text-slate-500 font-medium">91 Chùa Láng, Hà Nội</p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-200 grid grid-cols-2 gap-2 text-center">
          <div className="p-2 bg-slate-50 border border-slate-200">
            <span className="block text-xs text-slate-500 font-semibold">Bài của tôi</span>
            <span className="text-base font-black text-rose-900">{myPostsCount}</span>
          </div>
          <div className="p-2 bg-slate-50 border border-slate-200">
            <span className="block text-xs text-slate-500 font-semibold">Trạng thái</span>
            <span className="text-xs font-bold text-emerald-700">Hoạt động</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Menu */}
      <div className="bg-white border-2 border-slate-900 p-4 shadow-[4px_4px_0px_0px_rgba(15,23,42,0.9)]">
        <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">
          Bảng tin Social
        </h4>

        <nav className="space-y-1 text-xs font-bold">
          <button
            onClick={() => setActiveTab('all')}
            className={`w-full text-left px-3 py-2.5 flex items-center justify-between transition-colors border ${
              activeTab === 'all'
                ? 'bg-rose-900 text-white border-rose-900'
                : 'bg-white text-slate-700 border-transparent hover:bg-slate-100 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <Newspaper className="w-4 h-4" />
              <span>Tất cả bài viết</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('lost')}
            className={`w-full text-left px-3 py-2.5 flex items-center justify-between transition-colors border ${
              activeTab === 'lost'
                ? 'bg-rose-900 text-white border-rose-900'
                : 'bg-white text-slate-700 border-transparent hover:bg-slate-100 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-rose-600 border border-slate-900" />
              <span>Tin báo mất (Lost)</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('found')}
            className={`w-full text-left px-3 py-2.5 flex items-center justify-between transition-colors border ${
              activeTab === 'found'
                ? 'bg-rose-900 text-white border-rose-900'
                : 'bg-white text-slate-700 border-transparent hover:bg-slate-100 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-emerald-600 border border-slate-900" />
              <span>Tin nhặt được (Found)</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('resolved')}
            className={`w-full text-left px-3 py-2.5 flex items-center justify-between transition-colors border ${
              activeTab === 'resolved'
                ? 'bg-rose-900 text-white border-rose-900'
                : 'bg-white text-slate-700 border-transparent hover:bg-slate-100 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Đã trả đồ thành công</span>
            </div>
          </button>

          <button
            onClick={onOpenDashboard}
            className="w-full text-left px-3 py-2.5 flex items-center justify-between transition-colors border bg-slate-50 hover:bg-rose-50 text-slate-800 border-slate-200 mt-2"
          >
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-rose-700" />
              <span>Quản lý tin đăng của tôi</span>
            </div>
            {myPostsCount > 0 && (
              <span className="px-1.5 py-0.5 text-[10px] bg-rose-900 text-white font-bold">
                {myPostsCount}
              </span>
            )}
          </button>
        </nav>
      </div>

      {/* FTU Hotspot Quick Filters */}
      <div className="bg-white border-2 border-slate-900 p-4 shadow-[4px_4px_0px_0px_rgba(15,23,42,0.9)]">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-rose-700" />
            <span>Khu vực FTU 91 Chùa Láng</span>
          </h4>
          {selectedLocation && (
            <button
              onClick={() => setSelectedLocation('')}
              className="text-[11px] text-rose-700 font-bold hover:underline"
            >
              Xóa lọc
            </button>
          )}
        </div>

        <div className="space-y-1 text-xs">
          {ftuLocations.map((loc) => {
            const isSelected = selectedLocation === loc;
            return (
              <button
                key={loc}
                onClick={() => setSelectedLocation(isSelected ? '' : loc)}
                className={`w-full text-left px-3 py-2 flex items-center justify-between font-semibold transition-colors border ${
                  isSelected
                    ? 'bg-rose-900 text-white border-rose-900'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-400'
                }`}
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>{loc}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
