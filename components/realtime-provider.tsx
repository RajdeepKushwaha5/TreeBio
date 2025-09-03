"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { pusherClient, PUSHER_EVENTS, PUSHER_CHANNELS } from '@/lib/pusher';
import { dataService } from '@/lib/realtime-data-service';
import { toast } from 'sonner';
import { RealtimeContextType, User, Link, SocialLink, PusherEventData } from '@/types';

const RealtimeContext = createContext<RealtimeContextType | undefined>(undefined);

export function RealtimeProvider({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const [isConnected, setIsConnected] = useState(false);
  const [profileData, setProfileData] = useState<User | null>(null);
  const [links, setLinks] = useState<Link[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

  useEffect(() => {
    if (!user?.id || !pusherClient) return;

    // Subscribe to user-specific updates
    const userChannel = pusherClient.subscribe(PUSHER_CHANNELS.USER_CHANNEL(user.id));

    // Connection events
    pusherClient.connection.bind('connected', () => {
      setIsConnected(true);
      console.log('Connected to Pusher');
    });

    pusherClient.connection.bind('disconnected', () => {
      setIsConnected(false);
      console.log('Disconnected from Pusher');
    });

    // Profile updates
    userChannel.bind(PUSHER_EVENTS.PROFILE_UPDATED, (data: PusherEventData) => {
      console.log('Profile updated:', data);
      if (data.profile) {
        setProfileData(data.profile);
        toast.success('Profile updated in real-time!');
      }
    });

    // Link updates
    userChannel.bind(PUSHER_EVENTS.LINK_ADDED, (data: PusherEventData) => {
      console.log('Link added:', data);
      if (data.link) {
        setLinks(prev => [...prev, data.link!]);
        toast.success('New link added!');
      }
    });

    userChannel.bind(PUSHER_EVENTS.LINK_UPDATED, (data: PusherEventData) => {
      console.log('Link updated:', data);
      if (data.link) {
        setLinks(prev => prev.map(link => 
          link.id === data.link!.id ? data.link! : link
        ));
        toast.success('Link updated!');
      }
    });

    userChannel.bind(PUSHER_EVENTS.LINK_DELETED, (data: PusherEventData) => {
      console.log('Link deleted:', data);
      if (data.linkId) {
        setLinks(prev => prev.filter(link => link.id !== data.linkId));
        toast.success('Link removed!');
      }
    });

    // Social link updates
    userChannel.bind(PUSHER_EVENTS.SOCIAL_LINK_ADDED, (data: PusherEventData) => {
      console.log('Social link added:', data);
      if (data.socialLink) {
        setSocialLinks(prev => [...prev, data.socialLink!]);
        toast.success('Social link added!');
      }
    });

    userChannel.bind(PUSHER_EVENTS.SOCIAL_LINK_UPDATED, (data: PusherEventData) => {
      console.log('Social link updated:', data);
      if (data.socialLink) {
        setSocialLinks(prev => prev.map(link => 
          link.id === data.socialLink!.id ? data.socialLink! : link
        ));
        toast.success('Social link updated!');
      }
    });

    userChannel.bind(PUSHER_EVENTS.SOCIAL_LINK_DELETED, (data: PusherEventData) => {
      console.log('Social link deleted:', data);
      if (data.socialLinkId) {
        setSocialLinks(prev => prev.filter(link => link.id !== data.socialLinkId));
        toast.success('Social link removed!');
      }
    });

    // Initial data fetch
    refreshData();

    return () => {
      if (pusherClient && user?.id) {
        pusherClient.unsubscribe(PUSHER_CHANNELS.USER_CHANNEL(user.id));
      }
    };
  }, [user?.id]);

  const refreshData = async () => {
    try {
      const data = await dataService.getProfile();
      if (data.success) {
        setProfileData(data.user);
        setLinks(data.user.links || []);
        setSocialLinks(data.user.socialLinks || []);
      }
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
  };

  const updateProfile = async (profile: Partial<User>) => {
    try {
      await dataService.updateProfile(profile);
      // Real-time update will be handled by Pusher event
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const addLink = async (link: Omit<Link, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      await dataService.addLink(link);
      // Real-time update will be handled by Pusher event
    } catch (error) {
      console.error('Error adding link:', error);
    }
  };

  const updateLink = async (link: Link) => {
    try {
      await dataService.updateLink(link);
      // Real-time update will be handled by Pusher event
    } catch (error) {
      console.error('Error updating link:', error);
    }
  };

  const deleteLink = async (linkId: string) => {
    try {
      await dataService.deleteLink(linkId);
      // Real-time update will be handled by Pusher event
    } catch (error) {
      console.error('Error deleting link:', error);
    }
  };

  const addSocialLink = async (socialLink: Omit<SocialLink, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      await dataService.addSocialLink(socialLink);
      // Real-time update will be handled by Pusher event
    } catch (error) {
      console.error('Error adding social link:', error);
    }
  };

  const updateSocialLink = async (socialLink: SocialLink) => {
    try {
      await dataService.updateSocialLink(socialLink);
      // Real-time update will be handled by Pusher event
    } catch (error) {
      console.error('Error updating social link:', error);
    }
  };

  const deleteSocialLink = async (socialLinkId: string) => {
    try {
      await dataService.deleteSocialLink(socialLinkId);
      // Real-time update will be handled by Pusher event
    } catch (error) {
      console.error('Error deleting social link:', error);
    }
  };

  const contextValue: RealtimeContextType = {
    isConnected,
    profileData,
    links,
    socialLinks,
    refreshData,
    updateProfile,
    addLink,
    updateLink,
    deleteLink,
    addSocialLink,
    updateSocialLink,
    deleteSocialLink,
  };

  return (
    <RealtimeContext.Provider value={contextValue}>
      {children}
    </RealtimeContext.Provider>
  );
}

export function useRealtime() {
  const context = useContext(RealtimeContext);
  if (context === undefined) {
    throw new Error('useRealtime must be used within a RealtimeProvider');
  }
  return context;
}
