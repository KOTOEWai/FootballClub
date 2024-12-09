import { motion } from 'framer-motion';
import footballField from '../image/vector-green-soccer-field-football-field-gridiron_1284-41290.avif';
import { useState,useEffect,useMemo } from 'react';
import ARole from '../image/1st.jpg';
import Button from '@mui/material/Button';
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';

import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch} from 'react-redux';
import { addItem } from '../features/cart/cartSlice';
export default function Players() {
  const dispatch = useDispatch();
  const {id} = useParams();
  const navigate = useNavigate();
  const [ info ,setInfo] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ ticket,setTicket] = useState([]);
  const [selectNumber,setSelectNumber] = useState([]);
 
  const availableTicket = useMemo(()=>{
    if(info[0]){
       return ticket.find((t)=>t.seating.seatingType === info[0])?.seating?.seatNumber||[]
    }
    return [];
  },[info,ticket])
   const closeModal = ()=>{
    setIsModalOpen (false)
   }
  const isTicketSelect = (seatingType, seatNumber) => {
    return selectNumber.some(
      (selected) => selected.seat === `${seatingType} - ${seatNumber}`
    );
  };
  useEffect(()=>{
    const fetchmatches = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/tickets/");
       if(response.data[0].matchId._id === id){
       setTicket(response.data)
       
       }else{
        alert("NO tickets in this match")
        navigate('/ticket')
        
       }
       

      } catch (error) {
        console.error("Error fetching team tickets:", error.message);
      }
    };
    fetchmatches();
  },[id, navigate])

  const totalPrice =useMemo( ()=> { 
    return  selectNumber.reduce(
    (total, ticket) => total + parseFloat(ticket.price),
    0)},[selectNumber])

  const onClick = (title) => {
    const ticketItem = ticket.find((ticket) => ticket.seating.seatingType === title);
    if (ticketItem) {
      setInfo([`${ticketItem.seating.seatingType}` ,`${ticketItem.price}`]); 
      
    } else {
     
      setInfo(["No ticket available "]);
    }
  };
  
  const handleDelete = (index) => {
    setSelectNumber((prev) => prev.filter((_, i) => i !== index));
  };
  
  const handleAddCart = () => {
    selectNumber.forEach((item) => {
    dispatch(addItem( {seat:item.seat,price:item.price}));
    });
  };
  
 
  

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mt-2 ">
      
      <div className=" m-6 rounded-xl cursor-pointer">

        <div className="relative">      
          {/* Top row of bars */}
          <motion.div
            className="w-[100%] h-20 flex gap-3 absolute"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {['A0', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7'].map((value, index) => (
              <motion.div
                key={index}
                onClick={()=>onClick(value)}
                className={`w-[10%] bg-red-600 h-20  ${
                  index === 0 ? 'rounded-tl-full': index === 7 ? 'rounded-tr-full md:ms-3' : 'rounded-lg'
                }`}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-white text-center pt-8">{value}</p>
              </motion.div>
            ))}
          </motion.div>

          

          {/* Middle section */}
          <motion.div
            className="w-[100%] h-20 space-y-3 mt-3"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div  className="w-[10%] bg-red-600 h-20 rounded-tl-full" />
            {['D1', 'D2', 'D3'].map((value, index) => (
              <motion.div
                key={index}
                onClick={()=>onClick(value)}
                className={`w-[10%] bg-yellow-200 rounded-xl h-${index === 2 ? '28' : '20'}`}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-center pt-6">{value}</p>
              </motion.div>
            ))}

            
          </motion.div>


        </div>

        {/* Center image */}
        <div className="flex justify-center">
          <motion.img
            src={footballField}
            alt=""
            className="w-[70%] ms-16 md:ms-12  rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.div
            className="w-[12%] h-100 my-3 ps-2 md:ps-5"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1  }}
            transition={{ duration: 0.5 }}
          
          >
            {['B1', 'B2', 'B3'].map((value, index) => (
              <motion.div
                key={index}
                onClick={()=>onClick(value)}
                className={`bg-yellow-200 rounded-xl h-${index === 2 ? '28' : '20'} mt-2 md:mt-3 `}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-center pt-5">{value}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom row of bars */}
        <motion.div
          className="w-[100%] h-20 flex gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {['C0', 'C1', 'C2', '', '', 'C3', 'C4' ,'C5'].map((value, index) => (
            <motion.div
              key={index}
              onClick={()=>onClick(value)}
              className={`w-[10%] bg-red-600 h-20  ${  index === 5 ? 'w-[18%]' :   index === 2 ? 'w-[20%]' :  index === 4 ? 'bg-red w-3' : index === 3 ? 'bg-red w-3 ' : index === 0 ? 'rounded-bl-full' : index === 7 ? 'rounded-br-full ' : 'rounded-lg' 
              }`}
              whileHover={{ rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-white text-center pt-6">{value}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
        
    <div className=''>
    <div className="p-8 rounded-xl shadow-2xl w-[95%] max-w-lg mx-auto mt-4">
  <h2 className="text-lg font-bold text-red-600 mb-2">TICKETS</h2>
  <p className="text-sm text-gray-700 mb-6">
             MATCH WITH NAMED TICKETS
   <br />
          Attendees will need to complete their details to receive the tickets
          and a membership card or identification document will be requested at
          the entrance.
   </p>

{ info.length >0  ? <div className=' p-3 rounded-lg '>
    <img src={ARole} alt="" className="object-cover w-full " />
    <div className='flex justify-between'>
    <div className='flex  mt-3 '>
      <div className='flex justify-center items-center'>
        <p className="text-xl text-red-700 mb-2 font-bold">TYPE  -</p>
    {
      info.map((t,i)=>(
        
            <div key={i} className=" p-2 rounded-lg mb-2">
            <p className='font-semibold text-2xl'>{t}</p>
            </div>
      ))
    }
     </div>
    <p className="text-xl font-bold mt-2 pt-0.5 ">{info ? '$':''}</p>
    </div>
  

    <div className='mt-4'>
     <Button variant="contained" color="success" size=''  onClick={()=>setIsModalOpen(true)}>
      Available
    </Button>
    </div>

     </div>
  
   </div> : '' 
 }
    
    {isModalOpen && (
  <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg p-4 md:p-6 lg:p-8 max-w-[90%] md:max-w-[70%] lg:max-w-[50%] w-full shadow-lg h-auto max-h-[90%] overflow-y-auto">
      {/* Close Button */}
      <div className="text-red-500 hover:text-red-600 duration-300 flex justify-between items-center">
      <p className="font-bold text-xl">SeatingType - {info[0]}</p>
        <button className="text-2xl md:text-4xl" onClick={closeModal}>
          ×
        </button>
      </div>
  
      <p className="font-semibold font-serif mt-2 text-sm md:text-base">
        Available Seating Number
      </p>
      {/* Seating Numbers */}
      <div className="flex flex-wrap gap-2 mt-4">
        
        {availableTicket.map((seatNumber, index) => {
              const isSelected = isTicketSelect(info[0], seatNumber);
              return (
                <div
                  key={index}
                  className={`cursor-pointer px-2 py-1 md:px-3 md:py-2 text-sm md:text-base ${
                    isSelected
                      ? "bg-black text-white cursor-not-allowed rounded-lg"
                      : "bg-gray-300 rounded-md hover:bg-gray-300 hover:rounded-lg"
                  }`}
                  onClick={() => {
                    if (!isSelected) {
                      setSelectNumber((prev) => [
                        ...prev,
                        { seat: `${info[0]} - ${seatNumber}`, price: `${info[1]}` },
                      ]);
                    }
                  }}
                >
                  {`${seatNumber}`}
                </div>
              );
            })}
      </div>

      {/* Selected Tickets Section */}
      <div className="mt-6">
        <div className="bg-stone-100 rounded-md p-4">
          <h3 className="text-lg font-bold text-black mb-4">Selected Tickets</h3>
          {selectNumber.length > 0 ? (
            <div className="flex flex-col gap-2">
              {selectNumber.map((s, i) => (
                <div
                  key={i}
                  className="bg-white flex items-center justify-between p-2 rounded-md shadow-sm"
                >
               <span>{s.seat}</span>
                  <IconButton aria-label="delete"  onClick={() => handleDelete(i)}>
                 <DeleteIcon />
               </IconButton>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No seat selected</p>
          )}

          {/* Total Price and Cart Button */}
          <div className="flex justify-between items-center mt-4">
            <p className="text-lg font-bold">
              Total Price: $ {totalPrice}
           
            </p>
            <button
              onClick={handleAddCart}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md text-sm font-bold"
            >
              Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

  {/* Scrollable Container */}
  <div className="divide-y divide-gray-300 h-80  overflow-y-auto">
    {ticket.map((ticket, index) => (
      <motion.div
        key={index}
        className="flex justify-between items-center py-4  hover:bg-gray-200 px-2 cursor-pointer rounded"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        
        onClick={() => setInfo([`${ticket.seating.seatingType}` ,`${ticket.price}`])
        }
      >
        <div className="flex items-center gap-3">
          
        
          <span className="text-gray-900 text-sm font-medium">
            {ticket.seating.seatingType}
          </span>
        </div>

        <span className="text-gray-700 text-sm font-semibold">
          {ticket.price}$
        </span>
      </motion.div>
    ))}
  </div>
</div>

        </div>

    </div>
  );
}
