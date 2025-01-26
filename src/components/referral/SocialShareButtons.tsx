import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

interface SocialShareButtonsProps {
  onShare: (platform: string) => void;
}

export const SocialShareButtons = ({ onShare }: SocialShareButtonsProps) => {
  return (
    <div className="flex justify-center">
      <Button
        onClick={() => onShare('whatsapp')}
        className="bg-green-500 hover:bg-green-600"
      >
        <MessageSquare className="w-5 h-5 mr-2" />
        Share on WhatsApp
      </Button>
    </div>
  );
};