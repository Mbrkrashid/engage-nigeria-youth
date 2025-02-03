import { motion } from "framer-motion";
import { JoinMovement } from "./join/JoinMovement";

export const AboutUs = () => {
  return (
    <section className="py-16 bg-white relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-6">About Our Movement</h2>
          <p className="text-lg text-gray-600 mb-8">
            We are a youth-led movement dedicated to empowering young Nigerians to actively participate in shaping the future of our nation. Through education, skill development, and community engagement, we're building a network of informed and capable leaders.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="p-6 bg-primary/5 rounded-lg">
              <h3 className="text-xl font-semibold text-primary mb-3">Our Vision</h3>
              <p className="text-gray-600">A Nigeria where youth are active participants in governance and nation-building.</p>
            </div>
            <div className="p-6 bg-primary/5 rounded-lg">
              <h3 className="text-xl font-semibold text-primary mb-3">Our Mission</h3>
              <p className="text-gray-600">To educate, empower, and mobilize Nigerian youth for positive social change.</p>
            </div>
            <div className="p-6 bg-primary/5 rounded-lg">
              <h3 className="text-xl font-semibold text-primary mb-3">Our Values</h3>
              <p className="text-gray-600">Integrity, Innovation, Inclusivity, and Impact in all we do.</p>
            </div>
          </div>
          <div className="mt-8">
            <JoinMovement />
          </div>
        </motion.div>
      </div>
    </section>
  );
};