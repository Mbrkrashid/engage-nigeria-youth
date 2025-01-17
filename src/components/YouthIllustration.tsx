import { motion } from "framer-motion";
import { BookOpen, Vote, GraduationCap } from "lucide-react";

export const YouthIllustration = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-primary/5 to-transparent overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {/* Knowledge Card */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-xl shadow-xl p-6 text-center"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mb-4"
            >
              <BookOpen className="w-12 h-12 mx-auto text-primary" />
            </motion.div>
            <h3 className="text-xl font-bold mb-2">Gain Knowledge</h3>
            <p className="text-gray-600">Access resources and training to understand civic responsibilities</p>
          </motion.div>

          {/* Voting Card */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-xl shadow-xl p-6 text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mb-4"
            >
              <Vote className="w-12 h-12 mx-auto text-secondary" />
            </motion.div>
            <h3 className="text-xl font-bold mb-2">Your Vote Counts</h3>
            <p className="text-gray-600">Make your voice heard and impact your community's future</p>
          </motion.div>

          {/* Capacity Building Card */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-xl shadow-xl p-6 text-center"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mb-4"
            >
              <GraduationCap className="w-12 h-12 mx-auto text-accent" />
            </motion.div>
            <h3 className="text-xl font-bold mb-2">Capacity Building</h3>
            <p className="text-gray-600">Develop skills and leadership abilities for community impact</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};