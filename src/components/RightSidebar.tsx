import React from 'react';
import { Item } from '../types';
import { ShieldAlert, Award, AlertTriangle, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';

interface RightSidebarProps {
  items: Item[];
  onSelectItem: (item: Item) => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({ items, onSelectItem }) => {
  const urgentLostItems = items.filter((i) => i.type === 'lost' && i.status === 'active').slice(0, 3);
  const resolvedCount = items.filter((i) => i.status === 'resolved').length;
  const activeCount = items.filter((i) => i.status === 'active').length;

  return (
    <aside className="space-y-6">
      {/* FTU Community Impact Widget */}
      <div className="bg-gradient-to-br from-slate-900 to-rose-950 text-white p-5 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,0.9)]">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-wider mb-2">
          <Award className="w-4 h-4" />
          <span>Cộng đồng FTUers Đoàn kết</span>
        </div>
        <h3 className="text-base font-black tracking-tight leading-snug">
          UniFind FTU Hanoi
        </h3>
        <p className="text-xs text-rose-100/80 mt-1 leading-relaxed">
          Nền tảng hỗ trợ sinh viên Ngoại thương tìm lại hành lý & giấy tờ bị mất tại trường.
        </p>

        <div className="mt-4 pt-3 border-t border-white/15 grid grid-cols-2 gap-2 text-center">
          <div className="p-2 bg-white/10 border border-white/10">
            <span className="block text-[11px] text-rose-200 font-bold">Đã tìm thấy</span>
            <span className="text-lg font-black text-amber-400">{resolvedCount + 128}</span>
          </div>
          <div className="p-2 bg-white/10 border border-white/10">
            <span className="block text-[11px] text-rose-200 font-bold">Tin đang chờ</span>
            <span className="text-lg font-black text-white">{activeCount}</span>
          </div>
        </div>
      </div>

      {/* Urgent Lost Items Section */}
      <div className="bg-white border-2 border-slate-900 p-4 shadow-[4px_4px_0px_0px_rgba(15,23,42,0.9)]">
        <div className="flex items-center gap-2 mb-3 text-rose-900 font-black text-xs uppercase tracking-wider">
          <ShieldAlert className="w-4 h-4 text-rose-700 animate-pulse" />
          <span>Tin báo mất cần giúp đỡ</span>
        </div>

        <div className="space-y-3">
          {urgentLostItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectItem(item)}
              className="p-3 bg-slate-50 hover:bg-rose-50/60 border border-slate-200 hover:border-rose-300 cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between gap-2 text-[11px] font-bold mb-1">
                <span className="text-rose-900 bg-rose-100 border border-rose-200 px-1.5 py-0.5">
                  {item.category}
                </span>
                <span className="text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {item.location}
                </span>
              </div>
              <h5 className="text-xs font-bold text-slate-900 group-hover:text-rose-700 line-clamp-1">
                {item.title}
              </h5>
              <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-normal">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Notice Box */}
      <div className="bg-amber-50 border-2 border-amber-400 p-4 shadow-[4px_4px_0px_0px_rgba(217,119,6,0.5)]">
        <div className="flex items-center gap-2 text-amber-900 font-bold text-xs mb-2">
          <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
          <span>Lưu ý an toàn cho FTUers</span>
        </div>
        <p className="text-[11px] text-amber-900/90 leading-relaxed font-medium">
          Đối với tài sản có giá trị lớn (Ví tiền, Tai nghe, Laptop), bạn nên trao đổi & hẹn nhận lại tại các vị trí công khai đông người như <strong>Căng tin FTU</strong> hoặc <strong>Sảnh Tòa A</strong>.
        </p>
      </div>
    </aside>
  );
};
