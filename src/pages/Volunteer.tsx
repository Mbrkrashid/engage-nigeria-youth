import { Navbar } from "@/components/Navbar";
import { VolunteerForm } from "@/components/VolunteerForm";

const Volunteer = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-24 pb-12">
        <VolunteerForm />
      </main>
    </div>
  );
};

export default Volunteer;