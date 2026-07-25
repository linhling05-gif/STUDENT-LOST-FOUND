import React, { useState } from 'react';
import { Item, ClaimRequest } from '../types';
import {
  X,
  MapPin,
  Clock,
  User,
  Phone,
  Share2,
  Lock,
  Unlock,
  ShieldCheck,
  Send,
  Copy,
  Check,
  ExternalLink,
  MessageSquare,
  AlertCircle,
  FileText,
} from 'lucide-react';

interface ItemDetailModalProps {
  item: Item | null;
  onClose: () => void;
  onSubmitClaim: (itemId: string, phone: string, message: string) => void;
  addToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  onClose,
  onSubmitClaim,
  addToast,
}) => {
  const [showPublicPopup, setShowPublicPopup] = useState(false);
  const [showHiddenForm, setShowHiddenForm] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Form states for Hidden claim request
  const [phoneInput, setPhoneInput] = useState('');
  const [messageInput, setMessageInput] = useState('');

  if (!item) return null;

  const isLost = item.type === 'lost';
  const isPublic = item.privacy === 'public';
  const isResolved = item.status === 'resolved';

  const handleCopyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(true);
    addToast('Đã sao chép SĐT!', `Đã chép số ${phone} vào bộ nhớ tạm.`, 'info');
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSendClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneInput.trim()) {
      addToast('Lỗi nhập liệu', 'Vui lòng nhập SĐT hoặc Zalo của bạn.', 'error');
      return;
    }
    if (!messageInput.trim()) {
      addToast('Lỗi nhập liệu', 'Vui lòng điền lời nhắn xác minh đặc điểm đồ đạc.', 'error');
      return;
    }

    onSubmitClaim(item.id, phoneInput.trim(), messageInput.trim());
    addToast(
      'Gửi yêu cầu thành công! 🎉',
      'Lời nhắn xác minh của bạn đã được chuyển tới người đăng bài.',
      'success'
    );
    setShowHiddenForm(false);
    setPhoneInput('');
    setMessageInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl glass-modal rounded-3xl overflow-hidden my-8 shadow-2xl border border-white/80 max-h-[90vh] flex flex-col">
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200/60 bg-white/50 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                isLost ? 'badge-lost' : 'badge-found'
              }`}
            >
              {isLost ? 'TIN BÁO MẤT' : 'TIN NHẶT ĐƯỢC'}
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
              {item.category}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scroll Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Main Image */}
          <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden bg-slate-100 shadow-inner border border-slate-200/50">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            {isResolved && (
              <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center">
                <div className="px-6 py-3 bg-white/90 text-slate-900 font-extrabold rounded-2xl shadow-xl flex items-center gap-2">
                  <Check className="w-6 h-6 text-emerald-600 stroke-[3]" />
                  <span>ĐÃ HOÀN TRẢ / GIẢI QUYẾT</span>
                </div>
              </div>
            )}
          </div>

          {/* Title & Metadata */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
              {item.title}
            </h2>

            <div className="flex flex-wrap items-center gap-4 mt-3 text-xs sm:text-sm text-slate-600 font-medium">
              <div className="flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-xl border border-indigo-100">
                <MapPin className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>{item.location}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-100 text-slate-700 px-3 py-1.5 rounded-xl">
                <Clock className="w-4 h-4 text-slate-500 shrink-0" />
                <span>{item.date}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-100 text-slate-700 px-3 py-1.5 rounded-xl">
                <User className="w-4 h-4 text-slate-500 shrink-0" />
                <span>Người đăng: {item.contactName}</span>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-white/60 p-4 rounded-2xl border border-slate-200/60">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5" />
              Mô tả chi tiết & Đặc điểm nhận dạng
            </h3>
            <p className="text-slate-800 text-sm leading-relaxed whitespace-pre-line font-normal">
              {item.description}
            </p>
          </div>

          {/* Privacy Status Note (For Found Items) */}
          {!isLost && (
            <div
              className={`p-4 rounded-2xl border flex items-start gap-3 ${
                isPublic
                  ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                  : 'bg-amber-50/80 border-amber-200 text-amber-900'
              }`}
            >
              {isPublic ? (
                <Unlock className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <Lock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              )}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider">
                  Chế độ quyền riêng tư: {isPublic ? 'Công khai SĐT / FB' : 'Ẩn thông tin liên hệ'}
                </h4>
                <p className="text-xs mt-1 leading-relaxed">
                  {isPublic
                    ? 'Người nhặt cho phép xem trực tiếp số điện thoại và thông tin liên hệ để trao đổi nhận lại ngay.'
                    : 'Thông tin liên hệ được ẩn an toàn để tránh bị mạo nhận. Vui lòng gửi tin nhắn xác minh đặc điểm đồ đạc tới người đăng.'}
                </p>
              </div>
            </div>
          )}

          {/* Action CTA Section */}
          <div className="pt-4 border-t border-slate-200/60 flex flex-col sm:flex-row gap-3">
            {isLost ? (
              /* Claim Flow for Lost Item */
              <button
                onClick={() => {
                  if (item.contactPhone) {
                    handleCopyPhone(item.contactPhone);
                  } else {
                    addToast('Liên hệ', `Liên hệ ngay cho ${item.contactName}`, 'info');
                  }
                }}
                className="flex-1 py-3 px-6 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Liên hệ người báo mất: {item.contactPhone || item.contactName}</span>
              </button>
            ) : (
              /* Claim Flow for Found Item */
              <button
                disabled={isResolved}
                onClick={() => {
                  if (isPublic) {
                    setShowPublicPopup(true);
                  } else {
                    setShowHiddenForm(true);
                  }
                }}
                className={`flex-1 py-3 px-6 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
                  isResolved
                    ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                    : isPublic
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:shadow-emerald-600/30'
                    : 'bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:shadow-amber-500/30'
                }`}
              >
                <ShieldCheck className="w-5 h-5" />
                <span>
                  {isResolved
                    ? 'Món đồ đã được nhận lại'
                    : isPublic
                    ? 'Yêu cầu nhận lại (Hiện SĐT/FB)'
                    : 'Yêu cầu nhận lại (Gửi tin xác minh)'}
                </span>
              </button>
            )}

            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                addToast('Chia sẻ', 'Đã chép đường dẫn bài viết vào bộ nhớ tạm!', 'info');
              }}
              className="py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Chia sẻ</span>
            </button>
          </div>
        </div>
      </div>

      {/* POPUP 1: PUBLIC CONTACT POPUP */}
      {showPublicPopup && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 text-slate-900 relative">
            <button
              onClick={() => setShowPublicPopup(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg leading-snug">Thông tin liên hệ trực tiếp</h3>
                <p className="text-xs text-slate-500">Người nhặt công khai SĐT & Mạng xã hội</p>
              </div>
            </div>

            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 mb-5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">Họ & Tên:</span>
                <span className="text-sm font-bold text-slate-900">{item.contactName}</span>
              </div>

              {item.contactPhone && (
                <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                  <span className="text-xs text-slate-500 font-medium">Số điện thoại:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-extrabold text-emerald-600">
                      {item.contactPhone}
                    </span>
                    <button
                      onClick={() => handleCopyPhone(item.contactPhone!)}
                      className="p-1 text-slate-500 hover:text-emerald-600 rounded"
                      title="Sao chép số"
                    >
                      {copiedPhone ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {item.contactSocial && (
                <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                  <span className="text-xs text-slate-500 font-medium">Facebook / Zalo:</span>
                  <a
                    href={item.contactSocial}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
                  >
                    <span>Mở đường dẫn</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              {item.contactPhone && (
                <a
                  href={`tel:${item.contactPhone}`}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs text-center transition-colors flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-4 h-4" />
                  <span>Gọi điện ngay</span>
                </a>
              )}
              <button
                onClick={() => setShowPublicPopup(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POPUP 2: HIDDEN CLAIM FORM MODAL */}
      {showHiddenForm && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 text-slate-900 relative">
            <button
              onClick={() => setShowHiddenForm(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg leading-snug">Gửi yêu cầu nhận lại</h3>
                <p className="text-xs text-slate-500">
                  Bài đăng này ở chế độ Ẩn contact. Người nhặt sẽ xác minh thông tin của bạn.
                </p>
              </div>
            </div>

            <form onSubmit={handleSendClaim} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Số điện thoại / Zalo của bạn <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  placeholder="Ví dụ: 0987.123.456"
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm text-slate-900 font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Lời nhắn xác minh đặc điểm đồ vật <span className="text-rose-500">*</span>
                </label>
                <textarea
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  rows={4}
                  placeholder="Ví dụ: Ví màu đen Uniqlo bên trong có CCCD tên Nguyễn Văn A và thẻ ATM Vietcombank mã đuôi 9988..."
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm text-slate-900 font-medium"
                  required
                />
                <p className="text-[11px] text-slate-500 mt-1 italic">
                  💡 Mẹo: Nhập chi tiết các đặc điểm ẩn (chữ ký, tên lót, móc khóa, hoa văn bên trong...) mà người ngoài không biết để xác minh chính chủ nhanh nhất.
                </p>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowHiddenForm(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Gửi yêu cầu xác minh</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
