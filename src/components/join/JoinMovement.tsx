import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";
import { JoinForm } from "./JoinForm";

export const JoinMovement = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-4">
      {!isOpen ? (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
        >
          <Button
            onClick={() => setIsOpen(true)}
            className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg"
            size="lg"
          >
            <UserPlus className="mr-2" />
            Join the Movement
          </Button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-auto"
        >
          <h3 className="text-lg font-bold text-primary mb-4">
            Join Our Movement
          </h3>
          <JoinForm onClose={() => setIsOpen(false)} />
        </motion.div>
      )}
    </div>
  );
};