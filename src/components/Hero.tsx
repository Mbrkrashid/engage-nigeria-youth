import { useEffect, useState } from "react";
import { FloatingElement } from "./hero/FloatingElement";
import { HeroContent } from "./hero/HeroContent";
import { HeroImage } from "./hero/HeroImage";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

export const Hero = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [voterEducation, setVoterEducation] = useState<any[]>([]);
  const [media, setMedia] = useState<any[]>([]);

  useEffect(() => {
    fetchAdminContent();
  }, []);

  const fetchAdminContent = async () => {
    try {
      // Fetch events
      const { data: eventsData } = await supabase
        .from("events")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3);
      
      // Fetch voter education
      const { data: educationData } = await supabase
        .from("voter_education")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3);
      
      // Fetch media
      const { data: mediaData } = await supabase
        .from("media")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3);

      setEvents(eventsData || []);
      setVoterEducation(educationData || []);
      setMedia(mediaData || []);
    } catch (error) {
      console.error("Error fetching admin content:", error);
    }
  };

  return (
    <div className="min-h-[100vh] bg-gradient-to-r from-primary to-primary/90 text-white flex items-center relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat opacity-20" />
      </div>

      {/* Floating elements with enhanced animations */}
      <FloatingElement
        className="absolute top-10 right-10 w-20 h-20 bg-accent/20 rounded-full blur-lg"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        duration={8}
      />
      <FloatingElement
        className="absolute bottom-10 left-10 w-32 h-32 bg-secondary/20 rounded-full blur-lg"
        animate={{
          x: [0, -40, 0],
          y: [0, -20, 0],
          scale: [1, 1.3, 1],
          rotate: [360, 180, 0],
        }}
        duration={10}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <HeroContent adminContent={{ events, voterEducation, media }} />
          <HeroImage />
        </div>
      </div>
    </div>
  );
};