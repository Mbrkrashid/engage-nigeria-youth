import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export const WhatsAppButton = () => {
  const whatsappNumber = "2348082679672"; // Nigerian format for +234 808 267 9672

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-4 right-4 z-50"
    >
      <Button
        className="rounded-full bg-green-500 hover:bg-green-600 shadow-lg"
        size="lg"
        asChild
      >
        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="hidden md:inline">Chat on WhatsApp</span>
          <span className="md:hidden">WhatsApp</span>
        </a>
      </Button>
    </motion.div>
  );
};