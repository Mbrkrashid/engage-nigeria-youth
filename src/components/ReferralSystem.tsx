import { motion } from "framer-motion";
import { SocialShareButtons } from "./referral/SocialShareButtons";
import { ReferralCodeInput } from "./referral/ReferralCodeInput";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const ReferralSystem = () => {
  const { toast } = useToast();

  const handleShare = async (platform: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Please sign in",
          description: "You need to be signed in to share referral links",
        });
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("referral_code, full_name")
        .eq("id", user.id)
        .single();

      if (profile?.referral_code) {
        const referralLink = `${window.location.origin}?ref=${profile.referral_code}`;
        const shareText = `Join our youth movement for a better Nigeria! I'm ${profile.full_name || 'a member'} and I invite you to be part of this change. Use my referral link: ${referralLink}`;
        
        if (platform === 'whatsapp') {
          window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
        } else if (platform === 'facebook') {
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}&quote=${encodeURIComponent(shareText)}`, '_blank');
        } else if (platform === 'twitter') {
          window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank');
        }

        // Record the share
        await supabase.from('social_shares').insert({
          user_id: user.id,
          referral_code: profile.referral_code,
          platform
        });

        toast({
          title: "Link shared!",
          description: "Thank you for spreading the word!",
        });
      }
    } catch (error) {
      console.error("Error sharing:", error);
      toast({
        title: "Error",
        description: "Failed to share referral link",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="py-8 sm:py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">Share & Invite Friends</h2>
          <div className="space-y-4 sm:space-y-6">
            <SocialShareButtons onShare={handleShare} />
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