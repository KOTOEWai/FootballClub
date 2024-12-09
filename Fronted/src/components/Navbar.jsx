
import { useContext, useEffect, useState } from 'react';
import logo from '../image/2f088356071ac23320b1445c8887adbd.jpg';
import { motion } from "motion/react";
import {   useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import IconButton from '@mui/material/IconButton';
import {useSelector,useDispatch} from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp';
import {  removeItem, clearCart } from '../features/cart/cartSlice';
import { MatchContext } from './MatchContext';
import { removeShopItem } from '../features/cart/shoppingCart'
import { update} from '../features/cart/shoppingCart'
const Navbar = () => {
const { user,dispatch } = useContext(AuthContext)
 const Cartdispatch = useDispatch();
 const Shopdispatch = useDispatch();
const navigate = useNavigate();
const [navbar, setNavbar] = useState(false);
const [isModalOpen, setIsModalOpen] = useState(true);
const cartItems = useSelector((state)=> state.cart.items);
const ShopcartItems = useSelector((state) => state.shoppingCart?.Shoppingitems);
const totalCart =  cartItems.length + ShopcartItems.length;
const totalCartPrice = useSelector((state) => state.cart.totalPrice);
const totalShopCartPrice = useSelector((state) => state.shoppingCart.totalPrice);
const [info,setInfo] = useState({});
const [openCart, setOpenCart] = useState(false);
const { selectedMatchId } = useContext(MatchContext);
const closeModal = () => setIsModalOpen(true);
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
const handleRemoveFromCart = (index) => {
  Cartdispatch(removeItem(index));
};
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

const handleDelete =  (i) =>{
  console.log(i)
  Shopdispatch(removeShopItem(i))
}



const handleAdd = (id) => {
  Shopdispatch(update({id,increment:true}))
  
};

const handleSubtr = (id) => {
    Shopdispatch(update({id, increment:false}))
};

  return (

    <>
  
      <nav className='flex border-b  text-black  top-0  w-full ' style={{backgroundColor: '#FAFAFA'}} >
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
          <img src={logo} alt="logo" className='w-58 h-20 ps-5 rounded-full ' />
        </div>
        <div className='hidden md:flex justify-center items-center md:ml-40 gap-10 font-serif p-10'>

     
          <Link to="/" className="hidden sm:block">Home</Link>
          <Link to="/ticket" className="hidden sm:block">Fixtures</Link>
          <Link to="/player" className="hidden sm:block">Players</Link>
          <Link to="/Store" className="hidden sm:block">Stores</Link>
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
       <div className='flex justify-center items-center md:gap-10'>
        <div className='flex'>
        <p className= {`absolute ${ totalCart === 0 ? '' : "bg-red-700"} text-white  md:p-2 rounded-full md:ml-9 md:text-sm`}>{totalCart === 0 ? '' :totalCart }</p>
        <ShoppingCartSharpIcon fontSize='medium' onClick={() => setOpenCart((current)=>!current)} sx={{ fontSize: 40, cursor: 'pointer' }}>
        
       </ShoppingCartSharpIcon>
       </div>
       <div  onClick={() => setIsModalOpen(false)} className="relative inline-block">
           <img src={`http://localhost:3000/uploads/${info.profile_img ? info.profile_img[0] : 'profile-user.jpg'}`} className="md:w-14 h-14 rounded-full" />
            <span className="h-3 w-3 rounded-full border border-white bg-green-500 block absolute bottom-1 right-0"></span>
          </div>
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

            <div className="relative inline-block">
           <img src={`http://localhost:3000/uploads/${info.profile_img ? info.profile_img[0] : 'default.jpg'}`} className="w-14 h-14 rounded-full" />
            <span className="h-3 w-3 rounded-full border border-white bg-green-500 block absolute bottom-1 right-0"></span>
             </div>

              {/* User Avatar */}
             
              <p className="text-lg font-medium text-gray-700">Name: {info.name}</p>
              <p className="text-lg font-medium text-gray-700">Email: {info.email}</p>
              <p className="text-lg font-medium text-gray-700">Role: {info.role}</p>
            </div>
          </div>
        </div>
      )}
       
           
      </nav>
      
       { openCart && (
       <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
       <div className="bg-white rounded-lg p-6 top-0 ml-auto  md:w-[60%] h-full shadow-lg relative overflow-y-auto">
         <button
         onClick={()=> setOpenCart(false)}
           className="absolute top-4  text-red-500 hover:text-red-600 text-4xl"
         >
           &times;
         </button>
         <div className="  mt-9 ">
  <div className="bg-stone-100 rounded-md">
    <h3 className="text-lg font-bold text-black mb-2 p-3">Selected Tickets</h3>
    {cartItems.length > 0 ? (
      <div className="flex flex-col justify-center items-center">
        {cartItems.map((item, index) => (
          <div key={index} className="space-x-2 text-xl bg-white m-3 p-2 rounded-md flex items-center">
            <span>{item}$</span>
            <IconButton aria-label="delete" onClick={() => handleRemoveFromCart(index)}>
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-gray-500 p-3">No seat selected</p>
    )}
    <div className="flex justify-between">
      <div className='p-4 flex justify-center items-center '>
      <p className='font-bold text-lg text-red-600'>TotalPrice</p>
      <p  className='p-4 font-bold text-xl'>{totalCartPrice} $</p>
      </div>

      <div className="mt-4 ">
      <button className=" p-4 md:mx-3  rounded-md bg-green-600 text-white text-sm font-bold" onClick={() => navigate(`/checkoutDetails/${selectedMatchId}`)} >
        CheckOut
      </button>
      <button className=" p-4  md:mx-3 rounded-md bg-red-600 text-white text-sm font-bold" onClick={() => Cartdispatch(clearCart())}>
        Clear Cart
      </button>
      </div>

    </div>
  </div>
          </div>

      <div>
      <div className="font-sans md:max-w-7xl max-md:max-w-7xl mx-auto bg-white py-4">
       
            <div className="grid md:grid-cols-3 gap-4">
                <div className="md:col-span-2 bg-gray-100 p-4 rounded-md">
                    <h2 className="text-2xl font-bold text-gray-800">ShoppingCart</h2>
                    <hr className="border-gray-300 mt-4 mb-8" />
     {ShopcartItems.map((product,i)=> (
       
                    <div key={i} className="space-y-4">
                        <div className="grid grid-cols-3 items-center gap-4">
                            <div className="col-span-2 flex items-center gap-4">
                                <div className="w-24 h-24 shrink-0 bg-white p-2 rounded-md">
                                    <img   src={`http://localhost:3000/uploads/${product.img}`} className="w-full h-full object-contain" />
                                </div>

                                <div>
                                    <h3 className="text-base font-bold text-gray-800">{product.name}</h3>
                                    <h6
                                     onClick={()=>handleDelete(i)}
                                     className="text-xs text-red-500 cursor-pointer mt-0.5">Remove</h6>

                                    <div className="flex gap-4 mt-4">
                                        <div className="relative group">
                                            <button type="button"
                                                className="flex items-center px-2.5 py-1.5 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md">
                                                XL
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 fill-gray-500 inline ml-2.5" viewBox="0 0 24 24">
                                                    <path fillRule="evenodd"
                                                        d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                                                        clipRule="evenodd" data-original="#000000" />
                                                </svg>
                                            </button>

                                            <ul className='group-hover:block hidden absolute rounded-md min-w-[80px] shadow-lg bg-white z-[1000]'>
                                                <li className='py-2 px-4 hover:bg-gray-100 text-gray-800 text-xs cursor-pointer'>SM</li>
                                                <li className='py-2 px-4 hover:bg-gray-100 text-gray-800 text-xs cursor-pointer'>MD</li>
                                                <li className='py-2 px-4 hover:bg-gray-100 text-gray-800 text-xs cursor-pointer'>XL</li>
                                                <li className='py-2 px-4 hover:bg-gray-100 text-gray-800 text-xs cursor-pointer'>XXL</li>
                                            </ul>
                                        </div>

                                        <div>
                                            <button type="button"
                                                className="flex items-center px-2.5 py-1.5 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 fill-current" viewBox="0 0 124 124" onClick={()=>handleSubtr(i)} >
                                                    <path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z" data-original="#000000"></path>
                                                </svg>

                                                <span className="mx-2.5">{product.quantity||1}</span>

                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 fill-current" viewBox="0 0 42 42" onClick={()=>handleAdd(i)}>
                                                    <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" data-original="#000000"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="ml-auto">
                                <h4 className="text-base font-bold text-gray-800">{product.price*product.quantity||product.price}$</h4>
                            </div>
                        </div>

                      
                    </div>
      ))}
                </div>

                <div className="bg-gray-100 rounded-md p-4 md:sticky top-0">
                    <div className="flex border border-blue-600 overflow-hidden rounded-md">
                        <input type="email" placeholder="Promo code"
                            className="w-full outline-none bg-white text-gray-600 text-sm px-4 py-2.5" />
                        <button type='button' className="flex items-center justify-center font-semibold tracking-wide bg-blue-600 hover:bg-blue-700 px-4 text-sm text-white">
                            Apply
                        </button>
                    </div>

                    <ul className="text-gray-800 mt-8 space-y-4">
                        <li className="flex flex-wrap gap-4 text-base">Discount <span className="ml-auto font-bold">$0.00</span></li>
                        <li className="flex flex-wrap gap-4 text-base">Shipping <span className="ml-auto font-bold">$2.00</span></li>
                        <li className="flex flex-wrap gap-4 text-base">Tax <span className="ml-auto font-bold">$4.00</span></li>
                        <li className="flex flex-wrap gap-4 text-base font-bold">Total <span className="ml-auto">{totalShopCartPrice+6}$</span></li>
                    </ul>

                    <div className="mt-8 space-y-2">
                        <button type="button" className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-blue-600 hover:bg-blue-700 text-white rounded-md">Checkout</button>
                        <Link type='button' to='/Store'  onClick={()=>setOpenCart(false)} className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent text-gray-800 border border-gray-300 rounded-md">Continue Shopping  </Link>
                    </div>
                </div>
            </div>

        </div>

      </div>

       </div>
     </div>
       )
       }
      
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
