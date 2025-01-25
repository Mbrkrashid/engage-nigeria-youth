import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { UserDetailsForm } from "../forms/UserDetailsForm";

export const JoinMovement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();

  const handleGoogleSignUp = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/google-form`
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
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-8 sm:right-8">
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
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-lg shadow-xl p-6 w-[90vw] max-w-md"
          >
            {!showForm ? (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-primary">Join Our Movement</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGoogleSignUp}
                  className="w-full"
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Join with Google
                </Button>
              </>
            ) : (
              <UserDetailsForm onClose={() => {
                setShowForm(false);
                setIsOpen(false);
              }} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};