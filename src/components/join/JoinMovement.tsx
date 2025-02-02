import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { UserPlus, ArrowLeft, ArrowRight, ArrowUp, ArrowDown } from "lucide-react";
import { JoinDialog } from "./JoinDialog";

export const JoinMovement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const moveButton = (direction: 'left' | 'right' | 'up' | 'down') => {
    const step = 50; // pixels to move
    setPosition(prev => {
      switch (direction) {
        case 'left':
          return { ...prev, x: prev.x - step };
        case 'right':
          return { ...prev, x: prev.x + step };
        case 'up':
          return { ...prev, y: prev.y - step };
        case 'down':
          return { ...prev, y: prev.y + step };
      }
    });
  };

  return (
    <motion.div
      className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50"
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 justify-center">
          <Button
            size="icon"
            variant="outline"
            onClick={() => moveButton('up')}
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            size="icon"
            variant="outline"
            onClick={() => moveButton('left')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
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
          <Button
            size="icon"
            variant="outline"
            onClick={() => moveButton('right')}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-2 justify-center">
          <Button
            size="icon"
            variant="outline"
            onClick={() => moveButton('down')}
          >
            <ArrowDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};