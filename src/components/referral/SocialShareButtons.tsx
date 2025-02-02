import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface SocialShareButtonsProps {
  onShare: (platform: string) => void;
}

export const SocialShareButtons = ({ onShare }: SocialShareButtonsProps) => {
  const { toast } = useToast();

  const handleWhatsAppShare = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Please sign in",
          description: "You need to be signed in to share referral links",
          variant: "destructive"
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
        
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
        
        await supabase.from('social_shares').insert({
          user_id: user.id,
          referral_code: profile.referral_code,
          platform: 'whatsapp'
        });

        toast({
          title: "Link shared!",
          description: "Thank you for spreading the word!",
        });

        onShare('whatsapp');
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
    <div className="flex justify-center">
      <Button
        onClick={handleWhatsAppShare}
        className="bg-green-500 hover:bg-green-600 text-white"
      >
        <MessageSquare className="w-5 h-5 mr-2" />
        Share on WhatsApp
      </Button>
    </div>
  );
};