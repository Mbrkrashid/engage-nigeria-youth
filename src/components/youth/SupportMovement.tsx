import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const SupportMovement = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className="mt-16 text-center"
    >
      <h2 className="text-2xl font-bold mb-4 text-primary">Support Our Movement</h2>
      <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
        Join us in empowering youth and building a stronger democracy. Your support makes a difference.
      </p>
      <Button
        asChild
        className="bg-secondary hover:bg-secondary/90 text-white px-8 py-3 text-lg rounded-full transform hover:scale-105 transition-transform duration-200"
      >
        <Link to="/sponsorship">
          <Heart className="w-5 h-5 mr-2 inline-block" />
          Become a Sponsor
        </Link>
      </Button>
    </motion.div>
  );
};