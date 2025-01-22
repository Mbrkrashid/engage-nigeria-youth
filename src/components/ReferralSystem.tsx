import { motion } from "framer-motion";
import { SocialShareButtons } from "./referral/SocialShareButtons";
import { ReferralCodeInput } from "./referral/ReferralCodeInput";

export const ReferralSystem = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Share & Invite Friends</h2>
          <div className="space-y-6">
            <SocialShareButtons />
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or use a referral code
                </span>
              </div>
            </div>
            <ReferralCodeInput />
          </div>
        </motion.div>
      </div>
    </section>
  );
};