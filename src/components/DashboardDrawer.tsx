import React, { useState } from 'react';
import { Item, ClaimRequest } from '../types';
import {
  X,
  LayoutDashboard,
  CheckCircle2,
  Phone,
  MessageSquare,
  Trash2,
  Lock,
  Unlock,
  Clock,
  MapPin,
  Check,
  AlertCircle,
  Inbox,
  Sparkles,
  ChevronRight,
} from 'lucide-react';

interface DashboardDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: Item[];
  claims: ClaimRequest[];
  onToggleResolveStatus: (itemId: string) => void;
  onDeletePost: (itemId: string) => void;
  addToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const DashboardDrawer: React.FC<DashboardDrawerProps> = ({
  isOpen,
  onClose,
  items,
  claims,
  onToggleResolveStatus,
  onDeletePost,
  addToast,
}) => {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  if (!isOpen) return null;

  // Filter items owned by current user
  const myItems = items.filter((item) => item.ownerId === 'current-user');

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-2xl bg-white/95 backdrop-blur-2xl h-full shadow-2xl flex flex-col border-l border-white/60">
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-slate-200/80 bg-white/80 backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 leading-snug">
                Quản lý bài đăng & Yêu cầu
              </h2>
              <p className="text-xs text-slate-500">
                Góc xem dành cho Chủ bài viết (Owner View Demo)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Main Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {myItems.length === 0 ? (
            <div className="text-center py-16 px-4 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
              <Inbox className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-700">Bạn chưa tạo bài đăng nào</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                Nhấn vào nút "+ Đăng bài mới" ở thanh điều hướng để thử nghiệm tạo bài tin và nhận yêu cầu từ người khác!
              </p>
            </div>
          ) : (
            myItems.map((item) => {
              const itemClaims = claims.filter((c) => c.itemId === item.id);
              const isResolved = item.status === 'resolved';

              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-3xl p-5 border transition-all ${
                    isResolved
                      ? 'border-slate-200 bg-slate-50/70'
                      : 'border-slate-200/90 shadow-sm hover:shadow-md'
                  }`}
                >
                  {/* Item Summary Card */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full sm:w-28 h-28 object-cover rounded-2xl border border-slate-100 shrink-0"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                              item.type === 'lost' ? 'badge-lost' : 'badge-found'
                            }`}
                          >
                            {item.type === 'lost' ? 'Báo mất' : 'Nhặt được'}
                          </span>

                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700">
                            {item.category}
                          </span>

                          {item.privacy === 'hidden' && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 flex items-center gap-1">
                              <Lock className="w-3 h-3" /> Ẩn Contact
                            </span>
                          )}

                          {isResolved && (
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-200 text-slate-700 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-slate-500" /> Đã hoàn trả
                            </span>
                          )}
                        </div>

                        <h3 className="font-bold text-sm text-slate-900 line-clamp-1">
                          {item.title}
                        </h3>

                        <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-indigo-500" /> {item.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {item.date}
                          </span>
                        </div>
                      </div>

                      {/* Card Action Buttons */}
                      <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-slate-100">
                        {/* Toggle Resolved Status */}
                        <button
                          onClick={() => {
                            onToggleResolveStatus(item.id);
                            addToast(
                              isResolved ? 'Đã mở lại bài viết' : 'Đã đánh dấu hoàn trả!',
                              isResolved
                                ? 'Bài viết đã chuyển lại trạng thái Đang tìm.'
                                : 'Trạng thái đã được chuyển sang Đã giải quyết (Resolved).',
                              'info'
                            );
                          }}
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors ${
                            isResolved
                              ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                              : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>
                            {isResolved ? 'Mở lại bài viết' : 'Đánh dấu Đã hoàn trả / Giải quyết'}
                          </span>
                        </button>

                        {/* Delete Post */}
                        <button
                          onClick={() => {
                            onDeletePost(item.id);
                            addToast('Đã xóa bài viết', 'Bài viết đã được gỡ khỏi hệ thống.', 'warning');
                          }}
                          className="p-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors ml-auto"
                          title="Xóa bài viết"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Incoming Claim Requests list for this Item */}
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                        <MessageSquare className="w-4 h-4 text-indigo-600" />
                        <span>Danh sách Yêu cầu nhận lại nhận được ({itemClaims.length})</span>
                      </h4>

                      {itemClaims.length > 0 && (
                        <span className="text-[11px] text-indigo-600 font-semibold bg-indigo-50 px-2 py-0.5 rounded-full">
                          Yêu cầu chờ duyệt
                        </span>
                      )}
                    </div>

                    {itemClaims.length === 0 ? (
                      <p className="text-xs text-slate-400 italic bg-slate-50 p-3 rounded-2xl text-center">
                        Chưa có người nào gửi yêu cầu nhận lại cho bài đăng này.
                      </p>
                    ) : (
                      <div className="space-y-2.5">
                        {itemClaims.map((claim) => (
                          <div
                            key={claim.id}
                            className="bg-indigo-50/60 p-3.5 rounded-2xl border border-indigo-100 text-xs space-y-2"
                          >
                            <div className="flex items-center justify-between font-bold text-slate-900">
                              <div className="flex items-center gap-2">
                                <Phone className="w-3.5 h-3.5 text-indigo-600" />
                                <span>SĐT/Zalo người gửi: {claim.requesterPhone}</span>
                              </div>
                              <span className="text-[10px] text-slate-400 font-normal">
                                {new Date(claim.createdAt).toLocaleTimeString('vi-VN', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </span>
                            </div>

                            <p className="text-slate-700 bg-white p-2.5 rounded-xl border border-indigo-100/80 leading-relaxed font-medium">
                              "{claim.requesterMessage}"
                            </p>

                            <div className="flex justify-end gap-2 pt-1">
                              <a
                                href={`tel:${claim.requesterPhone}`}
                                className="px-3 py-1 rounded-lg bg-indigo-600 text-white font-bold text-[11px] flex items-center gap-1 hover:bg-indigo-700 transition-colors"
                              >
                                <Phone className="w-3 h-3" /> Gọi liên hệ
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
