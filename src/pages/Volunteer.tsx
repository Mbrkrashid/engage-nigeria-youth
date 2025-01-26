import { motion } from "framer-motion";

const Volunteer = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto py-8"
    >
      <h1 className="text-3xl font-bold text-primary mb-8 text-center">
        Join Our Volunteer Team
      </h1>
      <div className="w-full overflow-hidden rounded-lg shadow-lg">
        <iframe 
          src="https://docs.google.com/forms/d/e/1FAIpQLSep9EUEzGVwzXdj4e_ANeFuJ0Uw3NXe51rupr3JUbbE236cGw/viewform?embedded=true" 
          width="100%" 
          height="1849" 
          className="border-0"
          title="Volunteer Registration Form"
        >
          Loading...
        </iframe>
      </div>
    </motion.div>
  );
};

export default Volunteer;