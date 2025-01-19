import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import Volunteer from "./pages/Volunteer";
import { Skills } from "./components/Skills";
import { Sponsorship } from "./components/Sponsorship";
import { AdminDashboard } from "./components/AdminDashboard";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/sponsorship" element={<Sponsorship />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;