import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const ReferralCodeInput = () => {
  const { toast } = useToast();
  const [referralCode, setReferralCode] = useState("");
  const [loading, setLoading] = useState(false);

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
  );
};