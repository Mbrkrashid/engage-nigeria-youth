import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Facebook, Twitter, MessageSquare } from "lucide-react";

export const ReferralSystem = () => {
  const { toast } = useToast();
  const [referralCode, setReferralCode] = useState("");
  const [loading, setLoading] = useState(false);

  const generateReferralLink = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Please sign in",
          description: "You need to be signed in to get your referral link",
          variant: "destructive",
        });
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("referral_code")
        .eq("id", user.id)
        .single();

      if (profile?.referral_code) {
        const referralLink = `${window.location.origin}?ref=${profile.referral_code}`;
        await navigator.clipboard.writeText(referralLink);
        toast({
          title: "Referral link copied!",
          description: "Share this link with your friends",
        });
        return referralLink;
      }
    } catch (error) {
      console.error("Error generating referral link:", error);
      toast({
        title: "Error",
        description: "Failed to generate referral link",
        variant: "destructive",
      });
    }
  };

  const shareToSocial = async (platform: string) => {
    const referralLink = await generateReferralLink();
    if (!referralLink) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    try {
      // Record the share
      await supabase.from('social_shares').insert({
        user_id: user.id,
        referral_code: referralLink,
        platform
      });

      // Share to platform
      let shareUrl = '';
      const text = "Join our youth movement for a better Nigeria! Use my referral link:";
      
      switch (platform) {
        case 'whatsapp':
          shareUrl = `https://wa.me/?text=${encodeURIComponent(`${text} ${referralLink}`)}`;
          break;
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`;
          break;
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${text} ${referralLink}`)}`;
          break;
      }

      window.open(shareUrl, '_blank');
    } catch (error) {
      console.error("Error sharing:", error);
      toast({
        title: "Error",
        description: "Failed to share referral link",
        variant: "destructive",
      });
    }
  };

  const submitReferralCode = async () => {
    if (!referralCode) return;
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Please sign in",
          description: "You need to be signed in to use a referral code",
          variant: "destructive",
        });
        return;
      }

      const { data: referrer } = await supabase
        .from("profiles")
        .select("id")
        .eq("referral_code", referralCode)
        .single();

      if (!referrer) {
        toast({
          title: "Invalid referral code",
          description: "Please check the code and try again",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase.from("referrals").insert({
        referrer_id: referrer.id,
        referred_id: user.id,
      });

      if (error?.code === "23505") {
        toast({
          title: "Already referred",
          description: "You have already used a referral code",
          variant: "destructive",
        });
        return;
      }

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Referral code applied successfully",
      });
      setReferralCode("");
    } catch (error) {
      console.error("Error applying referral code:", error);
      toast({
        title: "Error",
        description: "Failed to apply referral code",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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
            <div className="flex justify-center space-x-4">
              <Button
                onClick={() => shareToSocial('whatsapp')}
                className="bg-green-500 hover:bg-green-600"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                WhatsApp
              </Button>
              <Button
                onClick={() => shareToSocial('facebook')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Facebook className="w-5 h-5 mr-2" />
                Facebook
              </Button>
              <Button
                onClick={() => shareToSocial('twitter')}
                className="bg-blue-400 hover:bg-blue-500"
              >
                <Twitter className="w-5 h-5 mr-2" />
                Twitter
              </Button>
            </div>
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
            <div className="flex gap-2">
              <Input
                placeholder="Enter referral code"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
              />
              <Button
                onClick={submitReferralCode}
                disabled={loading || !referralCode}
                className="bg-primary hover:bg-primary/90"
              >
                {loading ? "Applying..." : "Apply"}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};