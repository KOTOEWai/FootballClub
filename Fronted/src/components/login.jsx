import { Link } from "react-router-dom"
import googleicon from '../image/google.png'
import apple from '../image/apple.png'
import { motion } from 'framer-motion';
import { useState } from "react";
import axios from "axios";
export default function Login() {

  const [ formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);

  const [success, setSuccess] = useState(false);
   
  const hadleInput = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value });
   
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state
    try {
      const response = await axios.post('http://localhost:3000/user/SignIn', formData);
      if (response.status >= 200 && response.status < 300) {
        setSuccess(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || "An unexpected error occurred.");
    }
  };
  
  return (
    <div 
    className="min-h-screen flex justify-center items-center">
         <motion.div
         initial={{ width: 0, scale: 1.5 }}
         animate={{ width: 500 , scale: 1 }}
         transition={{ duration: 1 }}
         className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-center uppercase font-serif text-lg">Login</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">Sign up successful!</p>}
        <form onSubmit={handleSubmit} >
          <div>
           <label htmlFor="Email" className="block mb-3">Email</label> 
          <input
          id="email"
          value={formData.email}
          onChange={hadleInput}
          className="w-full rounded mb-3" type="email" placeholder="Your Email" />
          </div>
          <div>
          <label htmlFor="Password" className="block mb-3">Password</label>
          <input
          id="password"
          value={formData.password}
          onChange={hadleInput}
          className="w-full rounded mb-3" type="password" placeholder="Password" />
          </div>
          <button
           type= "submit"
          className="w-full mt-3 bg-blue-700 p-3 rounded-lg text-white font-bold text-xl" >Login</button>
        </form>
        <div className="text-center text-gray-600 mt-2">Don&apos;t have an account? <Link to="/SignUp" className="underline">Register</Link></div>
        
        <div className="relative flex items-center mt-5 gap-2 
        my-5 opacity-20 uppercase text-black font-bold">
         <hr className='w-1/2 border-black' />
        <p>Or</p>
         <hr className='w-1/2 border-black' />
        </div>

          <div>

          <div className="relative">
          <img src={googleicon} className="w-8 h-8 top-6 left-10 absolute" alt="" />
          <button className="w-full mt-3    p-3 rounded-lg text-blue-600 border border-blue-700 font-bold text-xl"  type="submit">
           Continue with Google</button>
          </div>
         

          <div className="relative">
          <img src={apple} className="w-8 h-8 top-6 left-10 absolute" alt="" />
          <button className="w-full mt-3    p-3 rounded-lg text-blue-600 border border-blue-700 font-bold text-xl"  type="submit">
           Continue with Apple</button>
          </div>
         

         </div>

     </motion.div>
    </div>
  )
}


