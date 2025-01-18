import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [mediaList, setMediaList] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [voterEducation, setVoterEducation] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    media_type: "image",
    file: null as File | null,
  });

  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });

  const [educationData, setEducationData] = useState({
    title: "",
    content: "",
    category: "",
  });

  const [accountData, setAccountData] = useState({
    bankName: "",
    accountNumber: "",
    accountName: "",
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        file: e.target.files![0],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) {
      toast({
        variant: "destructive",
        title: "Unauthorized",
        description: "You don't have permission to perform this action.",
      });
      return;
    }

    setIsLoading(true);

    try {
      if (!formData.file) {
        throw new Error("Please select a file to upload");
      }

      const fileExt = formData.file.name.split(".").pop();
      const filePath = `${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("media")
        .upload(filePath, formData.file);

      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase.from("media").insert([{
        title: formData.title,
        description: formData.description,
        media_type: formData.media_type,
        url: filePath,
      }]);

      if (dbError) throw dbError;

      toast({
        title: "Success!",
        description: "Media uploaded successfully.",
      });

      setFormData({
        title: "",
        description: "",
        media_type: "image",
        file: null,
      });

      fetchMedia();
    } catch (error) {
      console.error("Error uploading media:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to upload media.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <Textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <Input type="file" onChange={handleFileChange} />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Uploading..." : "Upload Media"}
        </Button>
      </form>
      <Tabs>
        <TabsList>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="education">Voter Education</TabsTrigger>
        </TabsList>
        <TabsContent value="media">
          {mediaList.map((media) => (
            <Card key={media.id}>
              <CardHeader>
                <CardTitle>{media.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{media.description}</p>
                <img src={media.url} alt={media.title} />
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="events">
          {events.map((event) => (
            <Card key={event.id}>
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{event.description}</p>
                <p>{event.date}</p>
                <p>{event.location}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="education">
          {voterEducation.map((education) => (
            <Card key={education.id}>
              <CardHeader>
                <CardTitle>{education.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{education.content}</p>
                <p>{education.category}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};
