import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export const WhatsAppButton = () => {
  const whatsappNumber = ""; // Replace with your WhatsApp number or group link

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="fixed bottom-4 right-4 z-50"
    >
      <Button
        className="rounded-full bg-green-500 hover:bg-green-600"
        size="lg"
        asChild
      >
        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle className="w-6 h-6 mr-2" />
          Chat on WhatsApp
        </a>
      </Button>
    </motion.div>
  );
};