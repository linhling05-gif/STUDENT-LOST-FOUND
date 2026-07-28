import React from 'react';
import { Item, ClaimRequest } from '../types';
import {
  X,
  LayoutDashboard,
  CheckCircle2,
  Phone,
  MessageSquare,
  Trash2,
  Lock,
  Clock,
  MapPin,
  Inbox,
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
  if (!isOpen) return null;

  // Filter items owned by current user
  const myItems = items.filter((item) => item.ownerId === 'current-user');

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/70 animate-fade-in">
      <div className="w-full max-w-2xl bg-white h-full shadow-[8px_8px_0px_0px_rgba(15,23,42,0.9)] flex flex-col border-l-2 border-slate-900">
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b-2 border-slate-900 bg-rose-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white text-rose-900 font-black flex items-center justify-center border border-slate-900 shrink-0">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black tracking-tight uppercase">
                Quản lý bài đăng & Yêu cầu
              </h2>
              <p className="text-xs text-rose-100 font-medium">
                Góc xem dành cho Chủ bài viết (Owner View Demo)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 bg-white text-slate-900 border border-slate-900 hover:bg-slate-200 transition-colors"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Main Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {myItems.length === 0 ? (
            <div className="text-center py-16 px-4 bg-slate-50 border-2 border-slate-900">
              <Inbox className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-black text-slate-900">Bạn chưa tạo bài đăng nào</h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto mt-1 font-semibold">
                Nhấn vào nút "+ Đăng bài mới" ở thanh điều hướng để tạo bài tin và nhận yêu cầu từ sinh viên FTU!
              </p>
            </div>
          ) : (
            myItems.map((item) => {
              const itemClaims = claims.filter((c) => c.itemId === item.id);
              const isResolved = item.status === 'resolved';

              return (
                <div
                  key={item.id}
                  className={`bg-white p-5 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,0.9)] transition-all ${
                    isResolved ? 'opacity-85 bg-slate-50' : ''
                  }`}
                >
                  {/* Item Summary Card */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full sm:w-28 h-28 object-cover border-2 border-slate-900 shrink-0"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span
                            className={`px-2 py-0.5 text-[11px] font-black border border-slate-900 ${
                              item.type === 'lost' ? 'bg-rose-100 text-rose-900' : 'bg-emerald-100 text-emerald-900'
                            }`}
                          >
                            {item.type === 'lost' ? 'Báo mất' : 'Nhặt được'}
                          </span>

                          <span className="px-2 py-0.5 text-[11px] font-bold bg-slate-100 text-slate-800 border border-slate-300">
                            {item.category}
                          </span>

                          {item.privacy === 'hidden' && (
                            <span className="px-2 py-0.5 text-[10px] font-black bg-amber-100 text-amber-900 border border-amber-400 flex items-center gap-1">
                              <Lock className="w-3 h-3" /> Ẩn Contact
                            </span>
                          )}

                          {isResolved && (
                            <span className="px-2 py-0.5 text-[11px] font-black bg-slate-800 text-white border border-slate-900 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-slate-300" /> Đã hoàn trả
                            </span>
                          )}
                        </div>

                        <h3 className="font-black text-sm text-slate-900 line-clamp-1">
                          {item.title}
                        </h3>

                        <div className="flex items-center gap-3 text-xs text-slate-600 font-semibold mt-1">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-rose-700" /> {item.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" /> {item.date}
                          </span>
                        </div>
                      </div>

                      {/* Card Action Buttons */}
                      <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-slate-200">
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
                          className={`px-3 py-1.5 font-black text-xs border border-slate-900 flex items-center gap-1.5 transition-colors ${
                            isResolved
                              ? 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                              : 'bg-emerald-800 text-white hover:bg-emerald-700'
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
                          className="p-1.5 bg-slate-100 hover:bg-rose-100 text-slate-600 hover:text-rose-900 border border-slate-300 transition-colors ml-auto"
                          title="Xóa bài viết"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Incoming Claim Requests list for this Item */}
                  <div className="mt-4 pt-4 border-t-2 border-slate-900">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                        <MessageSquare className="w-4 h-4 text-rose-700" />
                        <span>Yêu cầu nhận lại ({itemClaims.length})</span>
                      </h4>

                      {itemClaims.length > 0 && (
                        <span className="text-[11px] text-white bg-rose-900 px-2 py-0.5 font-extrabold">
                          Chờ duyệt
                        </span>
                      )}
                    </div>

                    {itemClaims.length === 0 ? (
                      <p className="text-xs text-slate-500 italic bg-slate-50 p-3 border border-slate-300 text-center font-medium">
                        Chưa có người nào gửi yêu cầu nhận lại cho bài đăng này.
                      </p>
                    ) : (
                      <div className="space-y-2.5">
                        {itemClaims.map((claim) => (
                          <div
                            key={claim.id}
                            className="bg-slate-50 p-3.5 border border-slate-400 text-xs space-y-2"
                          >
                            <div className="flex items-center justify-between font-black text-slate-900">
                              <div className="flex items-center gap-2">
                                <Phone className="w-3.5 h-3.5 text-rose-700" />
                                <span>SĐT/Zalo người gửi: {claim.requesterPhone}</span>
                              </div>
                              <span className="text-[10px] text-slate-500 font-semibold">
                                {new Date(claim.createdAt).toLocaleTimeString('vi-VN', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </span>
                            </div>

                            <p className="text-slate-900 bg-white p-2.5 border border-slate-300 leading-relaxed font-semibold">
                              "{claim.requesterMessage}"
                            </p>

                            <div className="flex justify-end gap-2 pt-1">
                              <a
                                href={`tel:${claim.requesterPhone}`}
                                className="px-3 py-1 bg-rose-900 text-white font-extrabold text-[11px] flex items-center gap-1 hover:bg-rose-800 transition-colors border border-slate-900"
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
