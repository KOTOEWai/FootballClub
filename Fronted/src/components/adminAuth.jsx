import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProtectAdmin = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(null); 
  useEffect(() => {
    axios
      .get("http://localhost:3000/user/secure/admin", { withCredentials: true })
      .then((res) => {
        if (res.data.user.role === "admin") {
          setIsAuthorized(true); // User is authorized
        } else {

          setIsAuthorized(false); // User is unauthorized
          alert("Access denied: Admin role required");
          navigate("/login"); // Redirect to login
        }
      })
      .catch((err) => {
        console.error("Error fetching admin authentication", err);
        setIsAuthorized(false); // Handle error
        navigate("/login"); // Redirect to login on error
      });
  }, [navigate]);

  if (isAuthorized === null) {
    // Loading state while checking authorization
    return <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="spinner-2 w-10 h-10 shrink-0 animate-spin" viewBox="0 0 256 256">
    <path d="M128 63.04c-5.104 0-9.28-4.176-9.28-9.28V16.64c0-5.104 4.176-9.28 9.28-9.28s9.28 4.176 9.28 9.28v37.12c0 5.104-4.176 9.28-9.28 9.28zm52.548 21.692c-2.32 0-4.756-.928-6.612-2.668-3.596-3.596-3.596-9.512 0-13.108l26.216-26.216c3.596-3.596 9.512-3.596 13.108 0s3.596 9.512 0 13.108l-26.216 26.216c-1.856 1.856-4.176 2.668-6.496 2.668zm58.812 52.548h-37.12c-5.104 0-9.28-4.176-9.28-9.28s4.176-9.28 9.28-9.28h37.12c5.104 0 9.28 4.176 9.28 9.28s-4.176 9.28-9.28 9.28zm-32.596 78.764c-2.32 0-4.756-.928-6.612-2.668l-26.216-26.216c-3.596-3.596-3.596-9.512 0-13.108s9.512-3.596 13.108 0l26.216 26.216c3.596 3.596 3.596 9.512 0 13.108-1.74 1.74-4.176 2.668-6.496 2.668zM128 248.64c-5.104 0-9.28-4.176-9.28-9.28v-37.12c0-5.104 4.176-9.28 9.28-9.28s9.28 4.176 9.28 9.28v37.12c0 5.104-4.176 9.28-9.28 9.28zm-78.764-32.596c-2.32 0-4.756-.928-6.612-2.668-3.596-3.596-3.596-9.512 0-13.108l26.216-26.216c3.596-3.596 9.512-3.596 13.108 0s3.596 9.512 0 13.108l-26.216 26.216c-1.74 1.74-4.06 2.668-6.496 2.668zm4.524-78.764H16.64c-5.104 0-9.28-4.176-9.28-9.28s4.176-9.28 9.28-9.28h37.12c5.104 0 9.28 4.176 9.28 9.28s-4.176 9.28-9.28 9.28zm21.692-52.548c-2.32 0-4.756-.928-6.612-2.668l-26.1-26.216c-3.596-3.596-3.596-9.512 0-13.108s9.512-3.596 13.108 0l26.216 26.216c3.596 3.596 3.596 9.512 0 13.108-1.856 1.856-4.176 2.668-6.612 2.668z" data-original="#000000" />
       </svg>;
      </div>
  }

  return isAuthorized ? children : null; // Render children only if authorized
};

export { ProtectAdmin };
