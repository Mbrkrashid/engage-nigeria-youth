import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { DonateButton } from "@/components/DonateButton";

export const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-primary to-primary/90 text-white min-h-screen flex items-center relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat opacity-20" />
      </div>

      {/* Floating elements */}
      <motion.div
        className="absolute top-10 right-10 w-20 h-20 bg-accent/20 rounded-full blur-lg"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-10 left-10 w-32 h-32 bg-secondary/20 rounded-full blur-lg"
        animate={{
          x: [0, -40, 0],
          y: [0, -20, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
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

            {/* Impact Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 p-6 rounded-lg backdrop-blur-sm"
              >
                <h3 className="text-2xl font-bold mb-2">1000+</h3>
                <p className="text-sm opacity-80">Youth Empowered</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 p-6 rounded-lg backdrop-blur-sm"
              >
                <h3 className="text-2xl font-bold mb-2">20+</h3>
                <p className="text-sm opacity-80">Communities Reached</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 p-6 rounded-lg backdrop-blur-sm"
              >
                <h3 className="text-2xl font-bold mb-2">50+</h3>
                <p className="text-sm opacity-80">Active Programs</p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative hidden md:block"
          >
            <motion.div
              className="relative z-10 rounded-2xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="/lovable-uploads/266686b7-4461-4ee7-b349-4d5af20e8992.png"
                alt="Nigerian Youth"
                className="w-full h-auto rounded-2xl"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </motion.div>
            
            {/* Decorative elements */}
            <motion.div
              className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary/20 rounded-full blur-xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};