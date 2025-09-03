import { PrismaClient } from "@prisma/client"

// Declare global prisma for hot reloading
declare global {
  var __prisma: PrismaClient | undefined
}

// Define comprehensive mock database interface
interface MockDatabase {
  user: {
    upsert: (args: unknown) => Promise<{ 
      id: string; 
      clerkId: string; 
      displayName?: string; 
      bio?: string; 
      avatar?: string; 
      username?: string; 
      title?: string; 
      location?: string; 
      website?: string; 
    }>;
    findFirst: (args: unknown) => Promise<{ 
      id: string; 
      clerkId: string; 
      username?: string | null; 
      bio?: string | null; 
      firstName?: string | null; 
      lastName?: string | null; 
      imageUrl?: string | null; 
      email?: string | null;
      createdAt: Date;
      updatedAt: Date;
      links: { 
        id: string; 
        title: string; 
        url: string; 
        clickCount: number; 
        userId: string; 
        createdAt: Date; 
        updatedAt: Date; 
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
      }[];
      socialLinks: { 
        id: string; 
        platform: string; 
        url: string; 
        username?: string; 
        isVisible: boolean; 
        sortOrder: number; 
        userId: string; 
        createdAt: Date; 
        updatedAt: Date;
      }[];
    } | null>;
    findUnique: (args: unknown) => Promise<{
      id: string;
      clerkId: string;
      username?: string | null;
      bio?: string | null;
      firstName?: string | null;
      lastName?: string | null;
      imageUrl?: string | null;
      email?: string | null;
      createdAt: Date;
      updatedAt: Date;
      links?: { 
        id: string; 
        title: string; 
        url: string; 
        clickCount: number; 
        createdAt: Date; 
        sortOrder: number; 
      }[];
      socialLinks?: { 
        id: string; 
        platform: string; 
        url: string; 
      }[];
    } | null>;
    create: (args: unknown) => Promise<{ id: string; clerkId: string }>;
    update: (args: unknown) => Promise<{ 
      id: string; 
      clerkId: string; 
      displayName?: string; 
      bio?: string; 
      avatar?: string; 
      username?: string; 
      title?: string; 
      location?: string; 
      website?: string; 
    }>;
    delete: (args: unknown) => Promise<{ id: string; clerkId: string }>;
    findMany: (args?: unknown) => Promise<unknown[]>;
    count: (args?: unknown) => Promise<number>;
    aggregate: (args: unknown) => Promise<{ _sum: { clickCount: number } }>;
  };
  link: {
    create: (args: unknown) => Promise<{ id: string; title: string; url: string; clickCount: number }>;
    update: (args: unknown) => Promise<{ id: string; title: string; url: string; clickCount: number }>;
    delete: (args: unknown) => Promise<{ id: string }>;
    findUnique: (args: unknown) => Promise<{ id: string; title: string; url: string; clickCount: number } | null>;
    findFirst: (args: unknown) => Promise<{ id: string; title: string; url: string; clickCount: number; sortOrder?: number } | null>;
    findMany: (args?: unknown) => Promise<{ id: string; title: string; url: string; clickCount: number; sortOrder?: number; createdAt: Date }[]>;
    count: (args?: unknown) => Promise<number>;
    aggregate: (args: unknown) => Promise<{ _sum: { clickCount: number } }>;
  };
  socialLink: {
    create: (args: unknown) => Promise<{ id: string; platform: string; url: string }>;
    update: (args: unknown) => Promise<{ id: string; platform: string; url: string }>;
    delete: (args: unknown) => Promise<{ id: string }>;
    findMany: (args?: unknown) => Promise<{ id: string; platform: string; url: string }[]>;
    findFirst: (args: unknown) => Promise<{ id: string; platform: string; url: string; sortOrder: number } | null>;
    upsert: (args: unknown) => Promise<{ id: string; platform: string; url: string }>;
  };
  shortUrl: {
    create: (args: unknown) => Promise<{ 
      id: string; 
      shortCode: string; 
      originalUrl: string; 
      clickCount: number; 
      createdAt: Date; 
      updatedAt: Date; 
      userId: string | null; 
      linkId: string | null; 
      isActive: boolean; 
      clicks: number; 
      expiresAt: Date | null; 
    }>;
    update: (args: unknown) => Promise<{ id: string; shortCode: string; originalUrl: string; clickCount: number }>;
    delete: (args: unknown) => Promise<{ id: string }>;
    findUnique: (args: unknown) => Promise<{ 
      id: string; 
      shortCode: string; 
      originalUrl: string; 
      clickCount: number; 
      createdAt: Date; 
      updatedAt: Date; 
      userId: string | null; 
      linkId: string | null; 
      isActive: boolean; 
      clicks: number; 
      expiresAt: Date | null; 
    } | null>;
    findMany: (args?: unknown) => Promise<{ 
      id: string; 
      shortCode: string; 
      originalUrl: string; 
      clickCount: number; 
      createdAt: Date; 
      updatedAt: Date; 
      userId: string | null; 
      linkId: string | null; 
      isActive: boolean; 
      clicks: number; 
      expiresAt: Date | null; 
    }[]>;
  };
  profileAnalytics: {
    create: (args: unknown) => Promise<{ id: string; userId: string; visitedAt: Date; visitorIp: string }>;
    findMany: (args?: unknown) => Promise<{ id: string; userId: string; visitedAt: Date; visitorIp: string }[]>;
    findFirst: (args: unknown) => Promise<{ id: string; userId: string; visitedAt: Date; visitorIp: string } | null>;
    count: (args?: unknown) => Promise<number>;
    groupBy: (args: unknown) => Promise<unknown[]>;
  };
  linkAnalytics: {
    create: (args: unknown) => Promise<{ 
      id: string; 
      createdAt: Date; 
      updatedAt: Date; 
      linkId: string; 
      clickedAt: Date; 
      clickerIp: string; 
      userAgent: string | null; 
      referrer: string | null; 
      country: string | null; 
      city: string | null; 
      device: string | null; 
      browser: string | null; 
    }>;
    findMany: (args?: unknown) => Promise<{ 
      id: string; 
      createdAt: Date; 
      updatedAt: Date; 
      linkId: string; 
      clickedAt: Date; 
      clickerIp: string; 
      userAgent: string | null; 
      referrer: string | null; 
      country: string | null; 
      city: string | null; 
      device: string | null; 
      browser: string | null; 
    }[]>;
    count: (args?: unknown) => Promise<number>;
    groupBy: (args: unknown) => Promise<unknown[]>;
  };
  $transaction: <T>(fn: (tx: MockDatabase) => Promise<T>) => Promise<T>;
}

// Mock database implementation for development
const mockDb: MockDatabase = {
  user: {
    upsert: async () => ({ 
      id: 'mock-user-1', 
      clerkId: 'mock-clerk-1', 
      displayName: 'Mock User', 
      bio: undefined, 
      avatar: undefined, 
      username: 'mockuser', 
      title: undefined, 
      location: undefined, 
      website: undefined 
    }),
    findFirst: async () => ({ 
      id: 'mock-user-1', 
      clerkId: 'mock-clerk-1', 
      username: 'mockuser',
      bio: null,
      firstName: null,
      lastName: null,
      imageUrl: null,
      email: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      links: [],
      socialLinks: []
    }),
    findUnique: async () => ({ 
      id: 'mock-user-1', 
      clerkId: 'mock-clerk-1', 
      username: 'mockuser',
      bio: null,
      firstName: null,
      lastName: null,
      imageUrl: null,
      email: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      links: [],
      socialLinks: []
    }),
    create: async () => ({ id: 'mock-user-1', clerkId: 'mock-clerk-1' }),
    update: async () => ({ 
      id: 'mock-user-1', 
      clerkId: 'mock-clerk-1', 
      displayName: 'Mock User', 
      bio: undefined, 
      avatar: undefined, 
      username: 'mockuser', 
      title: undefined, 
      location: undefined, 
      website: undefined 
    }),
    delete: async () => ({ id: 'mock-user-1', clerkId: 'mock-clerk-1' }),
    findMany: async () => [],
    count: async () => 0,
    aggregate: async () => ({ _sum: { clickCount: 0 } })
  },
  link: {
    create: async () => ({ id: 'mock-link-1', title: 'Mock Link', url: 'https://example.com', clickCount: 0 }),
    update: async () => ({ id: 'mock-link-1', title: 'Mock Link', url: 'https://example.com', clickCount: 0 }),
    delete: async () => ({ id: 'mock-link-1' }),
    findUnique: async () => ({ id: 'mock-link-1', title: 'Mock Link', url: 'https://example.com', clickCount: 0 }),
    findFirst: async () => ({ id: 'mock-link-1', title: 'Mock Link', url: 'https://example.com', clickCount: 0, sortOrder: 0 }),
    findMany: async () => [],
    count: async () => 0,
    aggregate: async () => ({ _sum: { clickCount: 0 } })
  },
  socialLink: {
    create: async () => ({ id: 'mock-social-1', platform: 'twitter', url: 'https://twitter.com/mock' }),
    update: async () => ({ id: 'mock-social-1', platform: 'twitter', url: 'https://twitter.com/mock' }),
    delete: async () => ({ id: 'mock-social-1' }),
    findMany: async () => [],
    findFirst: async () => ({ id: 'mock-social-1', platform: 'twitter', url: 'https://twitter.com/mock', sortOrder: 0 }),
    upsert: async () => ({ id: 'mock-social-1', platform: 'twitter', url: 'https://twitter.com/mock' })
  },
  shortUrl: {
    create: async () => ({ 
      id: 'mock-short-1', 
      shortCode: 'abc123', 
      originalUrl: 'https://example.com', 
      clickCount: 0, 
      createdAt: new Date(), 
      updatedAt: new Date(), 
      userId: null, 
      linkId: null, 
      isActive: true, 
      clicks: 0, 
      expiresAt: null 
    }),
    update: async () => ({ id: 'mock-short-1', shortCode: 'abc123', originalUrl: 'https://example.com', clickCount: 0 }),
    delete: async () => ({ id: 'mock-short-1' }),
    findUnique: async () => ({ 
      id: 'mock-short-1', 
      shortCode: 'abc123', 
      originalUrl: 'https://example.com', 
      clickCount: 0, 
      createdAt: new Date(), 
      updatedAt: new Date(), 
      userId: null, 
      linkId: null, 
      isActive: true, 
      clicks: 0, 
      expiresAt: null 
    }),
    findMany: async () => []
  },
  profileAnalytics: {
    create: async () => ({ id: 'mock-analytics-1', userId: 'mock-user-1', visitedAt: new Date(), visitorIp: '127.0.0.1' }),
    findMany: async () => [],
    findFirst: async () => ({ id: 'mock-analytics-1', userId: 'mock-user-1', visitedAt: new Date(), visitorIp: '127.0.0.1' }),
    count: async () => 0,
    groupBy: async () => []
  },
  linkAnalytics: {
    create: async () => ({ 
      id: 'mock-link-analytics-1', 
      createdAt: new Date(),
      updatedAt: new Date(),
      linkId: 'mock-link-1', 
      clickedAt: new Date(), 
      clickerIp: '127.0.0.1',
      userAgent: null,
      referrer: null,
      country: null,
      city: null,
      device: null,
      browser: null
    }),
    findMany: async () => [],
    count: async () => 0,
    groupBy: async () => []
  },
  $transaction: async <T>(fn: (tx: MockDatabase) => Promise<T>) => {
    return fn(mockDb);
  }
};

// Check if we have a real Prisma client or use mock
let db: PrismaClient | MockDatabase

if (process.env.NODE_ENV === 'production') {
  db = new PrismaClient()
} else {
  if (!global.__prisma) {
    try {
      global.__prisma = new PrismaClient()
    } catch (error) {
      console.warn('Failed to initialize Prisma client, using mock database')
      global.__prisma = mockDb as any
    }
  }
  db = global.__prisma!
}

export { db }