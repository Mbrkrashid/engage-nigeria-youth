import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { JoinDialog } from "./JoinDialog";

export const JoinMovement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) throw error;
      setShowForm(true);
    } catch (error) {
      console.error("Error with Google signup:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign up with Google. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 sm:bottom-8 sm:left-8">
      <AnimatePresence>
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
            onGoogleSignUp={handleGoogleSignUp}
            isLoading={isLoading}
          />
        )}
      </AnimatePresence>
    </div>
  );
};