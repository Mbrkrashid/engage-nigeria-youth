import { motion } from "framer-motion";

interface StatItemProps {
  number: string;
  label: string;
}

const StatItem = ({ number, label }: StatItemProps) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white/10 p-6 rounded-lg backdrop-blur-sm"
  >
    <h3 className="text-2xl font-bold mb-2">{number}</h3>
    <p className="text-sm opacity-80">{label}</p>
  </motion.div>
);

export const ImpactStats = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      <StatItem number="1000+" label="Youth Empowered" />
      <StatItem number="20+" label="Communities Reached" />
      <StatItem number="50+" label="Active Programs" />
    </motion.div>
  );
};