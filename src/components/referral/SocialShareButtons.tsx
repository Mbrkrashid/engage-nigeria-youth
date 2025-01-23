import { Button } from "@/components/ui/button";
import { Facebook, Twitter, MessageSquare } from "lucide-react";

interface SocialShareButtonsProps {
  onShare: (platform: string) => void;
}

export const SocialShareButtons = ({ onShare }: SocialShareButtonsProps) => {
  return (
    <div className="flex justify-center space-x-4">
      <Button
        onClick={() => onShare('whatsapp')}
        className="bg-green-500 hover:bg-green-600"
      >
        <MessageSquare className="w-5 h-5 mr-2" />
        WhatsApp
      </Button>
      <Button
        onClick={() => onShare('facebook')}
        className="bg-blue-600 hover:bg-blue-700"
      >
        <Facebook className="w-5 h-5 mr-2" />
        Facebook
      </Button>
      <Button
        onClick={() => onShare('twitter')}
        className="bg-blue-400 hover:bg-blue-500"
      >
        <Twitter className="w-5 h-5 mr-2" />
        Twitter
      </Button>
    </div>
  );
};