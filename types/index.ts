// Core type definitions for TreeBio application

export interface User {
  id: string;
  clerkId: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  email: string;
  username?: string;
  bio?: string;
  themeId?: string;
  customTheme?: Record<string, unknown>;
  customDomain?: string;
  avatar?: string;
  displayName?: string;
  title?: string;
  location?: string;
  website?: string;
  isPublic: boolean;
  isVerified: boolean;
  lastActive: Date;
  profileViewCount: number;
  linkClicks: number;
  createdAt: Date;
  updatedAt: Date;
  links?: Link[];
  socialLinks?: SocialLink[];
  collections?: Collection[];
}

export interface Link {
  id: string;
  title: string;
  url: string;
  clickCount: number;
  userId: string;
  description?: string;
  shortUrl?: string;
  isActive: boolean;
  isVisible: boolean;
  sortOrder: number;
  startDate?: Date;
  endDate?: Date;
  thumbnail?: string;
  favicon?: string;
  lastClickAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  username?: string;
  isVisible: boolean;
  sortOrder: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Collection {
  id: string;
  name: string;
  description?: string;
  isPublic: boolean;
  tags: string[];
  customTheme?: Record<string, unknown>;
  sortOrder: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LinkAnalytics {
  id: string;
  linkId: string;
  clickedAt: Date;
  clickerIp: string;
  userAgent?: string;
  referrer?: string;
  country?: string;
  city?: string;
  device?: string;
  browser?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProfileAnalytics {
  id: string;
  userId: string;
  visitedAt: Date;
  visitorIp: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ShortUrl {
  id: string;
  shortCode: string;
  originalUrl: string;
  linkId?: string;
  userId?: string;
  clicks: number;
  isActive: boolean;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Theme {
  id: string;
  name: string;
  displayName: string;
  config: Record<string, unknown>;
  isDefault: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomDomain {
  id: string;
  userId: string;
  domain: string;
  isActive: boolean;
  isVerified: boolean;
  verificationMethod: string;
  verificationToken: string;
  sslValid: boolean;
  lastHealthCheck?: Date;
  isAccessible: boolean;
  responseTime?: number;
  createdAt: Date;
  updatedAt: Date;
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Realtime context types
export interface RealtimeContextType {
  isConnected: boolean;
  profileData: User | null;
  links: Link[];
  socialLinks: SocialLink[];
  refreshData: () => Promise<void>;
  updateProfile: (profile: Partial<User>) => Promise<void>;
  addLink: (link: Omit<Link, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateLink: (link: Link) => Promise<void>;
  deleteLink: (linkId: string) => Promise<void>;
  addSocialLink: (socialLink: Omit<SocialLink, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateSocialLink: (socialLink: SocialLink) => Promise<void>;
  deleteSocialLink: (socialLinkId: string) => Promise<void>;
}

// Pusher event types
export interface PusherEventData {
  profile?: User;
  link?: Link;
  socialLink?: SocialLink;
  linkId?: string;
  socialLinkId?: string;
  user?: User;
  [key: string]: unknown;
}

// Form types
export interface ProfileFormData {
  firstName?: string;
  lastName?: string;
  displayName?: string;
  bio?: string;
  title?: string;
  location?: string;
  website?: string;
  username?: string;
  avatar?: string;
}

export interface LinkFormData {
  title: string;
  url: string;
  description?: string;
  isVisible?: boolean;
  startDate?: Date;
  endDate?: Date;
}

export interface SocialLinkFormData {
  platform: string;
  url: string;
  username?: string;
  isVisible?: boolean;
}

// QR Code types
export interface QRCodeOptions {
  size?: number;
  bgColor?: string;
  fgColor?: string;
  level?: 'L' | 'M' | 'Q' | 'H';
  includeMargin?: boolean;
}

// Analytics types
export interface AnalyticsData {
  totalClicks: number;
  totalViews: number;
  clicksToday: number;
  viewsToday: number;
  topLinks: Array<{
    id: string;
    title: string;
    clicks: number;
  }>;
  clicksByDate: Array<{
    date: string;
    clicks: number;
  }>;
  viewsByDate: Array<{
    date: string;
    views: number;
  }>;
  deviceStats: Array<{
    device: string;
    count: number;
  }>;
  browserStats: Array<{
    browser: string;
    count: number;
  }>;
  countryStats: Array<{
    country: string;
    count: number;
  }>;
}
