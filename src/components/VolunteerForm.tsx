import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

const volunteerSkills = [
  "Campaign strategy and planning",
  "Social media activism",
  "Community organizing",
  "Public speaking",
  "Digital marketing",
  "Web development",
  "Data analysis",
  "Photography",
  "Videography",
  "Graphic design",
  "Leadership training",
  "Civic education",
  "Event planning",
  "Fundraising",
  "Research",
];

export const VolunteerForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    skills: "",
    availability: "",
    areas_of_interest: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.from("volunteers").insert([
        {
          ...formData,
          skills: formData.skills.split(",").map((skill) => skill.trim()),
        },
      ]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your volunteer application has been submitted.",
      });
      navigate("/");
    } catch (error) {
      console.error("Error submitting volunteer form:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit your application. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto p-6"
    >
      <h1 className="text-3xl font-bold text-primary mb-8 text-center">
        Join Our Volunteer Team
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="full_name" className="block text-sm font-medium mb-2">
            Full Name *
          </label>
          <Input
            id="full_name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email *
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            Phone Number
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="skills" className="block text-sm font-medium mb-2">
            Skills (comma-separated) *
          </label>
          <Input
            id="skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="Select from: Campaign strategy, Social media, Web development, etc."
            required
            className="w-full"
          />
          <div className="mt-2 text-sm text-gray-500">
            Available skills: {volunteerSkills.join(", ")}
          </div>
        </div>

        <div>
          <label htmlFor="areas_of_interest" className="block text-sm font-medium mb-2">
            Areas of Interest
          </label>
          <Textarea
            id="areas_of_interest"
            name="areas_of_interest"
            value={formData.areas_of_interest}
            onChange={handleChange}
            placeholder="What areas would you like to contribute to?"
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="availability" className="block text-sm font-medium mb-2">
            Availability
          </label>
          <Textarea
            id="availability"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            placeholder="Please describe your availability (weekdays, weekends, specific hours)"
            className="w-full"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit Application"}
        </Button>
      </form>
    </motion.div>
  );
};