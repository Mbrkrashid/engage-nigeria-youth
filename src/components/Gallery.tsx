import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

export const Gallery = () => {
  const [media, setMedia] = useState<any[]>([]);

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

    setMedia(data || []);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
          Our Gallery
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {media.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-lg overflow-hidden shadow-lg bg-white"
            >
              {item.media_type === "image" ? (
                <img
                  src={`${supabase.storage.from("media").getPublicUrl(item.url).data.publicUrl}`}
                  alt={item.title}
                  className="w-full h-64 object-cover"
                />
              ) : (
                <video
                  src={`${supabase.storage.from("media").getPublicUrl(item.url).data.publicUrl}`}
                  controls
                  className="w-full h-64 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                {item.description && (
                  <p className="text-gray-600">{item.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};