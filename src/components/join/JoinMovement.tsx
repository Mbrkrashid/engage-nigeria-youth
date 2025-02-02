import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";
import { JoinDialog } from "./JoinDialog";

export const JoinMovement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {!isOpen ? (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
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
        <JoinDialog
          showForm={showForm}
          onClose={() => {
            setIsOpen(false);
            setShowForm(false);
          }}
          onGoogleSignUp={() => setShowForm(true)}
          isLoading={isLoading}
        />
      )}
    </motion.div>
  );
};