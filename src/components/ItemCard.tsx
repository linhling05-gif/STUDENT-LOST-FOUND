import React, { useState } from 'react';
import { Item } from '../types';
import {
  MapPin,
  Clock,
  Lock,
  Unlock,
  CheckCircle2,
  Heart,
  MessageSquare,
  Share2,
  Send,
  AlertCircle,
  ArrowRight,
  User,
} from 'lucide-react';

interface ItemCardProps {
  item: Item;
  onSelect: (item: Item) => void;
  onToggleLike: (itemId: string) => void;
  onAddComment: (itemId: string, content: string) => void;
  addToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  onSelect,
  onToggleLike,
  onAddComment,
  addToast,
}) => {
  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState('');

  const isResolved = item.status === 'resolved';
  const isLost = item.type === 'lost';
  const isPublic = item.privacy === 'public';
  const comments = item.comments || [];
  const likesCount = item.likesCount || 0;
  const userLiked = !!item.userLiked;

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    onAddComment(item.id, commentInput.trim());
    setCommentInput('');
    addToast('Thành công', 'Đã thêm bình luận của bạn!', 'success');
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(window.location.href);
    addToast('Chia sẻ', 'Đã sao chép liên kết bài viết vào khay nhớ tạm!', 'info');
  };

  return (
    <article
      className={`bg-white border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,0.9)] mb-6 transition-all ${
        isResolved ? 'opacity-85' : ''
      }`}
    >
      {/* 1. Social Post Header */}
      <div className="p-4 border-b border-slate-200 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Author Avatar - Sharp Square */}
          {item.authorAvatar ? (
            <img
              src={item.authorAvatar}
              alt={item.contactName}
              className="w-10 h-10 object-cover border-2 border-slate-900 shrink-0"
            />
          ) : (
            <div className="w-10 h-10 bg-rose-900 text-white font-bold text-sm flex items-center justify-center border-2 border-slate-900 shrink-0">
              {item.contactName.charAt(0)}
            </div>
          )}

          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-extrabold text-slate-900 text-sm hover:text-rose-900 cursor-pointer">
                {item.contactName}
              </h4>
              {item.authorClass && (
                <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 border border-slate-300">
                  {item.authorClass}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mt-0.5">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {item.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-slate-700 font-semibold">
                <MapPin className="w-3.5 h-3.5 text-rose-700" />
                {item.location}
              </span>
            </div>
          </div>
        </div>

        {/* Badges Sharp */}
        <div className="flex flex-col items-end gap-1 shrink-0">
          {isResolved ? (
            <span className="bg-slate-100 text-slate-700 border border-slate-400 px-2 py-0.5 text-[11px] font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-slate-600" />
              ĐÃ GIẢI QUYẾT
            </span>
          ) : isLost ? (
            <span className="bg-rose-100 text-rose-900 border border-rose-400 px-2 py-0.5 text-[11px] font-extrabold flex items-center gap-1">
              <span className="w-2 h-2 bg-rose-600 animate-pulse" />
              CẦN TÌM (LOST)
            </span>
          ) : (
            <span className="bg-emerald-100 text-emerald-900 border border-emerald-400 px-2 py-0.5 text-[11px] font-extrabold flex items-center gap-1">
              <span className="w-2 h-2 bg-emerald-600" />
              NHẶT ĐƯỢC (FOUND)
            </span>
          )}

          <span className="bg-slate-900 text-white px-2 py-0.5 text-[10px] font-bold tracking-wide">
            {item.category}
          </span>
        </div>
      </div>

      {/* 2. Post Main Body Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3
          onClick={() => onSelect(item)}
          className="text-base font-black text-slate-900 hover:text-rose-900 cursor-pointer leading-snug"
        >
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line font-medium">
          {item.description}
        </p>

        {/* Image Attachment Sharp */}
        {item.imageUrl && (
          <div
            onClick={() => onSelect(item)}
            className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-900 border-2 border-slate-900 cursor-pointer group"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
              loading="lazy"
            />
            <div className="absolute top-2 right-2">
              {!isLost && !isResolved && (
                isPublic ? (
                  <span className="bg-emerald-800 text-white text-[10px] font-bold px-2 py-1 flex items-center gap-1 border border-white">
                    <Unlock className="w-3 h-3" /> SĐT Công khai
                  </span>
                ) : (
                  <span className="bg-amber-700 text-white text-[10px] font-bold px-2 py-1 flex items-center gap-1 border border-white">
                    <Lock className="w-3 h-3" /> Thông tin Ẩn
                  </span>
                )
              )}
            </div>
          </div>
        )}
      </div>

      {/* 3. Social Interaction Stats & Action Bar */}
      <div className="px-4 py-2 bg-slate-50 border-t border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-600">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onToggleLike(item.id)}
            className={`flex items-center gap-1.5 transition-colors py-1 px-2 border ${
              userLiked
                ? 'bg-rose-100 text-rose-900 border-rose-400'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
          >
            <Heart className={`w-4 h-4 ${userLiked ? 'fill-rose-700 text-rose-700' : ''}`} />
            <span>{likesCount} Quan tâm</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1.5 py-1 px-2 bg-white text-slate-700 border border-slate-300 hover:bg-slate-100 transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-slate-600" />
            <span>{comments.length} Bình luận</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-1.5 bg-white text-slate-700 border border-slate-300 hover:bg-slate-100 transition-colors"
            title="Chia sẻ bài viết"
          >
            <Share2 className="w-4 h-4" />
          </button>

          <button
            onClick={() => onSelect(item)}
            className="py-1.5 px-3 bg-rose-900 hover:bg-rose-800 text-white font-extrabold flex items-center gap-1 transition-colors"
          >
            <span>{isLost ? 'Chi tiết / Liên hệ' : 'Yêu cầu nhận lại'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 4. Expandable Inline Comments Section */}
      {showComments && (
        <div className="p-4 bg-slate-100 border-t border-slate-300 space-y-3">
          <h5 className="text-xs font-black text-slate-700 uppercase tracking-wider">
            Bình luận ({comments.length})
          </h5>

          {/* List of comments */}
          {comments.length > 0 ? (
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {comments.map((comment) => (
                <div key={comment.id} className="p-2.5 bg-white border border-slate-300 flex items-start gap-2.5">
                  {comment.authorAvatar ? (
                    <img
                      src={comment.authorAvatar}
                      alt={comment.authorName}
                      className="w-7 h-7 object-cover border border-slate-900 shrink-0"
                    />
                  ) : (
                    <div className="w-7 h-7 bg-slate-800 text-white font-bold text-[10px] flex items-center justify-center border border-slate-900 shrink-0">
                      {comment.authorName.charAt(0)}
                    </div>
                  )}

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900">{comment.authorName}</span>
                        {comment.authorClass && (
                          <span className="text-[10px] text-slate-500 font-semibold bg-slate-100 px-1 border border-slate-200">
                            {comment.authorClass}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400">{comment.createdAt.substring(11, 16)}</span>
                    </div>
                    <p className="text-xs text-slate-800 mt-1 leading-snug">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic">Chưa có bình luận nào. Hãy là người đầu tiên bình luận!</p>
          )}

          {/* Add comment form */}
          <form onSubmit={handleSendComment} className="flex gap-2 pt-2 border-t border-slate-200">
            <input
              type="text"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Viết bình luận cho sinh viên FTU..."
              className="flex-1 px-3 py-2 bg-white border border-slate-400 text-xs text-slate-900 placeholder-slate-400 focus:border-rose-900 outline-none"
            />
            <button
              type="submit"
              className="px-3 py-2 bg-rose-900 text-white font-bold text-xs flex items-center gap-1 hover:bg-rose-800 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Gửi</span>
            </button>
          </form>
        </div>
      )}
    </article>
  );
};
