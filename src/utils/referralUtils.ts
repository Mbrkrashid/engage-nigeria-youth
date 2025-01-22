import { supabase } from "@/integrations/supabase/client";
import { ToastActionElement } from "@/components/ui/toast";

type ToastProps = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  action?: ToastActionElement;
};

export const generateReferralLink = async (toast: (props: ToastProps) => void) => {
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

export const shareToSocialPlatform = async (platform: string, referralLink: string, userId: string) => {
  try {
    // Record the share
    await supabase.from('social_shares').insert({
      user_id: userId,
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
    throw error;
  }
};