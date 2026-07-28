import React, { useState, useEffect, useMemo } from 'react';
import { Item, ClaimRequest, ToastMessage, Comment } from './types';
import { INITIAL_ITEMS, INITIAL_CLAIMS } from './data/mockData';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { ItemCard } from './components/ItemCard';
import { QuickPostBox } from './components/QuickPostBox';
import { LeftSidebar } from './components/LeftSidebar';
import { RightSidebar } from './components/RightSidebar';
import { ItemDetailModal } from './components/ItemDetailModal';
import { CreatePostModal } from './components/CreatePostModal';
import { DashboardDrawer } from './components/DashboardDrawer';
import { ToastContainer } from './components/ToastContainer';
import { GraduationCap, Inbox } from 'lucide-react';

export function App() {
  // Local storage persisted state - v8
  const [items, setItems] = useState<Item[]>(() => {
    const saved = localStorage.getItem('unifind_ftu_items_v8');
    return saved ? JSON.parse(saved) : INITIAL_ITEMS;
  });

  const [claims, setClaims] = useState<ClaimRequest[]>(() => {
    const saved = localStorage.getItem('unifind_ftu_claims_v8');
    return saved ? JSON.parse(saved) : INITIAL_CLAIMS;
  });

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('unifind_ftu_items_v8', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('unifind_ftu_claims_v8', JSON.stringify(claims));
  }, [claims]);

  // UI state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'lost' | 'found' | 'resolved'>('all');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Modals
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (
    title: string,
    message: string,
    type: 'success' | 'info' | 'warning' | 'error' = 'success'
  ) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Filter items logic
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (activeTab === 'lost' && (item.type !== 'lost' || item.status === 'resolved')) return false;
      if (activeTab === 'found' && (item.type !== 'found' || item.status === 'resolved')) return false;
      if (activeTab === 'resolved' && item.status !== 'resolved') return false;

      if (selectedCategory && item.category !== selectedCategory) return false;
      if (selectedLocation && item.location !== selectedLocation) return false;

      // Date Range Filter logic
      if (startDate) {
        const itemTime = new Date(item.createdAt).getTime();
        const startMs = new Date(`${startDate}T00:00:00`).getTime();
        if (itemTime < startMs) return false;
      }

      if (endDate) {
        const itemTime = new Date(item.createdAt).getTime();
        const endMs = new Date(`${endDate}T23:59:59.999`).getTime();
        if (itemTime > endMs) return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchLoc = item.location.toLowerCase().includes(q);
        const matchCat = item.category.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchLoc && !matchCat) return false;
      }

      return true;
    });
  }, [items, activeTab, selectedCategory, selectedLocation, startDate, endDate, searchQuery]);

  // Social Actions
  const handleToggleLike = (itemId: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const userLiked = !item.userLiked;
          const likesCount = (item.likesCount || 0) + (userLiked ? 1 : -1);
          return { ...item, userLiked, likesCount };
        }
        return item;
      })
    );
  };

  const handleAddComment = (itemId: string, content: string) => {
    const newComment: Comment = {
      id: `c-${Date.now()}`,
      itemId,
      authorName: 'FTU Student',
      authorClass: 'K61 FTU Hanoi',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      content,
      createdAt: new Date().toISOString(),
    };

    setItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const comments = [newComment, ...(item.comments || [])];
          return { ...item, comments };
        }
        return item;
      })
    );
  };

  const handleCreatePost = (newPostData: Omit<Item, 'id' | 'createdAt' | 'status'>) => {
    const newPost: Item = {
      ...newPostData,
      id: `item-${Date.now()}`,
      status: 'active',
      createdAt: new Date().toISOString(),
      likesCount: 0,
      userLiked: false,
      comments: [],
    };
    setItems((prev) => [newPost, ...prev]);
  };

  const handleSubmitClaim = (itemId: string, phone: string, message: string) => {
    const newClaim: ClaimRequest = {
      id: `claim-${Date.now()}`,
      itemId,
      requesterPhone: phone,
      requesterMessage: message,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };
    setClaims((prev) => [newClaim, ...prev]);
  };

  const handleToggleResolveStatus = (itemId: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? { ...item, status: item.status === 'resolved' ? 'active' : 'resolved' }
          : item
      )
    );
  };

  const handleDeletePost = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
    setClaims((prev) => prev.filter((claim) => claim.itemId !== itemId));
  };

  const myPostsCount = items.filter((i) => i.ownerId === 'current-user').length;
  const myItemIds = items.filter((i) => i.ownerId === 'current-user').map((i) => i.id);
  const pendingClaimsCount = claims.filter((c) => myItemIds.includes(c.itemId)).length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900">
      {/* Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
        onOpenDashboard={() => setIsDashboardOpen(true)}
        myPostsCount={myPostsCount}
        pendingClaimsCount={pendingClaimsCount}
      />

      {/* Main Social Container - 3 Column Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-12 gap-6 items-start">
          {/* Left Column: Social Profile & Category Navigation */}
          <div className="hidden lg:block lg:col-span-3 sticky top-24">
            <LeftSidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              onOpenDashboard={() => setIsDashboardOpen(true)}
              myPostsCount={myPostsCount}
            />
          </div>

          {/* Center Column: Social News Feed Stream (Scroll top to bottom) */}
          <div className="col-span-12 lg:col-span-9 xl:col-span-6 space-y-6">
            {/* FTU Hero Banner - Sharp Brutalist style */}
            <div className="bg-rose-900 text-white p-6 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,0.9)]">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white text-rose-950 font-black text-xs border border-slate-900 mb-3">
                <GraduationCap className="w-4 h-4 text-rose-900" />
                <span>MẠNG XÃ HỘI TÌM ĐỒ THẤT LẠC • FTU HANOI</span>
              </div>
              <h1 className="text-xl sm:text-3xl font-black tracking-tight leading-tight">
                UniFind FTU Hanoi (91 Chùa Láng)
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-rose-100 font-semibold leading-relaxed">
                Đăng tin, thả tim và trao đổi trực tiếp với bạn bè Ngoại thương để tìm lại đồ thất lạc nhanh chóng!
              </p>
            </div>

            {/* Quick Post Creator Box */}
            <QuickPostBox onOpenCreateModal={() => setIsCreateModalOpen(true)} />

            {/* Filter Bar Component */}
            <FilterBar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              totalCount={filteredItems.length}
              onReset={() => {
                setActiveTab('all');
                setSelectedCategory('');
                setSelectedLocation('');
                setSearchQuery('');
                setStartDate('');
                setEndDate('');
              }}
            />

            {/* Social News Feed Stream */}
            {filteredItems.length === 0 ? (
              <div className="text-center py-16 px-4 bg-white border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,0.9)] my-6">
                <Inbox className="w-14 h-14 text-slate-400 mx-auto mb-3" />
                <h3 className="text-base font-black text-slate-900">Không tìm thấy bài viết phù hợp</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto mt-1 font-semibold">
                  Thử tìm theo từ khóa khác hoặc đặt lại bộ lọc để xem các bài đăng khác của sinh viên FTU.
                </p>
                <button
                  onClick={() => {
                    setActiveTab('all');
                    setSelectedCategory('');
                    setSelectedLocation('');
                    setSearchQuery('');
                    setStartDate('');
                    setEndDate('');
                  }}
                  className="mt-4 px-4 py-2 bg-rose-900 text-white font-extrabold text-xs hover:bg-rose-800 transition-colors border border-slate-900"
                >
                  Đặt lại tất cả bộ lọc
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredItems.map((item) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    onSelect={setSelectedItem}
                    onToggleLike={handleToggleLike}
                    onAddComment={handleAddComment}
                    addToast={addToast}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Widgets, Urgent Items, Impact Stats */}
          <div className="hidden xl:block xl:col-span-3 sticky top-24">
            <RightSidebar items={items} onSelectItem={setSelectedItem} />
          </div>
        </div>
      </main>

      {/* Footer Sharp */}
      <footer className="w-full bg-white border-t-2 border-slate-900 mt-16 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-700 font-semibold">
          <div className="flex items-center gap-2">
            <span className="font-black text-rose-900">UniFind FTU Social Feed</span>
            <span>• Nền tảng Mạng xã hội Tìm đồ Thất lạc ĐH Ngoại thương</span>
          </div>
          <div className="flex items-center gap-1 text-slate-600 font-bold">
            <span>Địa chỉ: 91 Chùa Láng, Đống Đa, Hà Nội</span>
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <ItemDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onSubmitClaim={handleSubmitClaim}
        addToast={addToast}
      />

      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmitPost={handleCreatePost}
        addToast={addToast}
      />

      <DashboardDrawer
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        items={items}
        claims={claims}
        onToggleResolveStatus={handleToggleResolveStatus}
        onDeletePost={handleDeletePost}
        addToast={addToast}
      />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
