import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { cardVariants, iconVariants } from "./animation-variants";

export const CapacityCard = () => {
  return (
    <motion.div
      variants={cardVariants}
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
    >
      <motion.div variants={iconVariants} className="mb-4">
        <GraduationCap className="w-12 h-12 mx-auto text-accent" />
      </motion.div>
      <h3 className="text-xl font-bold mb-2 text-center">Capacity Building</h3>
      <p className="text-gray-600 text-center">
        Develop leadership skills and abilities to create lasting community impact
      </p>
    </motion.div>
  );
};