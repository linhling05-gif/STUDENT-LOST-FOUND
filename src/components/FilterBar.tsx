import React from 'react';
import { Category, LocationArea } from '../types';
import { MapPin, Tag, RotateCcw, CheckCircle2 } from 'lucide-react';

interface FilterBarProps {
  activeTab: 'all' | 'lost' | 'found' | 'resolved';
  setActiveTab: (tab: 'all' | 'lost' | 'found' | 'resolved') => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedLocation: string;
  setSelectedLocation: (loc: string) => void;
  totalCount: number;
  onReset: () => void;
}

const CATEGORIES: Category[] = [
  'Thẻ sinh viên FTU',
  'Ví tiền / Bóp',
  'Tai nghe Bluetooth',
  'Chìa khóa xe',
  'Giáo trình / Tài liệu FTU',
  'Thẻ ATM / Ngân hàng',
  'Laptop / Thiết bị',
  'Khác',
];

const LOCATIONS: LocationArea[] = [
  'Nhà A (Giảng đường A)',
  'Nhà B (Giảng đường B)',
  'Thư viện FTU (Tầng 2-3 Nhà A)',
  'Căng tin FTU',
  'Nhà xe cổng Chùa Láng',
  'Sân nhà D / Sân thể thao',
  'Hội trường D201',
  'Ký túc xá FTU',
  'Khác',
];

export const FilterBar: React.FC<FilterBarProps> = ({
  activeTab,
  setActiveTab,
  selectedCategory,
  setSelectedCategory,
  selectedLocation,
  setSelectedLocation,
  totalCount,
  onReset,
}) => {
  const isFiltered = activeTab !== 'all' || selectedCategory !== '' || selectedLocation !== '';

  return (
    <div className="w-full glass-card rounded-3xl p-4 mb-8 shadow-sm border-rose-100/70">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Main Tabs (Lost | Found | All | Resolved) */}
        <div className="flex items-center gap-1.5 p-1.5 bg-rose-50/60 rounded-2xl overflow-x-auto no-scrollbar border border-rose-100/60">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              activeTab === 'all'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            Tất cả bài đăng FTU
          </button>

          <button
            onClick={() => setActiveTab('lost')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              activeTab === 'lost'
                ? 'bg-rose-600 text-white shadow-sm shadow-rose-600/25'
                : 'text-slate-600 hover:text-rose-700 hover:bg-rose-100/50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-rose-300 animate-ping inline-block" />
            <span>Cần tìm (Lost)</span>
          </button>

          <button
            onClick={() => setActiveTab('found')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              activeTab === 'found'
                ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/20'
                : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
            <span>Nhặt được (Found)</span>
          </button>

          <button
            onClick={() => setActiveTab('resolved')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              activeTab === 'resolved'
                ? 'bg-slate-700 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-slate-300" />
            <span>Đã hoàn trả</span>
          </button>
        </div>

        {/* Filters (Dropdowns & Count) */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Location Dropdown */}
          <div className="relative flex-1 sm:flex-initial min-w-[170px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <MapPin className="w-4 h-4 text-rose-600" />
            </div>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full pl-9 pr-8 py-2 rounded-xl glass-input text-xs sm:text-sm font-semibold text-slate-700 appearance-none cursor-pointer"
            >
              <option value="">Khu vực FTU (Tất cả)</option>
              {LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Category Dropdown */}
          <div className="relative flex-1 sm:flex-initial min-w-[170px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Tag className="w-4 h-4 text-amber-600" />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-9 pr-8 py-2 rounded-xl glass-input text-xs sm:text-sm font-semibold text-slate-700 appearance-none cursor-pointer"
            >
              <option value="">Tất cả danh mục đồ</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Filters */}
          {isFiltered && (
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold transition-colors"
              title="Đặt lại bộ lọc"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Đặt lại</span>
            </button>
          )}

          {/* Result Count Indicator */}
          <div className="px-3 py-2 bg-rose-50 text-rose-800 rounded-xl text-xs font-extrabold border border-rose-200 ml-auto sm:ml-0">
            {totalCount} tin bài
          </div>
        </div>
      </div>
    </div>
  );
};
