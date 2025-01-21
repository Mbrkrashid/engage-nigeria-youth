import { motion } from "framer-motion";

export const HeroImage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="relative hidden md:block"
    >
      <motion.div
        className="relative z-10 rounded-2xl overflow-hidden shadow-2xl"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src="/lovable-uploads/266686b7-4461-4ee7-b349-4d5af20e8992.png"
          alt="Nigerian Youth"
          className="w-full h-auto rounded-2xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
      </motion.div>
      
      <motion.div
        className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary/20 rounded-full blur-xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};