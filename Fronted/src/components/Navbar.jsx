import { useState } from 'react';
import logo from '../image/real-madrid-logo-symbol-black-and-white-design-spain-football-european-countries-football-teams-illustration-free-vector.jpg';
import { motion } from "motion/react";

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);

  const menuItems = [
    { name: "Home", link: "/" },
    { name: "Tickets", link: "/tickets" },
    { name: "Tour", link: "/tour" },
    { name: "Shop", link: "/shop" },
    { name: "Contact", link: "/contact" },
    { name: "About Us", link: "/about" },
    { name: "Help", link: "/help" },
    { name: "Blog", link: "/blog" }
  ];

  return (
    <>
      <nav className='flex' >
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
          <img src={logo} alt="logo" className='w-50 h-20' />
        </div>

        <div className='hidden md:flex justify-center items-center md:ml-40 gap-10 font-serif p-10'>
          <a href="/" className="hidden sm:block">Home</a>
          <a href="/tickets" className="hidden sm:block">Tickets</a>
          <a href="/tour" className="hidden sm:block">Tour</a>
          <a href="/shop" className="hidden sm:block">Shop</a>
        </div>
        
        <div className='ml-auto flex items-center w-[20%]'>
          <a href="/login">Login</a>
        </div>
      </nav>
     
      {navbar && (
        <motion.div
          initial={{ opacity: 0, x:-50 }}
          animate={{ opacity: 1 ,x: 0 }}
          transition={{ duration: 2 }}
          className="top-5 right-0 w-[100%] flex opacity-50 z-50"
        >
          <div className="h-full w-[70%] bg-dark-primary">
            <div className="p-5 text-gray-100 ms-5 w-[25%] border-r-2 border-sky-500">
              <ul className="text-lg">
                {menuItems.map((item, index) => (
                  <motion.li
                    key={item.name}
                    className="pt-5"
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <a href={item.link}>{item.name}</a>
                    
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>

            </div>
          </div>

          <motion.div className='w-[30%] backdrop-blur-xl bg-white/30 brightness-150' />
        </motion.div>
      )}
    </>
  );
};

export default Navbar;
