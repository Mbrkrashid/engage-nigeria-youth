import { FloatingElement } from "./hero/FloatingElement";
import { HeroContent } from "./hero/HeroContent";
import { HeroImage } from "./hero/HeroImage";

export const Hero = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-primary to-primary/90 text-white flex items-center relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat opacity-20" />
      </div>

      {/* Floating elements */}
      <FloatingElement
        className="absolute top-10 right-10 w-20 h-20 bg-accent/20 rounded-full blur-lg"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        duration={5}
      />
      <FloatingElement
        className="absolute bottom-10 left-10 w-32 h-32 bg-secondary/20 rounded-full blur-lg"
        animate={{
          x: [0, -40, 0],
          y: [0, -20, 0],
          scale: [1, 1.3, 1],
        }}
        duration={6}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <HeroContent />
          <HeroImage />
        </div>
      </div>
    </div>
  );
};