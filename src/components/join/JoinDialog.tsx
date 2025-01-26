import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { GoogleSignInButton } from "./GoogleSignInButton";
import { UserDetailsForm } from "@/components/forms/UserDetailsForm";

interface JoinDialogProps {
  showForm: boolean;
  onClose: () => void;
  onGoogleSignUp: () => void;
  isLoading?: boolean;
}

export const JoinDialog = ({ showForm, onClose, onGoogleSignUp, isLoading }: JoinDialogProps) => {
  return (
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
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <GoogleSignInButton onGoogleSignUp={onGoogleSignUp} isLoading={isLoading} />
        </>
      ) : (
        <UserDetailsForm onClose={onClose} />
      )}
    </motion.div>
  );
};