import { BookOpen, Users, Vote } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Skills Development",
    description:
      "Access free courses and resources to build valuable skills for your future.",
  },
  {
    icon: Vote,
    title: "Voter Education",
    description:
      "Learn about your voting rights and how to participate in the democratic process.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "Connect with like-minded youth and share experiences to drive positive change.",
  },
];

export const Features = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
          Your Path to Empowerment
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-lg border border-gray-200 hover:border-secondary transition-colors text-center"
            >
              <feature.icon className="w-12 h-12 mx-auto mb-4 text-secondary" />
              <h3 className="text-xl font-semibold mb-3 text-primary">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};