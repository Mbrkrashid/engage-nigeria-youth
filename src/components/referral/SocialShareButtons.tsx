import { Facebook, Twitter, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { generateReferralLink, shareToSocialPlatform } from "@/utils/referralUtils";
import { supabase } from "@/integrations/supabase/client";

export const SocialShareButtons = () => {
  const { toast } = useToast();

  const handleShare = async (platform: string) => {
    try {
      const referralLink = await generateReferralLink(toast);
      if (!referralLink) return;

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await shareToSocialPlatform(platform, referralLink, user.id);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to share referral link",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex justify-center space-x-4">
      <Button
        onClick={() => handleShare('whatsapp')}
        className="bg-green-500 hover:bg-green-600"
      >
        <MessageSquare className="w-5 h-5 mr-2" />
        WhatsApp
      </Button>
      <Button
        onClick={() => handleShare('facebook')}
        className="bg-blue-600 hover:bg-blue-700"
      >
        <Facebook className="w-5 h-5 mr-2" />
        Facebook
      </Button>
      <Button
        onClick={() => handleShare('twitter')}
        className="bg-blue-400 hover:bg-blue-500"
      >
        <Twitter className="w-5 h-5 mr-2" />
        Twitter
      </Button>
    </div>
  );
};