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
import { FundsRaised } from "@/components/FundsRaised";
import { ReferralSystem } from "@/components/ReferralSystem";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Hero />
          <YouthIllustration />
          <FundsRaised />
          <AboutUs />
          <Features />
          <Gallery />
          <Founder />
          <ReferralSystem />
          <div className="fixed bottom-24 right-4 z-50">
            <DonateButton />
          </div>
          <SocialLinks />
          <WhatsAppButton />
          <ChatSupport />
        </motion.div>
      </main>
    </div>
  );
};

export default Index;