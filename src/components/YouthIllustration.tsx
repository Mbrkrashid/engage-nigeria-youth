import { motion } from "framer-motion";
import { BookOpen, Vote, GraduationCap, Users, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
            <p className="text-gray-600">Access comprehensive resources and training to understand your civic responsibilities and rights</p>
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
            <p className="text-gray-600">Make your voice heard and impact your community's future through informed voting</p>
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
            <p className="text-gray-600">Develop leadership skills and abilities to create lasting community impact</p>
          </motion.div>
        </motion.div>

        {/* Support Movement Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Support Our Movement</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join us in empowering youth and building a stronger democracy. Your support makes a difference.
          </p>
          <Button
            asChild
            className="bg-secondary hover:bg-secondary/90 text-white px-8 py-6 text-lg transform hover:scale-105 transition-transform duration-200"
          >
            <Link to="/sponsor">
              <Heart className="w-5 h-5 mr-2" />
              Become a Sponsor
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};