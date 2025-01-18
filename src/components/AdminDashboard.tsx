import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { MediaUploadForm } from "./admin/MediaUploadForm";
import { MediaList } from "./admin/MediaList";
import { EventsList } from "./admin/EventsList";
import { VoterEducationList } from "./admin/VoterEducationList";

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [mediaList, setMediaList] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [voterEducation, setVoterEducation] = useState<any[]>([]);

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
      .order("created_at", { ascending: false });

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

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      {isAdmin && <MediaUploadForm onSuccess={fetchMedia} />}
      
      <Tabs defaultValue="media" className="mt-8">
        <TabsList className="w-full">
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="education">Voter Education</TabsTrigger>
        </TabsList>
        
        <TabsContent value="media">
          <MediaList mediaList={mediaList} />
        </TabsContent>
        
        <TabsContent value="events">
          <EventsList events={events} />
        </TabsContent>
        
        <TabsContent value="education">
          <VoterEducationList voterEducation={voterEducation} />
        </TabsContent>
      </Tabs>
    </div>
  );
};