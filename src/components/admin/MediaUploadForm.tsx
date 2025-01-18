import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const MediaUploadForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    media_type: "image",
    file: null as File | null,
  });

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

      onSuccess();
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
    <form onSubmit={handleSubmit} className="space-y-4">
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
  );
};