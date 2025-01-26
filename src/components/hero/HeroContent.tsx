import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { DonateButton } from "@/components/DonateButton";
import { ImpactStats } from "./ImpactStats";
import { JoinMovement } from "@/components/join/JoinMovement";

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
        Empowering Youth for a Better Nigeria
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="space-y-4"
      >
        {adminContent.events.length > 0 && (
          <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-2">Upcoming Events</h3>
            {adminContent.events.map((event) => (
              <div key={event.id} className="mb-2">
                <h4 className="font-medium">{event.title}</h4>
                <p className="text-sm opacity-80">{event.description}</p>
              </div>
            ))}
          </div>
        )}

        {adminContent.voterEducation.length > 0 && (
          <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-2">Voter Education</h3>
            {adminContent.voterEducation.map((item) => (
              <div key={item.id} className="mb-2">
                <h4 className="font-medium">{item.title}</h4>
                <p className="text-sm opacity-80">{item.content}</p>
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
          <Link to="https://forms.gle/Ld9YvqRwvjvxBxLt6">Join as Volunteer</Link>
        </Button>
        <DonateButton />
        <JoinMovement />
      </motion.div>

      <ImpactStats />
    </motion.div>
  );
};