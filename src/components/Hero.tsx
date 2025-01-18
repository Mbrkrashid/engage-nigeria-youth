import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-primary to-primary/90 text-white min-h-[90vh] flex items-center relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-20 h-20 bg-white/10 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 60 - 30, 0],
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
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
            className="text-lg md:text-2xl mb-8 opacity-90 px-4"
          >
            Join the movement to build skills, understand your voting rights, and
            create positive change for Northern Nigeria's future.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col md:flex-row gap-4 justify-center px-4"
          >
            <Button
              asChild
              className="bg-secondary hover:bg-secondary/90 text-white px-8 py-6 text-lg transform hover:scale-105 transition-transform duration-200 shadow-lg"
            >
              <Link to="/volunteer">Become a Volunteer</Link>
            </Button>
            <Button
              asChild
              className="bg-accent hover:bg-accent/90 text-primary px-8 py-6 text-lg transform hover:scale-105 transition-transform duration-200 shadow-lg"
            >
              <Link to="/skills">Explore Skills</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};