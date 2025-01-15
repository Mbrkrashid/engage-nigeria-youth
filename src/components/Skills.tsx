import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const skillCategories = [
  {
    title: "Advocacy and Activism",
    skills: [
      "Public speaking and presentation",
      "Campaign strategy and planning",
      "Social media activism and online mobilization",
      "Community organizing and mobilization",
      "Lobbying and advocacy techniques",
    ],
  },
  {
    title: "Leadership and Governance",
    skills: [
      "Leadership principles and practices",
      "Team management and collaboration",
      "Decision-making and problem-solving",
      "Conflict resolution and negotiation",
      "Governance and policy analysis",
    ],
  },
  // ... Add other categories
];

export const Skills = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
          Available Skills Programs
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-4 text-primary">{category.title}</h3>
              <ul className="space-y-2 mb-6">
                {category.skills.map((skill) => (
                  <li key={skill} className="text-gray-600">
                    • {skill}
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => navigate(`/register/${encodeURIComponent(category.title)}`)}
                className="w-full"
              >
                Register for Program
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};