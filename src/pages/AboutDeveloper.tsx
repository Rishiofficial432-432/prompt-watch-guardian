
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AboutDeveloper = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to the About page with the developer tab active
    navigate("/about?tab=developer");
  }, [navigate]);
  
  return null; // This component doesn't render anything as it immediately redirects
};

export default AboutDeveloper;
