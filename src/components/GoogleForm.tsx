import { motion } from "framer-motion";

export const GoogleForm = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto px-4 py-8"
    >
      <div className="aspect-[640/2064] w-full">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLScExQF9XAuS3m1-RmIXYo6ocbV7sE3OKGJvuS_9VRToNdEiYw/viewform?embedded=true"
          className="w-full h-full border-none"
          title="Google Form"
        >
          Loading…
        </iframe>
      </div>
    </motion.div>
  );
};