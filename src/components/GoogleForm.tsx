import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const GoogleForm = () => {
  const navigate = useNavigate();
  const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSep9EUEzGVwzXdj4e_ANeFuJ0Uw3NXe51rupr3JUbbE236cGw/viewform";
  
  useEffect(() => {
    window.location.href = GOOGLE_FORM_URL;
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <p className="text-center">Redirecting to Google Form...</p>
    </div>
  );
};