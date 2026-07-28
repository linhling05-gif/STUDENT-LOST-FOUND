export type ItemType = 'lost' | 'found';
export type ItemStatus = 'active' | 'resolved';
export type PrivacyMode = 'public' | 'hidden';

export type Category = 
  | 'Thẻ sinh viên FTU'
  | 'Ví tiền / Bóp'
  | 'Tai nghe Bluetooth'
  | 'Chìa khóa xe'
  | 'Giáo trình / Tài liệu FTU'
  | 'Thẻ ATM / Ngân hàng'
  | 'Laptop / Thiết bị'
  | 'Khác';

export type LocationArea =
  | 'Tòa A'
  | 'Tòa B'
  | 'Thư viện FTU'
  | 'Căng tin FTU'
  | 'Nhà xe'
  | 'Cổng trường'
  | 'Sân nhà D'
  | 'Hội trường D201'
  | 'Ký túc xá FTU'
  | 'Khác';

export interface Comment {
  id: string;
  itemId: string;
  authorName: string;
  authorClass?: string;
  authorAvatar?: string;
  content: string;
  createdAt: string;
}

export interface Item {
  id: string;
  type: ItemType;
  title: string;
  category: Category;
  location: LocationArea | string;
  date: string;
  description: string;
  imageUrl: string;
  privacy: PrivacyMode;
  status: ItemStatus;
  contactName: string;
  contactPhone?: string;
  contactSocial?: string;
  ownerId: string;
  createdAt: string;
  // Social feed fields
  authorClass?: string;
  authorAvatar?: string;
  likesCount?: number;
  userLiked?: boolean;
  comments?: Comment[];
  isUrgent?: boolean;
}

export interface ClaimRequest {
  id: string;
  itemId: string;
  requesterPhone: string;
  requesterMessage: string;
  createdAt: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

