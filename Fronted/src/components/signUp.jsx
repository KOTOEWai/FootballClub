import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios"; // For making HTTP requests
import { useNavigate} from "react-router-dom"
export default function SignUp() {
  const navigate = useNavigate(); // For navigation using React Router
  // State to store form inputs
  const [formdata, setFormData] = useState({
    name: "",
    email: "",
    password: "",

  });

  const [error, setError] = useState(""); // To handle errors
  const [success, setSuccess] = useState(false); // To show success message

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formdata, [id]: value });
  };
const[proImg,setProImg] = useState([]);
  const handlefileChange = (e) => {
    setProImg([...e.target.files]);
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

   
    Object.keys(formdata).forEach((key) => data.append(key, formdata[key]));

    proImg.forEach((logo) => data.append("profile_img", logo));

    try {
      // Send POST request to backend
      const response = await axios.post("http://localhost:3000/user/SignUp",data,{
        withCredentials: true,
      }
      );

      if (response.status >= 200 && response.status < 300) {
  
        navigate('/login')
        setSuccess(true); // Show success message
        setError(""); // Clear any previous error
      }
    } catch (err) {
      setError(err.response?.data?.message );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 mt-10">
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="w-full max-w-md p-8 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">Sign up successful!</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
          <label htmlFor="userimg" className="block text-sm font-medium text-gray-700 mb-2">
              ProfileImage
            </label>
            <input
              type="file"
              id="userimg"
              onChange={handlefileChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter your username"
              multiple
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              id="name"
              value={formdata.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formdata.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formdata.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4 hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>
      </motion.div>
    </div>
  );
}
