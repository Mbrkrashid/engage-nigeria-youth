import { Hero } from "@/components/Hero";
import { AboutUs } from "@/components/AboutUs";
import { Features } from "@/components/Features";
import { Gallery } from "@/components/Gallery";
import { Founder } from "@/components/Founder";
import { SocialLinks } from "@/components/SocialLinks";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { DonateButton } from "@/components/DonateButton";
import { ChatSupport } from "@/components/ChatSupport";
import { YouthIllustration } from "@/components/YouthIllustration";
import { ReferralSystem } from "@/components/ReferralSystem";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FloatingElements } from "@/components/FloatingElements";
import { JoinMovement } from "@/components/join/JoinMovement";

const Index = () => {
  return (
    <div className="min-h-screen bg-primary">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <FloatingElements />
          <Hero />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
            <Button
              variant="outline"
              size="lg"
              asChild
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white"
            >
              <Link to="/skills">Explore Skills</Link>
            </Button>
          </div>
          <YouthIllustration />
          <AboutUs />
          <Features />
          <Gallery />
          <Founder />
          <ReferralSystem />
          <SocialLinks />
          <WhatsAppButton />
          <ChatSupport />
          <JoinMovement />
        </motion.div>
      </main>
    </div>
  );
};

export default Index;