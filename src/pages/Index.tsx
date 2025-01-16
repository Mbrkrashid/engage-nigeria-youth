import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Gallery } from "@/components/Gallery";
import { Founder } from "@/components/Founder";
import { AboutUs } from "@/components/AboutUs";
import { SocialLinks } from "@/components/SocialLinks";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { DonateButton } from "@/components/DonateButton";
import { GoogleForm } from "@/components/GoogleForm";
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
          <GoogleForm />
          <Founder />
          <SocialLinks />
          <WhatsAppButton />
          <DonateButton />
        </motion.div>
      </main>
    </div>
  );
};

export default Index;