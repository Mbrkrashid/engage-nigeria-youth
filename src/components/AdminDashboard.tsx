import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, Upload } from "lucide-react";

export const AdminDashboard = () => {
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaTitle, setMediaTitle] = useState("");
  const [mediaDescription, setMediaDescription] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch events
  const { data: events, isLoading: eventsLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  // Fetch media
  const { data: media, isLoading: mediaLoading } = useQuery({
    queryKey: ["media"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("media")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  // Delete event mutation
  const deleteEventMutation = useMutation({
    mutationFn: async (eventId: string) => {
      const { error } = await supabase.from("events").delete().eq("id", eventId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast({
        title: "Event deleted",
        description: "The event has been successfully deleted.",
      });
    },
    onError: (error) => {
      console.error("Error deleting event:", error);
      toast({
        title: "Error",
        description: "Failed to delete event. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Delete media mutation
  const deleteMediaMutation = useMutation({
    mutationFn: async (mediaId: string) => {
      const { error } = await supabase.from("media").delete().eq("id", mediaId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["media"] });
      toast({
        title: "Media deleted",
        description: "The media item has been successfully deleted.",
      });
    },
    onError: (error) => {
      console.error("Error deleting media:", error);
      toast({
        title: "Error",
        description: "Failed to delete media. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Add event mutation
  const addEventMutation = useMutation({
    mutationFn: async (event: typeof newEvent) => {
      const { error } = await supabase.from("events").insert([event]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      setNewEvent({ title: "", description: "", date: "", location: "" });
      toast({
        title: "Event added",
        description: "The event has been successfully added.",
      });
    },
    onError: (error) => {
      console.error("Error adding event:", error);
      toast({
        title: "Error",
        description: "Failed to add event. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Upload media mutation
  const uploadMediaMutation = useMutation({
    mutationFn: async () => {
      if (!mediaFile) throw new Error("No file selected");

      // Upload file to storage
      const fileExt = mediaFile.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("media")
        .upload(fileName, mediaFile);
      if (uploadError) throw uploadError;

      // Create media record
      const { error: insertError } = await supabase.from("media").insert([
        {
          title: mediaTitle,
          description: mediaDescription,
          media_type: mediaFile.type.startsWith("image/") ? "image" : "video",
          url: fileName,
        },
      ]);
      if (insertError) throw insertError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["media"] });
      setMediaFile(null);
      setMediaTitle("");
      setMediaDescription("");
      toast({
        title: "Media uploaded",
        description: "The media has been successfully uploaded.",
      });
    },
    onError: (error) => {
      console.error("Error uploading media:", error);
      toast({
        title: "Error",
        description: "Failed to upload media. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMediaFile(e.target.files[0]);
    }
  };

  const handleEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEventMutation.mutate(newEvent);
  };

  const handleMediaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    uploadMediaMutation.mutate();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <Tabs defaultValue="events" className="space-y-4">
        <TabsList>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
        </TabsList>

        <TabsContent value="events">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Add New Event</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleEventSubmit} className="space-y-4">
                  <Input
                    placeholder="Event Title"
                    value={newEvent.title}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, title: e.target.value })
                    }
                    required
                  />
                  <Textarea
                    placeholder="Event Description"
                    value={newEvent.description}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, description: e.target.value })
                    }
                    required
                  />
                  <Input
                    type="datetime-local"
                    value={newEvent.date}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, date: e.target.value })
                    }
                    required
                  />
                  <Input
                    placeholder="Location"
                    value={newEvent.location}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, location: e.target.value })
                    }
                    required
                  />
                  <Button type="submit" disabled={addEventMutation.isPending}>
                    {addEventMutation.isPending ? "Adding..." : "Add Event"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Events List</CardTitle>
              </CardHeader>
              <CardContent>
                {eventsLoading ? (
                  <div>Loading events...</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {events?.map((event) => (
                        <TableRow key={event.id}>
                          <TableCell>{event.title}</TableCell>
                          <TableCell>
                            {new Date(event.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>{event.location}</TableCell>
                          <TableCell>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => deleteEventMutation.mutate(event.id)}
                              disabled={deleteEventMutation.isPending}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="media">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Upload Media</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleMediaSubmit} className="space-y-4">
                  <Input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    required
                  />
                  <Input
                    placeholder="Media Title"
                    value={mediaTitle}
                    onChange={(e) => setMediaTitle(e.target.value)}
                    required
                  />
                  <Textarea
                    placeholder="Media Description"
                    value={mediaDescription}
                    onChange={(e) => setMediaDescription(e.target.value)}
                    required
                  />
                  <Button
                    type="submit"
                    disabled={uploadMediaMutation.isPending || !mediaFile}
                  >
                    {uploadMediaMutation.isPending ? (
                      "Uploading..."
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Media
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Media Gallery</CardTitle>
              </CardHeader>
              <CardContent>
                {mediaLoading ? (
                  <div>Loading media...</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {media?.map((item) => (
                      <div
                        key={item.id}
                        className="relative group overflow-hidden rounded-lg"
                      >
                        {item.media_type === "image" ? (
                          <img
                            src={`${
                              supabase.storage
                                .from("media")
                                .getPublicUrl(item.url).data.publicUrl
                            }`}
                            alt={item.title}
                            className="w-full h-48 object-cover"
                          />
                        ) : (
                          <video
                            src={`${
                              supabase.storage
                                .from("media")
                                .getPublicUrl(item.url).data.publicUrl
                            }`}
                            className="w-full h-48 object-cover"
                            controls
                          />
                        )}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteMediaMutation.mutate(item.id)}
                            disabled={deleteMediaMutation.isPending}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="p-2">
                          <h3 className="font-semibold">{item.title}</h3>
                          <p className="text-sm text-gray-600">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};