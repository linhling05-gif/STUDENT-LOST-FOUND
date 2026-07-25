import React from 'react';
import { Item } from '../types';
import { MapPin, Clock, Lock, Unlock, ArrowRight, CheckCircle2, ShieldCheck, Tag } from 'lucide-react';

interface ItemCardProps {
  item: Item;
  onSelect: (item: Item) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item, onSelect }) => {
  const isResolved = item.status === 'resolved';
  const isLost = item.type === 'lost';
  const isPublic = item.privacy === 'public';

  return (
    <div
      onClick={() => onSelect(item)}
      className={`glass-card rounded-3xl overflow-hidden flex flex-col cursor-pointer group relative ${
        isResolved ? 'opacity-75 grayscale-[30%]' : ''
      }`}
    >
      {/* Top Banner Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-80" />

        {/* Status Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2">
          {/* Lost / Found Badge */}
          {isResolved ? (
            <span className="badge-resolved px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Đã giải quyết
            </span>
          ) : isLost ? (
            <span className="badge-lost px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
              CẦN TÌM (LOST)
            </span>
          ) : (
            <span className="badge-found px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              NHẶT ĐƯỢC (FOUND)
            </span>
          )}

          {/* Category Tag */}
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/80 backdrop-blur-md text-slate-800 shadow-sm border border-white/40">
            {item.category}
          </span>
        </div>

        {/* Privacy Indicator Badge (for Found items) */}
        {!isLost && !isResolved && (
          <div className="absolute top-3 right-3">
            {isPublic ? (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/90 text-white backdrop-blur-md flex items-center gap-1 shadow-md">
                <Unlock className="w-3 h-3" />
                <span>SĐT Công khai</span>
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/90 text-white backdrop-blur-md flex items-center gap-1 shadow-md">
                <Lock className="w-3 h-3" />
                <span>Thông tin Ẩn</span>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3 className="text-base font-bold text-slate-900 group-hover:text-pink-600 transition-colors line-clamp-2 leading-snug">
            {item.title}
          </h3>

          {/* Description summary */}
          <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Meta details & CTA */}
        <div className="mt-4 pt-3 border-t border-slate-200/60">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-3 gap-2">
            <div className="flex items-center gap-1 truncate text-slate-700 font-medium">
              <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              <span className="truncate">{item.location}</span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{item.date}</span>
            </div>
          </div>

          {/* Action button */}
          <button className="w-full py-2.5 px-4 rounded-2xl bg-slate-900/5 group-hover:bg-pink-600 text-slate-800 group-hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all duration-300">
            <span>{isLost ? 'Xem tin báo mất' : 'Yêu cầu nhận lại'}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
