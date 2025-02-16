
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { DonateButton } from "@/components/DonateButton";
import { ImpactStats } from "./ImpactStats";

interface AdminContent {
  events: any[];
  voterEducation: any[];
  media: any[];
}

interface HeroContentProps {
  adminContent: AdminContent;
}

export const HeroContent = ({ adminContent }: HeroContentProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="text-left space-y-6"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-bold leading-tight"
      >
        TarauniForJa'oji 2027
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-2">Youth Empowerment</h3>
            <p className="text-sm opacity-80">Building future leaders through skills and knowledge</p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-2">Community Development</h3>
            <p className="text-sm opacity-80">Creating positive impact in our communities</p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-2">Democratic Participation</h3>
            <p className="text-sm opacity-80">Encouraging active civic engagement</p>
          </div>
        </div>

        {adminContent.events.length > 0 && (
          <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm mt-4">
            <h3 className="text-xl font-semibold mb-2">Upcoming Events</h3>
            {adminContent.events.map((event) => (
              <div key={event.id} className="mb-2">
                <h4 className="font-medium">{event.title}</h4>
                <p className="text-sm opacity-80">{event.description}</p>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Button
          asChild
          className="bg-secondary hover:bg-secondary/90 text-white px-8 py-6 text-lg transform hover:scale-105 transition-transform duration-200 shadow-lg"
        >
          <Link to="/volunteer">Join the Movement</Link>
        </Button>
        <DonateButton />
      </motion.div>

      <ImpactStats />
    </motion.div>
  );
};
