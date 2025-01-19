import { Navbar } from "@/components/Navbar";
import { VolunteerForm } from "@/components/VolunteerForm";
import { GoogleForm } from "@/components/GoogleForm";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Volunteer = () => {
  const [showGoogleForm, setShowGoogleForm] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold text-primary mb-4">
              Become a Volunteer
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Join our movement and make a difference in Northern Nigeria
            </p>
            <Button 
              onClick={() => setShowGoogleForm(!showGoogleForm)}
              className="bg-secondary hover:bg-secondary/90 mb-8"
            >
              {showGoogleForm ? "Hide Google Form" : "Show Google Form"}
            </Button>
          </motion.div>

          {showGoogleForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <GoogleForm />
            </motion.div>
          )}

          <VolunteerForm />
        </div>
      </main>
    </div>
  );
};

export default Volunteer;