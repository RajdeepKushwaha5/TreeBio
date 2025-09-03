// Fallback implementation without Pusher for immediate functionality
// This provides professional features without requiring Pusher setup

"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';
import { RealtimeContextType, User, Link, SocialLink } from '@/types';

const RealtimeContext = createContext<RealtimeContextType | undefined>(undefined);

export function RealtimeProvider({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const [isConnected, setIsConnected] = useState(true); // Always connected in fallback mode
  const [profileData, setProfileData] = useState<User | null>(null);
  const [links, setLinks] = useState<Link[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

  const refreshData = useCallback(async () => {
    try {
      // For now, just set some default data
      // In a real implementation, this would fetch from API
      if (user) {
        setProfileData({
          id: 'mock-id',
          clerkId: user.id,
          email: user.primaryEmailAddress?.emailAddress || '',
          firstName: user.firstName || undefined,
          lastName: user.lastName || undefined,
          imageUrl: user.imageUrl || undefined,
          username: user.username || undefined,
          bio: 'Your bio description goes here...',
          isPublic: true,
          isVerified: false,
          lastActive: new Date(),
          profileViewCount: 0,
          linkClicks: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
      
      // Set some default links and social links
      setLinks([]);
      setSocialLinks([]);
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
  }, [user]);

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    // Simulate connection
    setIsConnected(true);
    console.log('Real-time provider initialized (fallback mode)');

    // Initial data fetch
    refreshData();
  }, [user?.id, refreshData]);

  const updateProfile = async (profile: Partial<User>) => {
    try {
      // Update local state immediately for optimistic UI
      setProfileData(prev => prev ? { ...prev, ...profile } : null);
      toast.success('Profile updated!');
      
      // In a real implementation, this would make API call
      console.log('Profile updated:', profile);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  const addLink = async (link: Omit<Link, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newLink: Link = { 
        ...link, 
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      setLinks(prev => [...prev, newLink]);
      toast.success('Link added!');
      console.log('Link added:', newLink);
    } catch (error) {
      console.error('Error adding link:', error);
      toast.error('Failed to add link');
    }
  };

  const updateLink = async (link: Link) => {
    try {
      setLinks(prev => prev.map(l => l.id === link.id ? link : l));
      toast.success('Link updated!');
      console.log('Link updated:', link);
    } catch (error) {
      console.error('Error updating link:', error);
      toast.error('Failed to update link');
    }
  };

  const deleteLink = async (linkId: string) => {
    try {
      setLinks(prev => prev.filter(l => l.id !== linkId));
      toast.success('Link removed!');
      console.log('Link deleted:', linkId);
    } catch (error) {
      console.error('Error deleting link:', error);
      toast.error('Failed to delete link');
    }
  };

  const addSocialLink = async (socialLink: Omit<SocialLink, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newSocialLink: SocialLink = { 
        ...socialLink, 
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      setSocialLinks(prev => [...prev, newSocialLink]);
      toast.success('Social link added!');
      console.log('Social link added:', newSocialLink);
    } catch (error) {
      console.error('Error adding social link:', error);
      toast.error('Failed to add social link');
    }
  };

  const updateSocialLink = async (socialLink: SocialLink) => {
    try {
      setSocialLinks(prev => prev.map(l => l.id === socialLink.id ? socialLink : l));
      toast.success('Social link updated!');
      console.log('Social link updated:', socialLink);
    } catch (error) {
      console.error('Error updating social link:', error);
      toast.error('Failed to update social link');
    }
  };

  const deleteSocialLink = async (socialLinkId: string) => {
    try {
      setSocialLinks(prev => prev.filter(l => l.id !== socialLinkId));
      toast.success('Social link removed!');
      console.log('Social link deleted:', socialLinkId);
    } catch (error) {
      console.error('Error deleting social link:', error);
      toast.error('Failed to delete social link');
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
