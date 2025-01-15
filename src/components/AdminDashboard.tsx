import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const AdminDashboard = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [mediaList, setMediaList] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    media_type: "image",
    file: null as File | null,
  });

  useEffect(() => {
    fetchMedia();
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

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-primary mb-8">Admin Dashboard</h1>
      
      <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Upload Media</h2>
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
      </div>

      <div className="bg-white rounded-lg shadow-xl p-6">
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
    </div>
  );
};
