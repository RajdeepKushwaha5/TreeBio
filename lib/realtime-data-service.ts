// Real-time data service for TreeBio
import { toast } from 'sonner';
import { User, Link, SocialLink } from '@/types';

class RealtimeDataService {
  private baseUrl = '/api';

  // Profile operations
  async updateProfile(profile: Partial<User>) {
    try {
      const response = await fetch(`${this.baseUrl}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const data = await response.json();
      toast.success('Profile updated successfully!');
      return data;
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
      throw error;
    }
  }

  async getProfile() {
    try {
      const response = await fetch(`${this.baseUrl}/profile`);

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  }

  // Link operations
  async addLink(link: Omit<Link, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
      const response = await fetch(`${this.baseUrl}/links`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(link),
      });

      if (!response.ok) {
        throw new Error('Failed to add link');
      }

      const data = await response.json();
      toast.success('Link added successfully!');
      return data;
    } catch (error) {
      console.error('Error adding link:', error);
      toast.error('Failed to add link');
      throw error;
    }
  }

  async updateLink(link: Link) {
    try {
      const response = await fetch(`${this.baseUrl}/links`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(link),
      });

      if (!response.ok) {
        throw new Error('Failed to update link');
      }

      const data = await response.json();
      toast.success('Link updated successfully!');
      return data;
    } catch (error) {
      console.error('Error updating link:', error);
      toast.error('Failed to update link');
      throw error;
    }
  }

  async deleteLink(linkId: string) {
    try {
      const response = await fetch(`${this.baseUrl}/links?id=${linkId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete link');
      }

      const data = await response.json();
      toast.success('Link deleted successfully!');
      return data;
    } catch (error) {
      console.error('Error deleting link:', error);
      toast.error('Failed to delete link');
      throw error;
    }
  }

  // Social link operations
  async addSocialLink(socialLink: Omit<SocialLink, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
      const response = await fetch(`${this.baseUrl}/social-links`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(socialLink),
      });

      if (!response.ok) {
        throw new Error('Failed to add social link');
      }

      const data = await response.json();
      toast.success('Social link added successfully!');
      return data;
    } catch (error) {
      console.error('Error adding social link:', error);
      toast.error('Failed to add social link');
      throw error;
    }
  }

  async updateSocialLink(socialLink: SocialLink) {
    try {
      const response = await fetch(`${this.baseUrl}/social-links`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(socialLink),
      });

      if (!response.ok) {
        throw new Error('Failed to update social link');
      }

      const data = await response.json();
      toast.success('Social link updated successfully!');
      return data;
    } catch (error) {
      console.error('Error updating social link:', error);
      toast.error('Failed to update social link');
      throw error;
    }
  }

  async deleteSocialLink(socialLinkId: string) {
    try {
      const response = await fetch(`${this.baseUrl}/social-links?id=${socialLinkId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete social link');
      }

      const data = await response.json();
      toast.success('Social link deleted successfully!');
      return data;
    } catch (error) {
      console.error('Error deleting social link:', error);
      toast.error('Failed to delete social link');
      throw error;
    }
  }
}

export const dataService = new RealtimeDataService();
