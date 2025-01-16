import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Gallery } from "@/components/Gallery";
import { Founder } from "@/components/Founder";
import { AboutUs } from "@/components/AboutUs";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Hero />
          <AboutUs />
          <Features />
          <Gallery />
          <Founder />
        </motion.div>
      </main>
    </div>
  );
};

export default Index;