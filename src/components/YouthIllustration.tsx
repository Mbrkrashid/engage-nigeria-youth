import { motion } from "framer-motion";

export const YouthIllustration = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        ease: [0, 0.71, 0.2, 1.01],
        scale: {
          type: "spring",
          damping: 5,
          stiffness: 100,
          restDelta: 0.001
        }
      }}
      className="w-full max-w-lg mx-auto relative"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full filter blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <svg
        viewBox="0 0 500 500"
        className="w-full h-auto relative z-10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M250 100c-27.614 0-50 22.386-50 50s22.386 50 50 50 50-22.386 50-50-22.386-50-50-50zm0 150c-55.228 0-100 44.772-100 100v100h200V350c0-55.228-44.772-100-100-100z"
          fill="currentColor"
          className="text-primary"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 2,
            ease: "easeInOut",
          }}
        />
      </svg>
    </motion.div>
  );
};