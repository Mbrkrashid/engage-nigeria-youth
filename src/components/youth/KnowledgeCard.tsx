import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { cardVariants, iconVariants } from "./animation-variants";

export const KnowledgeCard = () => {
  return (
    <motion.div
      variants={cardVariants}
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
    >
      <motion.div variants={iconVariants} className="mb-4">
        <BookOpen className="w-12 h-12 mx-auto text-primary" />
      </motion.div>
      <h3 className="text-xl font-bold mb-2 text-center">Gain Knowledge</h3>
      <p className="text-gray-600 text-center">
        Access comprehensive resources and training to understand your civic responsibilities
      </p>
    </motion.div>
  );
};