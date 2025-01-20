import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const JoinMovement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // First, sign up the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: Math.random().toString(36).slice(-8), // Generate a random password
      });

      if (authError) throw authError;

      if (authData.user) {
        // Then create their profile
        const { error: profileError } = await supabase
          .from("profiles")
          .insert({
            id: authData.user.id,
            full_name: formData.full_name,
          });

        if (profileError) throw profileError;

        toast({
          title: "Welcome to the movement!",
          description: "Thank you for joining us. Please check your email to verify your account.",
        });

        setFormData({ full_name: "", email: "" });
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Error joining movement:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to join. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="fixed bottom-44 right-4 z-50">
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
          className="bg-white rounded-lg shadow-xl p-6 w-80"
        >
          <h3 className="text-lg font-bold text-primary mb-4">
            Join Our Movement
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="w-full"
              />
            </div>
            <div>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
                disabled={isLoading}
              >
                {isLoading ? "Joining..." : "Join Now"}
              </Button>
            </div>
          </form>
        </motion.div>
      )}
    </div>
  );
};