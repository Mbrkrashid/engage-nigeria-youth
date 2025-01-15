import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Volunteer from "./pages/Volunteer";
import { Skills } from "./components/Skills";
import { Sponsorship } from "./components/Sponsorship";
import { AdminDashboard } from "./components/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/sponsorship" element={<Sponsorship />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;