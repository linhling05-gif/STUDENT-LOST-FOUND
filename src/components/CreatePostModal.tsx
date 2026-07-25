import React, { useState } from 'react';
import { Item, ItemType, Category, LocationArea, PrivacyMode } from '../types';
import {
  X,
  Upload,
  Lock,
  Unlock,
  PlusCircle,
} from 'lucide-react';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitPost: (newPost: Omit<Item, 'id' | 'createdAt' | 'status'>) => void;
  addToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
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

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  onSubmitPost,
  addToast,
}) => {
  const [type, setType] = useState<ItemType>('lost');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category>('Thẻ sinh viên FTU');
  const [location, setLocation] = useState<LocationArea>('Nhà A (Giảng đường A)');
  const [date, setDate] = useState('Vừa xong - ' + new Date().toLocaleDateString('vi-VN'));
  const [description, setDescription] = useState('');
  const [privacy, setPrivacy] = useState<PrivacyMode>('public');
  const [contactName, setContactName] = useState('FTUer (Sinh viên Ngoại thương)');
  const [contactPhone, setContactPhone] = useState('0988.999.888');
  const [contactSocial, setContactSocial] = useState('https://facebook.com/ftuer.student');
  const [imagePreview, setImagePreview] = useState<string>(
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80'
  );

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      addToast('Chưa điền tiêu đề', 'Vui lòng nhập tiêu đề bài viết.', 'error');
      return;
    }
    if (!description.trim()) {
      addToast('Chưa điền mô tả', 'Vui lòng nhập mô tả đặc điểm bài viết.', 'error');
      return;
    }

    onSubmitPost({
      type,
      title: title.trim(),
      category,
      location,
      date: date.trim(),
      description: description.trim(),
      imageUrl: imagePreview,
      privacy,
      contactName: contactName.trim(),
      contactPhone: type === 'found' && privacy === 'hidden' ? undefined : contactPhone.trim(),
      contactSocial: type === 'found' && privacy === 'hidden' ? undefined : contactSocial.trim(),
      ownerId: 'current-user',
    });

    addToast('Đăng bài thành công! ✨', 'Bài viết đã được hiển thị trên hệ thống UniFind FTU.', 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl glass-modal rounded-3xl overflow-hidden my-8 shadow-2xl border border-white/80 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-rose-100 bg-white/60 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
              <PlusCircle className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Đăng tin mới (UniFind FTU)</h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
          {/* Post Type Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Loại tin đăng <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setType('lost')}
                className={`py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold border-2 transition-all flex items-center justify-center gap-2 ${
                  type === 'lost'
                    ? 'border-rose-600 bg-rose-50 text-rose-800 shadow-sm'
                    : 'border-slate-200 bg-white/50 text-slate-600 hover:bg-white'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
                <span>BÁO MẤT (LOST)</span>
              </button>

              <button
                type="button"
                onClick={() => setType('found')}
                className={`py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold border-2 transition-all flex items-center justify-center gap-2 ${
                  type === 'found'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-800 shadow-sm'
                    : 'border-slate-200 bg-white/50 text-slate-600 hover:bg-white'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>NHẶT ĐƯỢC (FOUND)</span>
              </button>
            </div>
          </div>

          {/* Privacy Option (Only for Found items) */}
          {type === 'found' && (
            <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200 space-y-3">
              <label className="block text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-amber-700" />
                <span>Tùy chọn Quyền riêng tư liên hệ</span>
              </label>

              <div className="space-y-2">
                <label className="flex items-center gap-3 p-2.5 rounded-xl bg-white/80 border border-amber-100 cursor-pointer hover:bg-white transition-colors">
                  <input
                    type="radio"
                    name="privacy"
                    value="public"
                    checked={privacy === 'public'}
                    onChange={() => setPrivacy('public')}
                    className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                      <Unlock className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Công khai SĐT / Link Facebook</span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Cho phép bạn bè FTUer xem SĐT và liên hệ trực tiếp.
                    </p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-2.5 rounded-xl bg-white/80 border border-amber-100 cursor-pointer hover:bg-white transition-colors">
                  <input
                    type="radio"
                    name="privacy"
                    value="hidden"
                    checked={privacy === 'hidden'}
                    onChange={() => setPrivacy('hidden')}
                    className="w-4 h-4 text-amber-600 focus:ring-amber-500"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5 text-amber-600" />
                      <span>Ẩn thông tin liên hệ (Chỉ nhận tin nhắn xác minh)</span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Khuyên dùng! Tránh mạo nhận. Người muốn nhận đồ phải miêu tả chi tiết đặc điểm ẩn để bạn duyệt.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Tiêu đề bài viết <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ví dụ: Đánh rơi Thẻ SV FTU K61 Anh 1 KTĐN / Nhặt được chìa khóa Vespa nhà xe..."
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-slate-900 font-medium"
              required
            />
          </div>

          {/* Category & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Danh mục đồ vật</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-slate-900 font-medium cursor-pointer"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Khu vực tại FTU</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value as LocationArea)}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-slate-900 font-medium cursor-pointer"
              >
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date & Time */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Thời gian xảy ra</label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Ví dụ: 10:15 ca 2 sáng nay tại Nhà A"
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-slate-900 font-medium"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Mô tả đặc điểm đồ vật <span className="text-rose-500">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Mô tả chi tiết đặc điểm nhận dạng (lớp học, màu sắc, móc khóa, tem nhãn, giấy tờ bên trong...)"
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-slate-900 font-medium"
              required
            />
          </div>

          {/* Image Preview */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Hình ảnh đính kèm</label>
            <div className="flex items-start gap-4">
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 relative">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 space-y-2">
                <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer transition-colors">
                  <Upload className="w-4 h-4" />
                  <span>Tải ảnh lên từ máy</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>

                <div>
                  <span className="text-[11px] text-slate-400 block mb-1">Hoặc dán URL ảnh trực tiếp:</span>
                  <input
                    type="text"
                    value={imagePreview}
                    onChange={(e) => setImagePreview(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-1.5 rounded-lg glass-input text-xs text-slate-700"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          {(type === 'lost' || privacy === 'public') && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200/60">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">SĐT liên hệ</label>
                <input
                  type="text"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl glass-input text-xs text-slate-900 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Link Facebook / Zalo</label>
                <input
                  type="text"
                  value={contactSocial}
                  onChange={(e) => setContactSocial(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl glass-input text-xs text-slate-900 font-medium"
                />
              </div>
            </div>
          )}

          {/* Submit Footer */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200/60">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-700 via-red-600 to-rose-800 hover:opacity-95 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Đăng bài ngay</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
