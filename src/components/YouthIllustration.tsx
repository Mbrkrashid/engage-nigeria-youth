import { motion } from "framer-motion";
import { KnowledgeCard } from "./youth/KnowledgeCard";
import { VotingCard } from "./youth/VotingCard";
import { CapacityCard } from "./youth/CapacityCard";
import { SupportMovement } from "./youth/SupportMovement";

export const YouthIllustration = () => {
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
          <KnowledgeCard />
          <VotingCard />
          <CapacityCard />
        </motion.div>

        <SupportMovement />
      </div>
    </section>
  );
};