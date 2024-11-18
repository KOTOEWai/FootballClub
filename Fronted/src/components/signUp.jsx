import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios"; // For making HTTP requests

export default function SignUp() {
  // State to store form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(""); // To handle errors
  const [success, setSuccess] = useState(false); // To show success message

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to backend
      const response = await axios.post("http://localhost:3000/user/SignUp", formData);

      if (response.status === 201) {
        setSuccess(true); // Show success message
        setError(""); // Clear any previous error
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
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
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
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
              value={formData.email}
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
              value={formData.password}
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
