
import { motion } from "framer-motion";

export const Founder = () => {
  return (
    <section className="py-20 bg-primary/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary">Our Vision</h2>
          <div className="bg-white rounded-lg shadow-xl p-8">
            <p className="text-gray-600 mb-6 text-lg">
              "Our mission is to empower the youth of Northern Nigeria with the skills,
              knowledge, and opportunities they need to create positive change in their
              communities through active participation in the democratic process."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
