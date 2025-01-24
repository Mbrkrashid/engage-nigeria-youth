import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { GoogleForm } from "@/components/GoogleForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const skillCategories = [
  {
    title: "IT & Technical Studies",
    skills: [
      "Microsoft Technologies",
      "Professional Programming",
      "Web Technologies",
      "SAP Technologies",
    ],
  },
  {
    title: "Digital & Programming",
    skills: [
      "Google Technologies",
      "Digital Marketing",
      "Python Technologies",
      "JAVA Technologies",
    ],
  },
  {
    title: "Creative & Technical",
    skills: [
      "Adobe Technologies",
      "Database Management",
      "Software Quality",
      "Telecommunications",
    ],
  },
];

export const Skills = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
          Diploma Certification Courses
        </h2>
        
        <Tabs defaultValue="programs" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="programs">Available Courses</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="programs">
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
                      <li key={skill} className="text-gray-600 flex items-center">
                        <span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>
                        {skill}
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => navigate(`/register/${encodeURIComponent(category.title)}`)}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    Enroll Now
                  </Button>
                </motion.div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="register">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <GoogleForm />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};