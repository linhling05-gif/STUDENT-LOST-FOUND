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
  | 'Nhà A (Giảng đường A)'
  | 'Nhà B (Giảng đường B)'
  | 'Thư viện FTU (Tầng 2-3 Nhà A)'
  | 'Căng tin FTU'
  | 'Nhà xe cổng Chùa Láng'
  | 'Sân nhà D / Sân thể thao'
  | 'Hội trường D201'
  | 'Ký túc xá FTU'
  | 'Khác';

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
