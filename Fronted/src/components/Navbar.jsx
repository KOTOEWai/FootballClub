import { useState } from 'react';
import logo from '../image/2f088356071ac23320b1445c8887adbd.jpg';
import { motion } from "motion/react";
import { Outlet } from 'react-router-dom';

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);

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

  return (
    <>
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
          <a href="/" className="hidden sm:block">Home</a>
          <a href="/tickets" className="hidden sm:block">News</a>
          <a href="/tour" className="hidden sm:block">Sport</a>
          <a href="/shop" className="hidden sm:block">Business</a>

        </div>
        
        <div className='ml-auto flex items-center w-[20%]'>
          <a href="/login">Login</a>
        </div>
      </nav>
      <Outlet/>
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
