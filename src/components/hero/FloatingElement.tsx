import { motion } from "framer-motion";

interface FloatingElementProps {
  className: string;
  animate: {
    x: number[];
    y: number[];
    scale: number[];
  };
  duration: number;
}

export const FloatingElement = ({ className, animate, duration }: FloatingElementProps) => {
  return (
    <motion.div
      className={className}
      animate={animate}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};