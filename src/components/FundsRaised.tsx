import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

export const FundsRaised = () => {
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchTotalDonations = async () => {
      const { data, error } = await supabase
        .from('donations')
        .select('amount')
        .eq('payment_status', 'completed');

      if (error) {
        console.error('Error fetching donations:', error);
        return;
      }

      const total = data.reduce((sum, donation) => sum + Number(donation.amount), 0);
      setTotalAmount(total);
    };

    fetchTotalDonations();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-4 left-4 z-50 bg-white rounded-lg shadow-lg p-4 max-w-sm"
    >
      <h3 className="text-xl font-bold text-primary mb-2">Funds Raised</h3>
      <p className="text-3xl font-bold text-secondary">
        ₦{totalAmount.toLocaleString()}
      </p>
      <p className="text-gray-600 mt-2 text-sm">
        Supporting youth empowerment in Northern Nigeria
      </p>
    </motion.div>
  );
};