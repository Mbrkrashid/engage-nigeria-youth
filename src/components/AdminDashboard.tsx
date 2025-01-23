import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { MediaUploadForm } from "./admin/MediaUploadForm";
import { MediaList } from "./admin/MediaList";
import { EventsList } from "./admin/EventsList";
import { VoterEducationList } from "./admin/VoterEducationList";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [mediaList, setMediaList] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [voterEducation, setVoterEducation] = useState<any[]>([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
        return;
      }

      const { data: adminData } = await supabase
        .from('admin_users')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (!adminData) {
        toast({
          variant: "destructive",
          title: "Unauthorized",
          description: "You don't have permission to access this page.",
        });
        navigate('/');
        return;
      }

      setIsAdmin(true);
      fetchMedia();
      fetchEvents();
      fetchVoterEducation();
    } catch (error) {
      console.error('Error checking admin status:', error);
      navigate('/');
    }
  };

  const fetchMedia = async () => {
    const { data, error } = await supabase
      .from("media")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching media:", error);
      return;
    }

    setMediaList(data || []);
  };

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: true });

    if (error) {
      console.error("Error fetching events:", error);
      return;
    }

    setEvents(data || []);
  };

  const fetchVoterEducation = async () => {
    const { data, error } = await supabase
      .from("voter_education")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching voter education:", error);
      return;
    }

    setVoterEducation(data || []);
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from("events")
        .insert([newEvent]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Event added successfully",
      });
      
      setNewEvent({
        title: "",
        description: "",
        date: "",
        location: "",
      });
      
      fetchEvents();
    } catch (error) {
      console.error("Error adding event:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add event",
      });
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    try {
      const { error } = await supabase
        .from("events")
        .delete()
        .eq("id", eventId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Event deleted successfully",
      });
      
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete event",
      });
    }
  };

  const handleDeleteMedia = async (mediaId: string) => {
    try {
      const { error } = await supabase
        .from("media")
        .delete()
        .eq("id", mediaId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Media deleted successfully",
      });
      
      fetchMedia();
    } catch (error) {
      console.error("Error deleting media:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete media",
      });
    }
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <Tabs defaultValue="events" className="mt-8">
        <TabsList className="w-full">
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="education">Voter Education</TabsTrigger>
        </TabsList>
        
        <TabsContent value="events">
          <div className="space-y-6">
            <form onSubmit={handleAddEvent} className="space-y-4 bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold">Add New Event</h3>
              <Input
                placeholder="Event Title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                required
              />
              <Textarea
                placeholder="Event Description"
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                required
              />
              <Input
                type="datetime-local"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                required
              />
              <Input
                placeholder="Location"
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                required
              />
              <Button type="submit">Add Event</Button>
            </form>
            
            <EventsList events={events} onDelete={handleDeleteEvent} />
          </div>
        </TabsContent>
        
        <TabsContent value="media">
          <div className="space-y-6">
            <MediaUploadForm onSuccess={fetchMedia} />
            <MediaList mediaList={mediaList} onDelete={handleDeleteMedia} />
          </div>
        </TabsContent>
        
        <TabsContent value="education">
          <VoterEducationList voterEducation={voterEducation} />
        </TabsContent>
      </Tabs>
    </div>
  );
};