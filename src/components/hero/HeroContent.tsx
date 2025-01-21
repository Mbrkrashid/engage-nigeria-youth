import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { DonateButton } from "@/components/DonateButton";
import { ImpactStats } from "./ImpactStats";

export const HeroContent = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="text-left"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
      >
        Empowering Youth for a Better Nigeria
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-lg md:text-xl mb-8 opacity-90"
      >
        Join our transformative movement to empower Northern Nigeria's youth. Together, 
        we're building future leaders, fostering civic engagement, and creating lasting 
        positive change in our communities. Your support today shapes tomorrow's Nigeria.
      </motion.p>
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
          <Link to="/volunteer">Join as Volunteer</Link>
        </Button>
        <Button
          asChild
          className="bg-accent hover:bg-accent/90 text-primary px-8 py-6 text-lg transform hover:scale-105 transition-transform duration-200 shadow-lg"
        >
          <Link to="/skills">Explore Skills</Link>
        </Button>
        <DonateButton />
      </motion.div>
      <ImpactStats />
    </motion.div>
  );
};