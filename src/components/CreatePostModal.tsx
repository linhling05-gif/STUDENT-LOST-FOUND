import React, { useState } from 'react';
import { Item, ItemType, Category, LocationArea, PrivacyMode } from '../types';
import { X, Upload, Lock, Unlock, PlusCircle } from 'lucide-react';

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

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  onSubmitPost,
  addToast,
}) => {
  const [type, setType] = useState<ItemType>('lost');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category>('Thẻ sinh viên FTU');
  const [location, setLocation] = useState<LocationArea>('Tòa A');
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
      authorClass: 'K61 FTU Hanoi',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      contactPhone: type === 'found' && privacy === 'hidden' ? undefined : contactPhone.trim(),
      contactSocial: type === 'found' && privacy === 'hidden' ? undefined : contactSocial.trim(),
      ownerId: 'current-user',
      likesCount: 0,
      userLiked: false,
      comments: [],
    });

    addToast('Đăng bài thành công! ✨', 'Bài viết đã được hiển thị trên hệ thống UniFind FTU.', 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border-2 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,0.9)] my-8 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-slate-900 bg-rose-900 text-white sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <PlusCircle className="w-5 h-5" />
            <h2 className="text-base font-black tracking-tight uppercase">Đăng tin mới (UniFind FTU)</h2>
          </div>

          <button
            onClick={onClose}
            className="p-1 bg-white text-slate-900 border border-slate-900 hover:bg-slate-200 transition-colors"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
          {/* Post Type Selector */}
          <div>
            <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-2">
              Loại tin đăng <span className="text-rose-600">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setType('lost')}
                className={`py-3 px-4 text-xs sm:text-sm font-black border-2 transition-all flex items-center justify-center gap-2 ${
                  type === 'lost'
                    ? 'border-slate-900 bg-rose-900 text-white shadow-[2px_2px_0px_0px_rgba(15,23,42,0.9)]'
                    : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="w-2.5 h-2.5 bg-rose-500 border border-white" />
                <span>BÁO MẤT (LOST)</span>
              </button>

              <button
                type="button"
                onClick={() => setType('found')}
                className={`py-3 px-4 text-xs sm:text-sm font-black border-2 transition-all flex items-center justify-center gap-2 ${
                  type === 'found'
                    ? 'border-slate-900 bg-emerald-800 text-white shadow-[2px_2px_0px_0px_rgba(15,23,42,0.9)]'
                    : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="w-2.5 h-2.5 bg-emerald-400 border border-white" />
                <span>NHẶT ĐƯỢC (FOUND)</span>
              </button>
            </div>
          </div>

          {/* Privacy Option (Only for Found items) */}
          {type === 'found' && (
            <div className="p-4 bg-amber-50 border-2 border-amber-400 space-y-3">
              <label className="block text-xs font-black text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-amber-700" />
                <span>Tùy chọn Quyền riêng tư liên hệ</span>
              </label>

              <div className="space-y-2">
                <label className="flex items-start gap-3 p-3 bg-white border border-amber-300 cursor-pointer">
                  <input
                    type="radio"
                    name="privacy"
                    value="public"
                    checked={privacy === 'public'}
                    onChange={() => setPrivacy('public')}
                    className="mt-0.5 text-emerald-600 focus:ring-0"
                  />
                  <div>
                    <div className="text-xs font-extrabold text-slate-900 flex items-center gap-1">
                      <Unlock className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Công khai SĐT / Link Facebook</span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-medium">
                      Cho phép các bạn FTUer xem SĐT và liên hệ trực tiếp.
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 bg-white border border-amber-300 cursor-pointer">
                  <input
                    type="radio"
                    name="privacy"
                    value="hidden"
                    checked={privacy === 'hidden'}
                    onChange={() => setPrivacy('hidden')}
                    className="mt-0.5 text-amber-600 focus:ring-0"
                  />
                  <div>
                    <div className="text-xs font-extrabold text-slate-900 flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5 text-amber-600" />
                      <span>Ẩn thông tin liên hệ (Chỉ nhận tin nhắn xác minh)</span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-medium">
                      Khuyên dùng! Tránh mạo nhận. Người muốn nhận đồ phải miêu tả đặc điểm ẩn để bạn duyệt.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-xs font-black text-slate-900 mb-1 uppercase tracking-wider">
              Tiêu đề bài viết <span className="text-rose-600">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ví dụ: Đánh rơi Thẻ SV FTU K61 Anh 1 KTĐN / Nhặt được chìa khóa Vespa nhà xe..."
              className="w-full px-4 py-2.5 bg-white border-2 border-slate-900 text-xs sm:text-sm text-slate-900 font-semibold focus:border-rose-900 outline-none"
              required
            />
          </div>

          {/* Category & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black text-slate-900 mb-1 uppercase tracking-wider">Danh mục đồ vật</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full px-4 py-2.5 bg-white border-2 border-slate-900 text-xs sm:text-sm text-slate-900 font-semibold cursor-pointer outline-none"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-900 mb-1 uppercase tracking-wider">Khu vực tại FTU</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value as LocationArea)}
                className="w-full px-4 py-2.5 bg-white border-2 border-slate-900 text-xs sm:text-sm text-slate-900 font-semibold cursor-pointer outline-none"
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
            <label className="block text-xs font-black text-slate-900 mb-1 uppercase tracking-wider">Thời gian xảy ra</label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Ví dụ: 10:15 ca 2 sáng nay tại Tòa A"
              className="w-full px-4 py-2.5 bg-white border-2 border-slate-900 text-xs sm:text-sm text-slate-900 font-semibold"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-black text-slate-900 mb-1 uppercase tracking-wider">
              Mô tả đặc điểm đồ vật <span className="text-rose-600">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Mô tả chi tiết đặc điểm nhận dạng (lớp học, màu sắc, móc khóa, tem nhãn, giấy tờ bên trong...)"
              className="w-full px-4 py-2.5 bg-white border-2 border-slate-900 text-xs sm:text-sm text-slate-900 font-semibold"
              required
            />
          </div>

          {/* Image Preview */}
          <div>
            <label className="block text-xs font-black text-slate-900 mb-1 uppercase tracking-wider">Hình ảnh đính kèm</label>
            <div className="flex items-start gap-4">
              <div className="w-24 h-24 overflow-hidden bg-slate-100 border-2 border-slate-900 shrink-0 relative">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 space-y-2">
                <label className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-xs font-bold cursor-pointer hover:bg-slate-800 transition-colors">
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
                  <span className="text-[11px] text-slate-500 font-bold block mb-1">Hoặc dán URL ảnh trực tiếp:</span>
                  <input
                    type="text"
                    value={imagePreview}
                    onChange={(e) => setImagePreview(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-1.5 bg-white border border-slate-400 text-xs text-slate-900 font-medium"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          {(type === 'lost' || privacy === 'public') && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200">
              <div>
                <label className="block text-xs font-black text-slate-900 mb-1 uppercase tracking-wider">SĐT liên hệ</label>
                <input
                  type="text"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-slate-400 text-xs text-slate-900 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-900 mb-1 uppercase tracking-wider">Link Facebook / Zalo</label>
                <input
                  type="text"
                  value={contactSocial}
                  onChange={(e) => setContactSocial(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-slate-400 text-xs text-slate-900 font-semibold"
                />
              </div>
            </div>
          )}

          {/* Submit Footer */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t-2 border-slate-900">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-900 border-2 border-slate-900 font-extrabold text-xs transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-rose-900 hover:bg-rose-800 text-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.9)] font-extrabold text-xs transition-all flex items-center gap-2"
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
