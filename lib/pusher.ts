import Pusher from 'pusher';
import PusherClient from 'pusher-js';

// Check if Pusher env vars are available - make this very safe
const isPusherConfigured = !!(
  process.env.PUSHER_APP_ID && 
  process.env.NEXT_PUBLIC_PUSHER_KEY && 
  process.env.PUSHER_SECRET && 
  process.env.NEXT_PUBLIC_PUSHER_CLUSTER
);

// Log Pusher configuration status
if (process.env.NODE_ENV === 'development') {
  console.log('Pusher configuration:', {
    configured: isPusherConfigured,
    hasAppId: !!process.env.PUSHER_APP_ID,
    hasKey: !!process.env.NEXT_PUBLIC_PUSHER_KEY,
    hasSecret: !!process.env.PUSHER_SECRET,
    hasCluster: !!process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
  });
}

// Server-side Pusher instance - completely safe initialization
export const pusherServer = isPusherConfigured ? (() => {
  try {
    const pusher = new Pusher({
      appId: process.env.PUSHER_APP_ID!,
      key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
      secret: process.env.PUSHER_SECRET!,
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      useTLS: true,
    });
    
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ Pusher server initialized successfully');
    }
    
    return pusher;
  } catch (error) {
    console.warn('⚠️ Failed to initialize Pusher server:', error);
    return null;
  }
})() : (() => {
  console.log('ℹ️ Pusher not configured - real-time features disabled');
  return null;
})();

// Client-side Pusher instance - safe for browser
export const pusherClient = isPusherConfigured && typeof window !== 'undefined' ? (() => {
  try {
    const client = new PusherClient(
      process.env.NEXT_PUBLIC_PUSHER_KEY!,
      {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
        forceTLS: true,
      }
    );
    
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ Pusher client initialized successfully');
    }
    
    return client;
  } catch (error) {
    console.warn('⚠️ Failed to initialize Pusher client:', error);
    return null;
  }
})() : null;

// Real-time event types
export const PUSHER_EVENTS = {
  PROFILE_UPDATED: 'profile-updated',
  LINK_ADDED: 'link-added',
  LINK_UPDATED: 'link-updated',
  LINK_DELETED: 'link-deleted',
  SOCIAL_LINK_ADDED: 'social-link-added',
  SOCIAL_LINK_UPDATED: 'social-link-updated',
  SOCIAL_LINK_DELETED: 'social-link-deleted',
  LINK_CLICKED: 'link-clicked',
  PROFILE_VIEWED: 'profile-viewed',
} as const;

// Channel names
export const PUSHER_CHANNELS = {
  USER_CHANNEL: (userId: string) => `private-user-${userId}`,
  PUBLIC_CHANNEL: (username: string) => `public-profile-${username}`,
} as const;

// Utility function to trigger real-time events - completely safe
export const triggerRealtimeEvent = async (
  channel: string,
  event: string,
  data: Record<string, unknown>
) => {
  try {
    if (!pusherServer) {
      if (process.env.NODE_ENV === 'development') {
        console.log('📡 Real-time event (no Pusher):', { channel, event, data });
      }
      return { success: true, message: 'Real-time disabled' };
    }
    
    await pusherServer.trigger(channel, event, data);
    
    if (process.env.NODE_ENV === 'development') {
      console.log('📡 Real-time event sent:', { channel, event });
    }
    
    return { success: true };
  } catch (error) {
    console.error('❌ Failed to trigger real-time event:', error);
    // Don't throw error - just log it
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};
