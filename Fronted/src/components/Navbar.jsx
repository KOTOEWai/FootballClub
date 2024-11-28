
import { useContext, useEffect, useState } from 'react';
import logo from '../image/2f088356071ac23320b1445c8887adbd.jpg';
import { motion } from "motion/react";
import {  useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const Navbar = () => {


const { user,dispatch } = useContext(AuthContext)

const navigate = useNavigate();

  const loggout = async ()=>{
     alert("are you sure loggout?" )
     const res = await axios.post('http://localhost:3000/user/Loggout', {}, {
      withCredentials: true
  });
  if (res.status >= 200 && res.status < 300) {
      navigate('/login')
      dispatch({type: 'LOGOUT'})
    }
  }
  
  const [navbar, setNavbar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const menuItems = [
    { name: "Home", link: "/" },
    { name: "Sports", link: "/tickets" },
    { name: "News", link: "/tour" },
    { name: "Business", link: "/shop" },
    { name: "Contact", link: "/contact" },
    { name: "About Us", link: "/about" },
    { name: "Help", link: "/help" },
    { name: "Blogs", link: "/blog" }
  ];

 const [info,setInfo] = useState({});

 const closeModal = () => setIsModalOpen(true);

 useEffect(() => {
  if (user?._id) {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user/${user._id}`, {
          withCredentials: true,
        });
        if (response.status === 200) {
          setInfo(response.data);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }
}, [user?._id]);

    
  return (

    <>
   
       <div >
      <nav className='flex border-b' >
        <div className='md:w-[20%] flex mb-3 md:flex md:items-center  md:pl-5 mt-2'>
          <label className="inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              id="menu-toggle" 
              className="sr-only peer hidden md:block" 
              onChange={(e) => setNavbar(e.target.checked)} 
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
          <img src={logo} alt="logo" className='w-58 h-20 ps-5 ' />
        </div>

        <div className='hidden md:flex justify-center items-center md:ml-40 gap-10 font-serif p-10'>

     
          <Link to="/" className="hidden sm:block">Home</Link>
          <Link to="/ticket" className="hidden sm:block">Tickets</Link>

        </div>
        
        <div className=' ml-auto flex items-center md:w-[25%]  gap-5'>
         {!user &&
          <>
          <motion.button
          initial={{scale: 0.5}}
          animate={{scale: 1}}
          whileHover={{ scale: 1.25 , animate: true, backgroundColor: 'red'}}
          transition={{ delay: 0.2}}

          className='bg-blue-500 text-white p-4 rounded-lg'>
          <Link to="/login">Login</Link>
          </motion.button>

          <motion.button
          initial={{scale: 0.5}}
          animate={{scale: 1}}
          whileHover={{ scale: 1.25 , animate: true, backgroundColor: 'red'}}
          transition={{ delay: 0.2}}
           className='bg-blue-500 text-white p-4 rounded-lg shadow-orange-100'>
          <Link to="/signUp">SignUp</Link>
          </motion.button>
          </>
         }
         
        </div>

        <div>
         
        </div>

        <div className='flex justify-center items-center me-7 gap-10 '>
          {!!user &&
       <div>
     <button
        onClick={() => setIsModalOpen(false)}
        className=""
      >
         <img 
     src={`http://localhost:3000/uploads/${info.profile_img}`} 
     alt="avatar" 
     className="w-16 h-16  rounded-full" 
         />
     </button>
         </div>

         }
        {!!user &&
        <motion.button
        initial={{scale: 0.5}}
        animate={{scale: 1}}
        whileHover={{ scale: 1.25 , animate: true, backgroundColor: 'red'}}
        transition={{ delay: 0.2}}
         className='bg-red-500 text-white p-4   rounded-lg shadow-orange-100'>
           <Link onClick={()=>loggout()}>Logout</Link>
          </motion.button>
         }
         </div>
     
         { !isModalOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <div
            className="bg-white rounded-lg p-6 w-96 max-w-sm shadow-lg"
          >
            {/* Close Button */}
          
            <button
              onClick={closeModal}
              className="text-4xl text-red-500  hover:text-red-600 transition-all duration-300 ml-80"
            >
              <span className="text-4xl">×</span>
            </button>
          

            <div className="flex flex-col items-center">
              {/* User Avatar */}
              <img
                src={`http://localhost:3000/uploads/${info.profile_img ? info.profile_img[0] : 'default.jpg'}`}
                alt="User Avatar"
                className="w-32 h-32 rounded-full mb-4 object-cover"
              />
              <p className="text-lg font-medium text-gray-700">Name: {info.name}</p>
              <p className="text-lg font-medium text-gray-700">Email: {info.email}</p>
              <p className="text-lg font-medium text-gray-700">Role: {info.role}</p>
            </div>
          </div>
        </div>
      )}
       
           
      </nav>
      </div>
     
      
      {navbar && (
        <motion.div
          initial={{ opacity: 0, x:-50 }}
          animate={{ opacity: 1 ,x: 0 }}
          transition={{ duration: 2 }}
          className="top-24  w-[30%] flex opacity-50 bg-black  absolute"
        >
          <div className="h-screen   rounded-md">
            <div className="ms-5   md:p-5 text-gray-100 md:ms-5   ">
              <ul className="text-lg">
                {menuItems.map((item, index) => (
                  <motion.li
                    key={item.name}
                    
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    whileHover={{
                      scale: 0.8,
                      backgroundColor: 'white',
                      color: 'black',
                      transition: { duration: 0.1 },
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: '5px',
                      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
                      cursor: 'pointer',

                      
                    }}
                 
                    className=" mt-3 md:mt-3 py-4 text-center "
                  >
                    <motion.a
                    
                     className= ' md:px-0   ' href={item.link}>{item.name}</motion.a>
                    
                  </motion.li>
                ))}
              </ul>
            </div>
           
          </div>


     
        </motion.div>
      

      )}
   

    </>
  );
};

export default Navbar;
