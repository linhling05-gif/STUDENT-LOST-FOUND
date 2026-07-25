import React, { useState, useEffect, useMemo } from 'react';
import { Item, ClaimRequest, ToastMessage } from './types';
import { INITIAL_ITEMS, INITIAL_CLAIMS } from './data/mockData';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { ItemCard } from './components/ItemCard';
import { ItemDetailModal } from './components/ItemDetailModal';
import { CreatePostModal } from './components/CreatePostModal';
import { DashboardDrawer } from './components/DashboardDrawer';
import { ToastContainer } from './components/ToastContainer';
import { GraduationCap, Inbox } from 'lucide-react';

export function App() {
  // Local storage persisted state - re-initialize with v3 without Nha V
  const [items, setItems] = useState<Item[]>(() => {
    const saved = localStorage.getItem('unifind_ftu_items_v3');
    return saved ? JSON.parse(saved) : INITIAL_ITEMS;
  });

  const [claims, setClaims] = useState<ClaimRequest[]>(() => {
    const saved = localStorage.getItem('unifind_ftu_claims_v3');
    return saved ? JSON.parse(saved) : INITIAL_CLAIMS;
  });

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('unifind_ftu_items_v3', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('unifind_ftu_claims_v3', JSON.stringify(claims));
  }, [claims]);

  // UI state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'lost' | 'found' | 'resolved'>('all');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

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
  }, [items, activeTab, selectedCategory, selectedLocation, searchQuery]);

  const handleCreatePost = (newPostData: Omit<Item, 'id' | 'createdAt' | 'status'>) => {
    const newPost: Item = {
      ...newPostData,
      id: `item-${Date.now()}`,
      status: 'active',
      createdAt: new Date().toISOString(),
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
    <div className="min-h-screen flex flex-col bg-[#F4FAFD]">
      {/* Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
        onOpenDashboard={() => setIsDashboardOpen(true)}
        myPostsCount={myPostsCount}
        pendingClaimsCount={pendingClaimsCount}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* FTU Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden mb-8 p-6 sm:p-8 bg-gradient-to-br from-rose-950 via-red-900 to-rose-900 text-white shadow-xl border border-rose-800/40">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-300 border border-white/15 text-xs font-bold mb-3">
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>Cộng đồng FTUers • Trường Đại học Ngoại thương Hà Nội</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Tìm lại đồ thất lạc dễ dàng tại FTU (91 Chùa Láng)
            </h1>
            <p className="mt-2.5 text-xs sm:text-sm text-rose-100 font-medium leading-relaxed">
              Kênh thông tin trực tuyến dành riêng cho sinh viên Ngoại thương kết nối tìm lại Thẻ sinh viên FTU, Ví tiền, Chìa khóa xe, AirPods, Giáo trình... tại Giảng đường A, B, Thư viện và Căng tin FTU.
            </p>
          </div>
        </div>

        {/* Filter Bar Component */}
        <FilterBar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          totalCount={filteredItems.length}
          onReset={() => {
            setActiveTab('all');
            setSelectedCategory('');
            setSelectedLocation('');
            setSearchQuery('');
          }}
        />

        {/* Grid Feed Section */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 px-4 glass-card rounded-3xl my-6">
            <Inbox className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-800">Không tìm thấy bài viết phù hợp tại FTU</h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-1">
              Thử tìm theo từ khóa khác hoặc đặt lại bộ lọc để xem các bài tin khác của sinh viên Ngoại thương.
            </p>
            <button
              onClick={() => {
                setActiveTab('all');
                setSelectedCategory('');
                setSelectedLocation('');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-rose-700 text-white font-bold text-xs hover:bg-rose-800 transition-colors"
            >
              Đặt lại tất cả bộ lọc
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <ItemCard key={item.id} item={item} onSelect={setSelectedItem} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full glass-panel border-t border-rose-100/60 mt-16 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-rose-900">UniFind FTU Hanoi</span>
            <span>• Nền tảng Tìm đồ Thất lạc ĐH Ngoại thương</span>
          </div>
          <div className="flex items-center gap-1 text-slate-600 font-medium">
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
