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
import { JoinMovement } from "@/components/join/JoinMovement";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <FundsRaised />
          <Hero />
          <YouthIllustration />
          <div className="flex flex-col items-center gap-4 mt-8">
            <Button
              variant="default"
              size="lg"
              asChild
              className="w-full sm:w-auto"
            >
              <Link to="/volunteer">Become a Volunteer</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="w-full sm:w-auto"
            >
              <Link to="/skills">Explore Skills</Link>
            </Button>
            <JoinMovement />
            <div className="mt-4">
              <DonateButton />
            </div>
          </div>
          <AboutUs />
          <Features />
          <Gallery />
          <Founder />
          <ReferralSystem />
          <SocialLinks />
          <WhatsAppButton />
          <ChatSupport />
        </motion.div>
      </main>
    </div>
  );
};

export default Index;