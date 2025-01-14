import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-primary to-primary/90 text-white min-h-[80vh] flex items-center">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Empowering Youth for a Better Nigeria
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-fade-in opacity-90">
            Join the movement to build skills, understand your voting rights, and
            create positive change for Northern Nigeria's future.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center animate-fade-in">
            <Button
              asChild
              className="bg-secondary hover:bg-secondary/90 text-white px-8 py-6 text-lg"
            >
              <Link to="/volunteer">Become a Volunteer</Link>
            </Button>
            <Button
              asChild
              className="bg-accent hover:bg-accent/90 text-primary px-8 py-6 text-lg"
            >
              <Link to="/skills">Explore Skills</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};