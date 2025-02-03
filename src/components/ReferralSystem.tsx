import { motion } from "framer-motion";
import { SocialShareButtons } from "./referral/SocialShareButtons";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const ReferralSystem = () => {
  const { toast } = useToast();

  const handleShare = async (platform: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const shareText = "Join our youth movement for a better Nigeria! Together we can make a difference. Join us at: " + window.location.origin;
      
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("referral_code")
          .eq("id", user.id)
          .single();

        if (profile?.referral_code) {
          const referralLink = `${window.location.origin}?ref=${profile.referral_code}`;
          window.open(`https://wa.me/?text=${encodeURIComponent(shareText + "\n\nUse my referral link: " + referralLink)}`, '_blank');
          
          await supabase.from('social_shares').insert({
            user_id: user.id,
            referral_code: profile.referral_code,
            platform: 'whatsapp'
          });
        }
      } else {
        // If user is not logged in, share without referral code
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
      }

      toast({
        title: "Link shared!",
        description: "Thank you for spreading the word!",
      });
    } catch (error) {
      console.error("Error sharing:", error);
      toast({
        title: "Error",
        description: "Failed to share link",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="py-8 sm:py-16 bg-background relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">Share & Invite Friends</h2>
          <SocialShareButtons onShare={handleShare} />
        </motion.div>
      </div>
    </section>
  );
};