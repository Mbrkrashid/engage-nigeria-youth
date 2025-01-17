import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const AdminDashboard = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
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
    fetchMedia();
    fetchEvents();
    fetchVoterEducation();
  }, []);

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
        description: "Failed to upload media. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.from("events").insert([eventData]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Event created successfully.",
      });

      setEventData({
        title: "",
        description: "",
        date: "",
        location: "",
      });

      fetchEvents();
    } catch (error) {
      console.error("Error creating event:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create event. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEducationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.from("voter_education").insert([educationData]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Voter education content created successfully.",
      });

      setEducationData({
        title: "",
        content: "",
        category: "",
      });

      fetchVoterEducation();
    } catch (error) {
      console.error("Error creating voter education:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create voter education content. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-primary mb-8">Admin Dashboard</h1>
      
      <Tabs defaultValue="media" className="space-y-6">
        <TabsList className="grid grid-cols-4 gap-4">
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="education">Voter Education</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        <TabsContent value="media">
          <Card>
            <CardHeader>
              <CardTitle>Upload Media</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-2">
                    Title *
                  </label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-2">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                <div>
                  <label htmlFor="media_type" className="block text-sm font-medium mb-2">
                    Media Type *
                  </label>
                  <select
                    id="media_type"
                    value={formData.media_type}
                    onChange={(e) => setFormData((prev) => ({ ...prev, media_type: e.target.value }))}
                    className="w-full border rounded-md p-2"
                    required
                  >
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="file" className="block text-sm font-medium mb-2">
                    File *
                  </label>
                  <Input
                    id="file"
                    type="file"
                    onChange={handleFileChange}
                    accept={formData.media_type === "image" ? "image/*" : "video/*"}
                    required
                  />
                </div>

                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Uploading..." : "Upload Media"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Media Library</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {mediaList.map((media) => (
                <div key={media.id} className="rounded-lg overflow-hidden shadow-md">
                  {media.media_type === "image" ? (
                    <img
                      src={`${supabase.storage.from("media").getPublicUrl(media.url).data.publicUrl}`}
                      alt={media.title}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <video
                      src={`${supabase.storage.from("media").getPublicUrl(media.url).data.publicUrl}`}
                      className="w-full h-48 object-cover"
                      controls
                    />
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold">{media.title}</h3>
                    <p className="text-sm text-gray-600">{media.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle>Create Event</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleEventSubmit} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-2">
                    Title *
                  </label>
                  <Input
                    id="title"
                    value={eventData.title}
                    onChange={(e) => setEventData((prev) => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-2">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    value={eventData.description}
                    onChange={(e) => setEventData((prev) => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                <div>
                  <label htmlFor="date" className="block text-sm font-medium mb-2">
                    Date *
                  </label>
                  <Input
                    id="date"
                    type="datetime-local"
                    value={eventData.date}
                    onChange={(e) => setEventData((prev) => ({ ...prev, date: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium mb-2">
                    Location
                  </label>
                  <Input
                    id="location"
                    value={eventData.location}
                    onChange={(e) => setEventData((prev) => ({ ...prev, location: e.target.value }))}
                  />
                </div>

                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Event"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Events List</h2>
            <div className="grid gap-4">
              {events.map((event) => (
                <Card key={event.id}>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{event.title}</h3>
                    <p className="text-sm text-gray-600">{event.description}</p>
                    <div className="mt-2 text-sm">
                      <p>Date: {new Date(event.date).toLocaleString()}</p>
                      <p>Location: {event.location}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="education">
          <Card>
            <CardHeader>
              <CardTitle>Create Voter Education Content</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleEducationSubmit} className="space-y-4">
                <div>
                  <label htmlFor="edu-title" className="block text-sm font-medium mb-2">
                    Title *
                  </label>
                  <Input
                    id="edu-title"
                    value={educationData.title}
                    onChange={(e) => setEducationData((prev) => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="edu-content" className="block text-sm font-medium mb-2">
                    Content *
                  </label>
                  <Textarea
                    id="edu-content"
                    value={educationData.content}
                    onChange={(e) => setEducationData((prev) => ({ ...prev, content: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium mb-2">
                    Category *
                  </label>
                  <Input
                    id="category"
                    value={educationData.category}
                    onChange={(e) => setEducationData((prev) => ({ ...prev, category: e.target.value }))}
                    required
                  />
                </div>

                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Content"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Voter Education Content</h2>
            <div className="grid gap-4">
              {voterEducation.map((content) => (
                <Card key={content.id}>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{content.title}</h3>
                    <p className="text-sm text-gray-600">{content.content}</p>
                    <p className="text-sm text-gray-500 mt-2">Category: {content.category}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Bank Account Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <label htmlFor="bank-name" className="block text-sm font-medium mb-2">
                    Bank Name
                  </label>
                  <Input
                    id="bank-name"
                    value={accountData.bankName}
                    onChange={(e) => setAccountData((prev) => ({ ...prev, bankName: e.target.value }))}
                  />
                </div>

                <div>
                  <label htmlFor="account-number" className="block text-sm font-medium mb-2">
                    Account Number
                  </label>
                  <Input
                    id="account-number"
                    value={accountData.accountNumber}
                    onChange={(e) => setAccountData((prev) => ({ ...prev, accountNumber: e.target.value }))}
                  />
                </div>

                <div>
                  <label htmlFor="account-name" className="block text-sm font-medium mb-2">
                    Account Name
                  </label>
                  <Input
                    id="account-name"
                    value={accountData.accountName}
                    onChange={(e) => setAccountData((prev) => ({ ...prev, accountName: e.target.value }))}
                  />
                </div>

                <Button type="submit">Save Account Information</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
