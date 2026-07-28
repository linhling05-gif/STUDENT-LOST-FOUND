import React, { useState } from 'react';
import { Item } from '../types';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border-2 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,0.9)] my-8 max-h-[90vh] flex flex-col">
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-slate-900 bg-rose-900 text-white sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 text-xs font-black border border-white ${
                isLost ? 'bg-rose-700 text-white' : 'bg-emerald-700 text-white'
              }`}
            >
              {isLost ? 'TIN BÁO MẤT (LOST)' : 'TIN NHẶT ĐƯỢC (FOUND)'}
            </span>
            <span className="px-2.5 py-1 text-xs font-bold bg-slate-800 text-white border border-slate-700">
              {item.category}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 bg-white text-slate-900 border border-slate-900 hover:bg-slate-200 transition-colors"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scroll Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Main Image Sharp */}
          <div className="relative h-64 sm:h-80 w-full bg-slate-900 border-2 border-slate-900">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            {isResolved && (
              <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center">
                <div className="px-6 py-3 bg-white text-slate-900 font-black border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] flex items-center gap-2">
                  <Check className="w-6 h-6 text-emerald-600 stroke-[3]" />
                  <span>ĐÃ HOÀN TRẢ / GIẢI QUYẾT</span>
                </div>
              </div>
            )}
          </div>

          {/* Title & Metadata */}
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              {item.title}
            </h2>

            <div className="flex flex-wrap items-center gap-3 mt-3 text-xs sm:text-sm font-semibold">
              <div className="flex items-center gap-1.5 bg-rose-50 text-rose-900 px-3 py-1.5 border border-rose-300">
                <MapPin className="w-4 h-4 text-rose-700 shrink-0" />
                <span>{item.location}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-100 text-slate-800 px-3 py-1.5 border border-slate-300">
                <Clock className="w-4 h-4 text-slate-500 shrink-0" />
                <span>{item.date}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-100 text-slate-800 px-3 py-1.5 border border-slate-300">
                <User className="w-4 h-4 text-slate-500 shrink-0" />
                <span>Người đăng: {item.contactName}</span>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-slate-50 p-4 border-2 border-slate-900">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-rose-700" />
              Mô tả chi tiết & Đặc điểm nhận dạng
            </h3>
            <p className="text-slate-900 text-sm leading-relaxed whitespace-pre-line font-medium">
              {item.description}
            </p>
          </div>

          {/* Privacy Status Note (For Found Items) */}
          {!isLost && (
            <div
              className={`p-4 border-2 flex items-start gap-3 ${
                isPublic
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                  : 'bg-amber-50 border-amber-500 text-amber-950'
              }`}
            >
              {isPublic ? (
                <Unlock className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              ) : (
                <Lock className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              )}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider">
                  Chế độ quyền riêng tư: {isPublic ? 'Công khai SĐT / FB' : 'Ẩn thông tin liên hệ'}
                </h4>
                <p className="text-xs mt-1 leading-relaxed font-medium">
                  {isPublic
                    ? 'Người nhặt cho phép xem trực tiếp số điện thoại và thông tin liên hệ để trao đổi nhận lại ngay.'
                    : 'Thông tin liên hệ được ẩn an toàn để tránh bị mạo nhận. Vui lòng gửi tin nhắn xác minh đặc điểm đồ đạc tới người đăng.'}
                </p>
              </div>
            </div>
          )}

          {/* Action CTA Section */}
          <div className="pt-4 border-t-2 border-slate-900 flex flex-col sm:flex-row gap-3">
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
                className="flex-1 py-3 px-6 bg-rose-900 hover:bg-rose-800 text-white font-black text-sm border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.9)] transition-all flex items-center justify-center gap-2"
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
                className={`flex-1 py-3 px-6 font-black text-sm border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.9)] transition-all flex items-center justify-center gap-2 ${
                  isResolved
                    ? 'bg-slate-300 text-slate-600 cursor-not-allowed shadow-none'
                    : isPublic
                    ? 'bg-emerald-800 hover:bg-emerald-700 text-white'
                    : 'bg-amber-600 hover:bg-amber-500 text-white'
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
              className="py-3 px-4 bg-white hover:bg-slate-100 text-slate-900 border-2 border-slate-900 font-extrabold text-sm transition-colors flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Chia sẻ</span>
            </button>
          </div>
        </div>
      </div>

      {/* POPUP 1: PUBLIC CONTACT POPUP */}
      {showPublicPopup && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/80 animate-fade-in">
          <div className="w-full max-w-md bg-white border-2 border-slate-900 p-6 shadow-[8px_8px_0px_0px_rgba(15,23,42,0.9)] text-slate-900 relative">
            <button
              onClick={() => setShowPublicPopup(false)}
              className="absolute top-4 right-4 p-1 bg-white border border-slate-900 hover:bg-slate-200 text-slate-900"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-emerald-800 text-white font-black flex items-center justify-center border-2 border-slate-900 shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-black text-lg leading-snug">Thông tin liên hệ trực tiếp</h3>
                <p className="text-xs text-slate-500 font-semibold">Người nhặt công khai SĐT & Mạng xã hội</p>
              </div>
            </div>

            <div className="space-y-3 bg-slate-50 p-4 border-2 border-slate-900 mb-5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-600 font-bold">Họ & Tên:</span>
                <span className="text-sm font-black text-slate-900">{item.contactName}</span>
              </div>

              {item.contactPhone && (
                <div className="flex items-center justify-between pt-2 border-t border-slate-300">
                  <span className="text-xs text-slate-600 font-bold">Số điện thoại:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-emerald-700">
                      {item.contactPhone}
                    </span>
                    <button
                      onClick={() => handleCopyPhone(item.contactPhone!)}
                      className="p-1 text-slate-700 hover:text-emerald-700 border border-slate-300"
                      title="Sao chép số"
                    >
                      {copiedPhone ? (
                        <Check className="w-4 h-4 text-emerald-700" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {item.contactSocial && (
                <div className="flex items-center justify-between pt-2 border-t border-slate-300">
                  <span className="text-xs text-slate-600 font-bold">Facebook / Zalo:</span>
                  <a
                    href={item.contactSocial}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-black text-rose-900 hover:underline flex items-center gap-1"
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
                  className="flex-1 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white font-extrabold text-xs text-center border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.9)] transition-colors flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-4 h-4" />
                  <span>Gọi điện ngay</span>
                </a>
              )}
              <button
                onClick={() => setShowPublicPopup(false)}
                className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-900 border-2 border-slate-900 font-extrabold text-xs transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POPUP 2: HIDDEN CLAIM FORM MODAL */}
      {showHiddenForm && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/80 animate-fade-in">
          <div className="w-full max-w-lg bg-white border-2 border-slate-900 p-6 shadow-[8px_8px_0px_0px_rgba(15,23,42,0.9)] text-slate-900 relative">
            <button
              onClick={() => setShowHiddenForm(false)}
              className="absolute top-4 right-4 p-1 bg-white border border-slate-900 hover:bg-slate-200 text-slate-900"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-amber-600 text-white font-black flex items-center justify-center border-2 border-slate-900 shrink-0">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-black text-lg leading-snug">Gửi yêu cầu nhận lại</h3>
                <p className="text-xs text-slate-600 font-medium">
                  Bài đăng này ở chế độ Ẩn contact. Người nhặt sẽ xác minh thông tin của bạn.
                </p>
              </div>
            </div>

            <form onSubmit={handleSendClaim} className="space-y-4">
              <div>
                <label className="block text-xs font-black text-slate-900 mb-1 uppercase tracking-wider">
                  Số điện thoại / Zalo của bạn <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  placeholder="Ví dụ: 0987.123.456"
                  className="w-full px-3.5 py-2.5 bg-white border-2 border-slate-900 text-xs sm:text-sm text-slate-900 font-semibold"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-900 mb-1 uppercase tracking-wider">
                  Lời nhắn xác minh đặc điểm đồ vật <span className="text-rose-600">*</span>
                </label>
                <textarea
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  rows={4}
                  placeholder="Ví dụ: Ví màu đen Uniqlo bên trong có CCCD tên Nguyễn Văn A và thẻ ATM Vietcombank mã đuôi 9988..."
                  className="w-full px-3.5 py-2.5 bg-white border-2 border-slate-900 text-xs sm:text-sm text-slate-900 font-semibold"
                  required
                />
                <p className="text-[11px] text-slate-600 mt-1 italic font-medium">
                  💡 Mẹo: Nhập chi tiết các đặc điểm ẩn (chữ ký, tên lót, móc khóa, hoa văn bên trong...) mà người ngoài không biết để xác minh chính chủ nhanh nhất.
                </p>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t-2 border-slate-900">
                <button
                  type="button"
                  onClick={() => setShowHiddenForm(false)}
                  className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-900 border-2 border-slate-900 font-extrabold text-xs transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.9)] font-extrabold text-xs transition-all flex items-center gap-1.5"
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
