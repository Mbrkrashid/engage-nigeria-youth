import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
          <h2 className="text-3xl font-bold text-center mb-8">Invite Friends</h2>
          <div className="space-y-6">
            <div>
              <Button
                onClick={generateReferralLink}
                className="w-full bg-primary hover:bg-primary/90"
              >
                Get Your Referral Link
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