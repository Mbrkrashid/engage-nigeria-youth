import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const Sponsorship = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    sponsor_name: "",
    sponsor_email: "",
    message: "",
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
        message: "",
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="py-20 bg-primary/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-primary">
            Support Our Mission
          </h2>
          <div className="bg-white rounded-lg shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
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

              <div>
                <label htmlFor="sponsor_name" className="block text-sm font-medium mb-2">
                  Name *
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
                <label htmlFor="sponsor_email" className="block text-sm font-medium mb-2">
                  Email *
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
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="Share why you're supporting our cause..."
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
          </div>
        </motion.div>
      </div>
    </section>
  );
};