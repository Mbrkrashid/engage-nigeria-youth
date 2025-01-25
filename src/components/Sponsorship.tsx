import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const Sponsorship = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    sponsor_name: "",
    sponsor_email: "",
    phone_number: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.from("sponsorships").insert([{
        ...formData,
        amount: Number(formData.amount),
        status: 'pending'
      }]);

      if (error) throw error;

      toast({
        title: "Thank you for your sponsorship!",
        description: "We will contact you soon with more information.",
      });

      setFormData({
        amount: "",
        sponsor_name: "",
        sponsor_email: "",
        phone_number: "",
      });
    } catch (error) {
      console.error("Error submitting sponsorship:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit sponsorship. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md mx-auto bg-white rounded-lg shadow-xl p-6"
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-primary">
        Become a Sponsor
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="sponsor_name" className="block text-sm font-medium mb-2">
            Full Name *
          </label>
          <Input
            id="sponsor_name"
            name="sponsor_name"
            value={formData.sponsor_name}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="phone_number" className="block text-sm font-medium mb-2">
            Phone Number *
          </label>
          <Input
            id="phone_number"
            name="phone_number"
            type="tel"
            value={formData.phone_number}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="sponsor_email" className="block text-sm font-medium mb-2">
            Email Address *
          </label>
          <Input
            id="sponsor_email"
            name="sponsor_email"
            type="email"
            value={formData.sponsor_email}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium mb-2">
            Sponsorship Amount (₦) *
          </label>
          <Input
            id="amount"
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            required
            min="1000"
            className="w-full"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Submit Sponsorship"}
        </Button>
      </form>
    </motion.div>
  );
};