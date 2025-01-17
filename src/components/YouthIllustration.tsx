import { motion } from "framer-motion";
import { BookOpen, Vote, GraduationCap, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const YouthIllustration = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0 },
    visible: { 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary"
        >
          Empowering Youth Through Knowledge
        </motion.h2>

        <motion.div 
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          {/* Knowledge Card */}
          <motion.div
            variants={cardVariants}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <motion.div
              variants={iconVariants}
              className="mb-4"
            >
              <BookOpen className="w-12 h-12 mx-auto text-primary" />
            </motion.div>
            <h3 className="text-xl font-bold mb-2 text-center">Gain Knowledge</h3>
            <p className="text-gray-600 text-center">
              Access comprehensive resources and training to understand your civic responsibilities
            </p>
          </motion.div>

          {/* Voting Card */}
          <motion.div
            variants={cardVariants}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <motion.div
              variants={iconVariants}
              className="mb-4"
            >
              <Vote className="w-12 h-12 mx-auto text-secondary" />
            </motion.div>
            <h3 className="text-xl font-bold mb-2 text-center">Your Vote Counts</h3>
            <p className="text-gray-600 text-center">
              Make your voice heard and impact your community's future through informed voting
            </p>
          </motion.div>

          {/* Capacity Building Card */}
          <motion.div
            variants={cardVariants}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <motion.div
              variants={iconVariants}
              className="mb-4"
            >
              <GraduationCap className="w-12 h-12 mx-auto text-accent" />
            </motion.div>
            <h3 className="text-xl font-bold mb-2 text-center">Capacity Building</h3>
            <p className="text-gray-600 text-center">
              Develop leadership skills and abilities to create lasting community impact
            </p>
          </motion.div>
        </motion.div>

        {/* Support Movement Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-bold mb-4 text-primary">Support Our Movement</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join us in empowering youth and building a stronger democracy. Your support makes a difference.
          </p>
          <Button
            asChild
            className="bg-secondary hover:bg-secondary/90 text-white px-8 py-3 text-lg rounded-full transform hover:scale-105 transition-transform duration-200"
          >
            <Link to="/sponsorship">
              <Heart className="w-5 h-5 mr-2 inline-block" />
              Become a Sponsor
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};