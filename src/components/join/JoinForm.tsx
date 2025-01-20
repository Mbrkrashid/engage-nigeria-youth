import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface JoinFormProps {
  onClose: () => void;
}

export const JoinForm = ({ onClose }: JoinFormProps) => {
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
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: Math.random().toString(36).slice(-8),
      });

      if (authError) throw authError;

      if (authData.user) {
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
        onClose();
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
          onClick={onClose}
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
  );
};