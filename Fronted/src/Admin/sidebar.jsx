import { NavLink } from 'react-router-dom';
import toggle from '../image/web.png';
import close from '../image/cross.png';
import {  useState } from 'react';
import { Outlet } from 'react-router-dom';

export default function Sidebar() {
  const [open, setOpen] = useState(false);
 




 
  
  return (
    <>
      {/* Navbar */}
      <div className="">

      <div className="  justify-between items-center text-black">

        <div className='flex justify-between bg-slate-200 p-5'>
        
        {!open ? (
          <img
            src={toggle}
            onClick={() => setOpen(true)}
            alt="toggle"
            className="w-10 h-10 cursor-pointer"
          />
        ) : (
          <img
            src={close}
            onClick={() => setOpen(false)}
            alt="close"
            className="w-10 h-10 cursor-pointer "
          />
        )}
        <h1 className="text-xl font-bold">Football Admin</h1>
        <button  className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 text-white">
          Logout
        </button>
        </div>

        <div
        className={` bg-slate-600 bg-opacity-55 text-white md:p-4 md:space-x-5 w-full  md:h-20 md:flex justify-center items-center md:space-y-0 space-y-3   ${
          open ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 md:translate-x-0 absolute md:w-60`}
      >
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `p-2 rounded block hover:bg-gray-700  ${
              isActive ? 'bg-gray-700' : ''
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/players"
          className={({ isActive }) =>
            `p-2 rounded block hover:bg-gray-700 ${
              isActive ? 'bg-gray-700' : ''
            }`
          }
        >
          Player Management
        </NavLink>
        <NavLink
          to="/admin/matches"
          className={({ isActive }) =>
            `p-2 rounded block hover:bg-gray-700 ${
              isActive ? 'bg-gray-700' : ''
            }`
          }
        >
          Match Management
        </NavLink>
        <NavLink
          to= '/admin/tickets/ You need to insert Match ID'
          className={({ isActive }) =>
            `p-2 rounded block hover:bg-gray-700 ${
              isActive ? 'bg-gray-700' : ''
            }`
   }
        >
          Ticket Management
        </NavLink>
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `p-2 rounded block hover:bg-gray-700 ${
              isActive ? 'bg-gray-700' : ''
            }`
          }
        >
          User Management
        </NavLink>

        <NavLink
          to="/admin/product"
          className={({ isActive }) =>
            `p-2 rounded block hover:bg-gray-700 ${
              isActive ? 'bg-gray-700' : ''
            }`
          }
        >
          Product Management
        </NavLink>
         </div>
      
        
     
      </div>
  
     
      <Outlet/>
      </div>

      
     
      
    </>
  );
}
