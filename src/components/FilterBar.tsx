import React from 'react';
import { Category, LocationArea } from '../types';
import { MapPin, Tag, RotateCcw, CheckCircle2, Calendar, X } from 'lucide-react';

interface FilterBarProps {
  activeTab: 'all' | 'lost' | 'found' | 'resolved';
  setActiveTab: (tab: 'all' | 'lost' | 'found' | 'resolved') => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedLocation: string;
  setSelectedLocation: (loc: string) => void;
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
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
  'Tòa A',
  'Tòa B',
  'Thư viện FTU',
  'Căng tin FTU',
  'Nhà xe',
  'Cổng trường',
  'Sân nhà D',
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
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  totalCount,
  onReset,
}) => {
  const isFiltered =
    activeTab !== 'all' ||
    selectedCategory !== '' ||
    selectedLocation !== '' ||
    startDate !== '' ||
    endDate !== '';

  return (
    <div className="w-full bg-white border-2 border-slate-900 p-4 shadow-[4px_4px_0px_0px_rgba(15,23,42,0.9)] mb-6 space-y-4">
      {/* Top row: Status Tabs Sharp */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Main Tabs (All | Lost | Found | Resolved) */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 border border-slate-300 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-2 text-xs sm:text-sm font-extrabold transition-all border shrink-0 ${
              activeTab === 'all'
                ? 'bg-rose-900 text-white border-rose-900'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            Tất cả bài đăng FTU
          </button>

          <button
            onClick={() => setActiveTab('lost')}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-extrabold transition-all border shrink-0 ${
              activeTab === 'lost'
                ? 'bg-rose-900 text-white border-rose-900'
                : 'bg-white text-rose-900 border-rose-300 hover:bg-rose-50'
            }`}
          >
            <span className="w-2 h-2 bg-rose-600 animate-pulse" />
            <span>Cần tìm (Lost)</span>
          </button>

          <button
            onClick={() => setActiveTab('found')}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-extrabold transition-all border shrink-0 ${
              activeTab === 'found'
                ? 'bg-emerald-900 text-white border-emerald-900'
                : 'bg-white text-emerald-900 border-emerald-300 hover:bg-emerald-50'
            }`}
          >
            <span className="w-2 h-2 bg-emerald-600" />
            <span>Nhặt được (Found)</span>
          </button>

          <button
            onClick={() => setActiveTab('resolved')}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-extrabold transition-all border shrink-0 ${
              activeTab === 'resolved'
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
            <span>Đã hoàn trả</span>
          </button>
        </div>

        {/* Result Count Indicator Sharp */}
        <div className="flex items-center justify-between lg:justify-end gap-3">
          {isFiltered && (
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-3 py-2 bg-rose-100 text-rose-900 border border-rose-300 text-xs font-extrabold transition-colors hover:bg-rose-200"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Đặt lại lọc</span>
            </button>
          )}

          <div className="px-3.5 py-2 bg-rose-900 text-white text-xs font-black border border-slate-900">
            {totalCount} bài viết
          </div>
        </div>
      </div>

      {/* Second row: Dropdowns & Date Range Picker */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-slate-200">
        {/* Location Dropdown */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <MapPin className="w-4 h-4 text-rose-700" />
          </div>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full pl-9 pr-8 py-2 bg-white border border-slate-300 text-xs sm:text-sm font-semibold text-slate-900 appearance-none cursor-pointer focus:border-rose-900 outline-none"
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
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Tag className="w-4 h-4 text-amber-700" />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full pl-9 pr-8 py-2 bg-white border border-slate-300 text-xs sm:text-sm font-semibold text-slate-900 appearance-none cursor-pointer focus:border-rose-900 outline-none"
          >
            <option value="">Tất cả danh mục đồ</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Start Date */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Calendar className="w-4 h-4 text-slate-600" />
          </div>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            title="Từ ngày"
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 text-xs sm:text-sm font-semibold text-slate-900 cursor-pointer focus:border-rose-900 outline-none"
          />
          {startDate && (
            <button
              onClick={() => setStartDate('')}
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-700"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* End Date */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Calendar className="w-4 h-4 text-slate-600" />
          </div>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            title="Đến ngày"
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 text-xs sm:text-sm font-semibold text-slate-900 cursor-pointer focus:border-rose-900 outline-none"
          />
          {endDate && (
            <button
              onClick={() => setEndDate('')}
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-700"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
