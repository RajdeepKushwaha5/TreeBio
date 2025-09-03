"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

import { 
  Archive,
  Search,
  RotateCcw,
  Trash2,
  Eye,
  Calendar,
  Link2,
  FolderOpen,
  Download,
  Loader2,
  RefreshCw
} from "lucide-react";
import {
  getArchivedLinks,
  getArchiveStats,
  restoreArchivedLink,
  deleteArchivedLink
} from "@/modules/archive/actions";

interface ArchivedLinkData {
  id: string;
  title: string;
  url: string;
  archivedAt: Date;
  originalClicks: number;
  reason?: string;
  userId: string;
}

interface ArchiveStats {
  archivedLinksCount: number;
  archivedLinksClicks: number;
  totalLinksCount: number;
  activeLinksCount: number;
  archiveRatio: number;
}

export default function ArchivePageClient() {
  const [archivedLinks, setArchivedLinks] = useState<ArchivedLinkData[]>([]);
  const [filteredLinks, setFilteredLinks] = useState<ArchivedLinkData[]>([]);
  const [stats, setStats] = useState<ArchiveStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLinks, setSelectedLinks] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'date' | 'clicks' | 'name'>('date');
  const [filterBy, setFilterBy] = useState<'all' | 'thisWeek' | 'thisMonth' | 'thisYear'>('all');

  // Fetch archived data
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [linksData, statsData] = await Promise.all([
        getArchivedLinks(),
        getArchiveStats()
      ]);
      
      setArchivedLinks(linksData.links);
      setFilteredLinks(linksData.links);
      setStats(statsData);
    } catch (error) {
      console.error("Error fetching archive data:", error);
      toast.error("Failed to load archive data");
    } finally {
      setLoading(false);
    }
  }, []);

  // Toggle link selection
  const toggleLinkSelection = (linkId: string) => {
    setSelectedLinks(prev => 
      prev.includes(linkId) 
        ? prev.filter(id => id !== linkId)
        : [...prev, linkId]
    );
  };

  // Handle restore link
  const handleRestore = async (linkId: string) => {
    try {
      setActionLoading(linkId);
      const result = await restoreArchivedLink(linkId);
      
      if (result.success) {
        toast.success("Link restored successfully");
        // Remove from local state
        setArchivedLinks(prev => prev.filter(link => link.id !== linkId));
        setSelectedLinks(prev => prev.filter(id => id !== linkId));
      } else {
        toast.error(result.message || "Failed to restore link");
      }
    } catch (error) {
      console.error("Error restoring link:", error);
      toast.error("Failed to restore link");
    } finally {
      setActionLoading(null);
    }
  };

  // Handle delete link
  const handleDelete = async (linkId: string) => {
    if (!confirm("Are you sure you want to permanently delete this link? This action cannot be undone.")) {
      return;
    }

    try {
      setActionLoading(linkId);
      const result = await deleteArchivedLink(linkId);
      
      if (result.success) {
        toast.success("Link deleted permanently");
        // Remove from local state
        setArchivedLinks(prev => prev.filter(link => link.id !== linkId));
        setSelectedLinks(prev => prev.filter(id => id !== linkId));
      } else {
        toast.error(result.message || "Failed to delete link");
      }
    } catch (error) {
      console.error("Error deleting link:", error);
      toast.error("Failed to delete link");
    } finally {
      setActionLoading(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Filter and search logic
  useEffect(() => {
    let filtered = [...archivedLinks];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(link => 
        link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        link.url.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply date filter
    const now = new Date();
    switch (filterBy) {
      case 'thisWeek':
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        filtered = filtered.filter(link => new Date(link.archivedAt) >= weekAgo);
        break;
      case 'thisMonth':
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        filtered = filtered.filter(link => new Date(link.archivedAt) >= monthAgo);
        break;
      case 'thisYear':
        const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        filtered = filtered.filter(link => new Date(link.archivedAt) >= yearAgo);
        break;
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.archivedAt).getTime() - new Date(a.archivedAt).getTime();
        case 'clicks':
          return b.originalClicks - a.originalClicks;
        case 'name':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    setFilteredLinks(filtered);
  }, [archivedLinks, searchTerm, filterBy, sortBy]);

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin mx-auto" />
            <p className="text-muted-foreground">Loading archived data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Archive className="h-8 w-8 text-muted-foreground" />
          <div>
            <h1 className="text-3xl font-bold">Archive</h1>
            <p className="text-muted-foreground">
              Manage your archived links and data
            </p>
          </div>
        </div>
        <Button onClick={fetchData} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Archived Links
                  </p>
                  <p className="text-2xl font-bold">{stats.archivedLinksCount}</p>
                </div>
                <FolderOpen className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Archived Clicks
                  </p>
                  <p className="text-2xl font-bold">{stats.archivedLinksClicks}</p>
                </div>
                <Eye className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Active Links
                  </p>
                  <p className="text-2xl font-bold">{stats.activeLinksCount}</p>
                </div>
                <Calendar className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Archive Ratio
                  </p>
                  <p className="text-2xl font-bold">{Math.round(stats.archiveRatio)}%</p>
                </div>
                <Download className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs defaultValue="links" className="w-full">
        <TabsList className="grid w-full grid-cols-1">
          <TabsTrigger value="links">Archived Links</TabsTrigger>
        </TabsList>

        <TabsContent value="links" className="space-y-4">
          {/* Filters and Search */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search archived links..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFilterBy('all')}
                    className={filterBy === 'all' ? 'bg-accent' : ''}
                  >
                    All
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFilterBy('thisWeek')}
                    className={filterBy === 'thisWeek' ? 'bg-accent' : ''}
                  >
                    This Week
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFilterBy('thisMonth')}
                    className={filterBy === 'thisMonth' ? 'bg-accent' : ''}
                  >
                    This Month
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSortBy('date')}
                    className={sortBy === 'date' ? 'bg-accent' : ''}
                  >
                    Sort by Date
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSortBy('clicks')}
                    className={sortBy === 'clicks' ? 'bg-accent' : ''}
                  >
                    Sort by Clicks
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSortBy('name')}
                    className={sortBy === 'name' ? 'bg-accent' : ''}
                  >
                    Sort by Name
                  </Button>
                </div>
              </div>

              {selectedLinks.length > 0 && (
                <div className="flex items-center justify-between bg-accent/50 p-3 rounded-lg">
                  <span className="text-sm font-medium">
                    {selectedLinks.length} link(s) selected
                  </span>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {}}
                    disabled={actionLoading === "bulk"}
                  >
                    {actionLoading === "bulk" ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4 mr-2" />
                    )}
                    Delete Selected
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Archived Links List */}
          <Card>
            <CardContent className="p-0">
              {filteredLinks.length === 0 ? (
                <div className="text-center py-12">
                  <Archive className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No archived links found</h3>
                  <p className="text-muted-foreground">
                    {searchTerm || filterBy !== 'all' 
                      ? "Try adjusting your search or filter criteria"
                      : "You haven't archived any links yet"
                    }
                  </p>
                </div>
              ) : (
                <div className="divide-y">
                  {filteredLinks.map((link) => (
                    <div key={link.id} className="p-6 hover:bg-accent/50 transition-colors">
                      <div className="flex items-start justify-between space-x-4">
                        <div className="flex items-start space-x-3 flex-1">
                          <input
                            type="checkbox"
                            checked={selectedLinks.includes(link.id)}
                            onChange={() => toggleLinkSelection(link.id)}
                            className="mt-1"
                          />
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-2">
                              <Link2 className="h-4 w-4 text-muted-foreground" />
                              <h3 className="font-medium truncate">{link.title}</h3>
                              <Badge variant="secondary" className="text-xs">
                                {link.originalClicks} clicks
                              </Badge>
                            </div>
                            
                            <p className="text-sm text-muted-foreground truncate mb-2">
                              {link.url}
                            </p>
                            
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                              <span>
                                Archived {new Date(link.archivedAt).toLocaleDateString()}
                              </span>
                              {link.reason && (
                                <span>Reason: {link.reason}</span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRestore(link.id)}
                            disabled={actionLoading === link.id}
                          >
                            {actionLoading === link.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <RotateCcw className="h-4 w-4" />
                            )}
                            Restore
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(link.id)}
                            disabled={actionLoading === link.id}
                          >
                            {actionLoading === link.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
