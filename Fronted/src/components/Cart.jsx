
import { useSelector} from "react-redux";
import backgroundImage from '../image/tick.jpg'
import { useState,useEffect } from 'react';
import axios from "axios";

import { useParams } from "react-router-dom";

const Cart = () => {
    const cartItems = useSelector((state)=> state.cart.items);
      const totalCart =  cartItems.length;
      const totalCartPrice = useSelector((state) => state.cart.totalPrice);
      const [open,setOpen] = useState(false);
      const { id } = useParams();
      const [match,setMatch] = useState({});
      console.log(match)
    useEffect(() =>{
        const fetchMatch = async () =>{
          try{
            const response = await axios.get(`http://localhost:3000/api/matches/${id}`);
              const data = response.data;
               setMatch(data);
          }catch(error){
            console.error('Error fetching matches:',error);
          }
        }
        fetchMatch();
    },[id])
  return (
    <>
    <div className="font-[sans-serif] bg-white p-4 mt-2 mb-3">
    <div className="md:max-w-5xl max-w-xl mx-auto">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 max-md:order-1">
          <h2 className="text-3xl font-extrabold text-gray-800">Make a payment</h2>
          <p className="text-gray-800 text-sm mt-4">Complete your transaction swiftly and securely with our easy-to-use payment process.</p>

          <form className="mt-8 max-w-lg">
            <div className="grid gap-4">
              <div>
                <input type="text" placeholder="Cardholder's Name"
                  className="px-4 py-3.5 bg-gray-100 text-gray-800 w-full text-sm border rounded-md focus:border-purple-500 focus:bg-transparent outline-none" />
              </div>

              <div className="flex bg-gray-100 border rounded-md focus-within:border-purple-500 focus-within:bg-transparent overflow-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 ml-3" viewBox="0 0 32 20">
                  <circle cx="10" cy="10" r="10" fill="#f93232" data-original="#f93232" />
                  <path fill="#fed049"
                    d="M22 0c-2.246 0-4.312.75-5.98 2H16v.014c-.396.298-.76.634-1.107.986h2.214c.308.313.592.648.855 1H14.03a9.932 9.932 0 0 0-.667 1h5.264c.188.324.365.654.518 1h-6.291a9.833 9.833 0 0 0-.377 1h7.044c.104.326.186.661.258 1h-7.563c-.067.328-.123.66-.157 1h7.881c.039.328.06.661.06 1h-8c0 .339.027.67.06 1h7.882c-.038.339-.093.672-.162 1h-7.563c.069.341.158.673.261 1h7.044a9.833 9.833 0 0 1-.377 1h-6.291c.151.344.321.678.509 1h5.264a9.783 9.783 0 0 1-.669 1H14.03c.266.352.553.687.862 1h2.215a10.05 10.05 0 0 1-1.107.986A9.937 9.937 0 0 0 22 20c5.523 0 10-4.478 10-10S27.523 0 22 0z"
                    className="hovered-path" data-original="#fed049" />
                </svg>
                <input type="number" placeholder="Card Number"
                  className="px-4 py-3.5 text-gray-800 w-full text-sm outline-none bg-transparent" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input type="number" placeholder="EXP."
                    className="px-4 py-3.5 bg-gray-100 text-gray-800 w-full text-sm border rounded-md focus:border-purple-500 focus:bg-transparent outline-none" />
                </div>
                <div>
                  <input type="number" placeholder="CVV"
                    className="px-4 py-3.5 bg-gray-100 text-gray-800 w-full text-sm border rounded-md focus:border-purple-500 focus:bg-transparent outline-none" />
                </div>
              </div>
            </div>

            <button type="button" onClick={()=>setOpen((cur)=>!cur)} className="mt-8 w-40 py-3.5 text-sm bg-purple-500 text-white rounded-md hover:bg-purple-600 tracking-wide">Pay  </button>
          </form>
        </div>

        <div className="bg-gray-100 p-6 rounded-md w-52">
          <p className="">PaymentDetails</p>
          <p className="text-3xl font-normal text-gray-800">{totalCartPrice.toFixed(2)}$</p>
      {cartItems.map((item, i) =>(
          <ul key={i} className="text-gray-800 mt-8 ">
            <li className="flex flex-wrap  text-base">Type -<span className="mx-auto text-xl font-bold">{item.substr(0,5)}</span></li>
           
        </ul>
        ))}
        <p className="flex  text-lg font-bold border-t-2 pt-4">Total = <span className="ml-auto">{totalCartPrice.toFixed(1)}$</span></p>

        </div>
      </div>
    </div>
  </div>

{ open &&
   <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
   <div className="bg-white rounded-lg p-6 top-0   md:w-[55%] h-full shadow-lg relative overflow-y-auto">
     <button
       className="absolute top-4  text-red-500 hover:text-red-600 text-4xl"
     >
       &times;
     </button>

     <div className="text-center">
        <h1 className="text-5xl font-bold mt-32">Thank You!</h1>
        <p className="text-lg font-medium">
          Your ticket has been successfully purchased!   <span className="text-yellow-300">🎉</span>
        </p>
      </div>

     <div className=" mx-auto p-4  text-black rounded-lg shadow-blue-400 mt-4 "   style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover", // Makes the image cover the entire container
        backgroundPosition: "center", // Full viewport height
        width: "100%", // Full width
      }}>
      {/* Ticket Header */}
      <div className="text-center mb-4">
        <h2 className="text-lg font-bold uppercase tracking-widest">{match.matchType}</h2>
       
      </div>

      <div  className="flex justify-center items-center  mb-6">
        <div className="flex flex-col items-center m-4">
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
            <img  src={`http://localhost:3000/uploads/${match.teamlogo[0]}`}alt="Team 1 Logo" className="w-10 h-10 rounded-lg" />
          </div>
          <p className="text-sm font-semibold mt-2">{match.homeTeam}</p>
         
        </div>
        <div className="text-xl font-bold"><span className="text-red-400">⚽</span></div>
        <div className="flex flex-col items-center m-4">
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
            <img  src={`http://localhost:3000/uploads/${match.teamlogo[1]}`} alt="Team 2 Logo" className="w-10 h-10" />
          </div>
          <p className="text-sm font-semibold mt-2">{match.awayTeam}</p>
        
        </div>
      </div>

     
      <div className="text-sm mb-4 flex  justify-center items-center gap-5  ">
        <div className="">
          <p>Date</p>
          <p>Location</p>
        </div>
        <div className="">
          <p>
            {match.matchDate}
          </p>
          <p>
            {match.location}
          </p>
        </div>
      </div>
  
      {/* Ticket Footer */}
      <div className="text-center mt-6">
        <p className="font-bold text-lg uppercase"> 
        <span className="text-green-400">🏟️</span>{match.stadium}</p>
    
      </div>
    </div>

</div>
</div>

}
</>


  )
}

export default Cart
