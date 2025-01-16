import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter } from "lucide-react";

const TikTokIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export const SocialLinks = () => {
  const socialLinks = [
    {
      name: "Facebook",
      icon: <Facebook className="w-5 h-5" />,
      url: "#", // Replace with your Facebook URL
    },
    {
      name: "Instagram",
      icon: <Instagram className="w-5 h-5" />,
      url: "#", // Replace with your Instagram URL
    },
    {
      name: "Twitter",
      icon: <Twitter className="w-5 h-5" />,
      url: "#", // Replace with your Twitter URL
    },
    {
      name: "TikTok",
      icon: <TikTokIcon />,
      url: "#", // Replace with your TikTok URL
    },
  ];

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col space-y-2"
      >
        {socialLinks.map((link) => (
          <Button
            key={link.name}
            variant="outline"
            size="icon"
            className="rounded-full hover:bg-primary hover:text-white transition-colors"
            asChild
          >
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {link.icon}
            </a>
          </Button>
        ))}
      </motion.div>
    </div>
  );
};