import { motion } from "framer-motion";

export const AboutUs = () => {
  const objectives = [
    {
      title: "Voter Education and Awareness",
      description:
        "Providing accurate and unbiased information about the electoral process, voting requirements, and the importance of participating in elections.",
    },
    {
      title: "Youth Empowerment",
      description:
        "Encouraging young people to take an active role in shaping their future by voting and engaging in the democratic process.",
    },
    {
      title: "Community Engagement",
      description:
        "Organizing events, workshops, and campaigns to mobilize youths, promote civic responsibility, and foster a sense of community.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-primary/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary">About Us</h2>
          <p className="text-lg mb-12 text-gray-700 leading-relaxed">
            YouthVote 2027 is a platform focused on empowering Nigerian youths to participate
            actively in the electoral process. The mission is to educate, engage, and
            mobilize young people to exercise their right to vote and make informed
            decisions during the 2027 elections.
          </p>

          <h3 className="text-2xl font-semibold mb-8 text-primary">Key Objectives</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {objectives.map((objective, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <h4 className="text-xl font-semibold mb-4 text-primary">
                  {objective.title}
                </h4>
                <p className="text-gray-600">{objective.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};