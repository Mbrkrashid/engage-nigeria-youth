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
        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full flex items-center gap-2 transform transition-all duration-200 hover:scale-105"
      >
        <MessageSquare className="w-5 h-5" />
        Share on WhatsApp
      </Button>
    </div>
  );
};