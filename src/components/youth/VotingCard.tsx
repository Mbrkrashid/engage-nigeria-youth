import { motion } from "framer-motion";
import { Vote } from "lucide-react";
import { cardVariants, iconVariants } from "./animation-variants";

export const VotingCard = () => {
  return (
    <motion.div
      variants={cardVariants}
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
    >
      <motion.div variants={iconVariants} className="mb-4">
        <Vote className="w-12 h-12 mx-auto text-secondary" />
      </motion.div>
      <h3 className="text-xl font-bold mb-2 text-center">Your Vote Counts</h3>
      <p className="text-gray-600 text-center">
        Make your voice heard and impact your community's future through informed voting
      </p>
    </motion.div>
  );
};