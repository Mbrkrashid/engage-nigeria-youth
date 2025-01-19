import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { DonateButton } from "./DonateButton";

export const FundsRaised = () => {
  const { data: totalRaised } = useQuery({
    queryKey: ["totalRaised"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("donations")
        .select("amount")
        .eq("payment_status", "success");
      
      if (error) throw error;
      
      const total = data?.reduce((sum, donation) => sum + Number(donation.amount), 0) || 0;
      return total;
    },
  });

  return (
    <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Funds Raised</h2>
          <div className="text-5xl font-bold text-primary mb-8">
            ₦{(totalRaised || 0).toLocaleString()}
          </div>
          <DonateButton />
        </motion.div>
      </div>
    </section>
  );
};