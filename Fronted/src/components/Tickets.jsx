
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import t1 from '../image/t1.webp';
import { motion } from 'framer-motion';
import { Autoplay, Navigation } from "swiper/modules";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
export default function Tickets() {
  const navigate = useNavigate();
  const matches = [
    {
      date: 'Sun 24 Nov 2024, 2:00PM',
      stadium: "St Mary's",
      team1: 'Southampton',
      team2: 'Liverpool FC',
      type: 'Premier League',
      isHome: false,
      logo: t1,
    },
    {
      date: 'Sun 24 Nov 2024, 2:00PM',
      stadium: 'Kingston Park',
      team1: 'Newcastle United Women',
      team2: 'Liverpool FC Women',
      type: 'Women’s League Cup',
      isHome: false,
      logo: t1,
    },
    {
      date: 'Wed 27 Nov 2024, 8:00PM',
      stadium: 'Anfield',
      team1: 'Liverpool FC',
      team2: 'Real Madrid',
      type: 'Champions League',
      isHome: true,
      logo:t1,
    },
    
    {
      date: 'Wed 27 Nov 2024, 8:00PM',
      stadium: 'Anfield',
      team1: 'Liverpool FC',
      team2: 'Real Madrid',
      type: 'Champions League',
      isHome: true,
      logo:t1,
    },
  ];
   
  const [show, setShow] = useState(false);
  
  return (
    <>
    <div>
        <div className="bg-slate-100 p-10 border-b border-blue-800">
        <h2 className="font-bold text-3xl ">Tickets</h2>
        </div>


    <div className="bg-gray-100 p-5  ">
      <div className="bg-red-600 text-white p-3 text-lg font-bold flex justify-between">
      <p>November 2024 </p>
      <button onClick={()=>setShow(show =>!show)} className='text-2xl '>
        {show? 'Close' : 'Open'}
      </button>
      
      
     
      </div>
    { show &&
      <Swiper
       modules={[Navigation,Autoplay]}
       // Register the Navigation module here
        navigation
        spaceBetween={10}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 3, spaceBetween: 20 }, // Show 3 slides on medium+ screens
        }}
        className="mt-4"
      >
        {matches.map((match, index) => (
          <SwiperSlide key={index}>

            <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            whileHover={{ scale: 1.08 }}
             className='bg-slate-300 p-5 cursor-pointer'
             onClick={() => navigate('/ticketDetails')}
            >
              <div className="flex items-center justify-between mb-3 p-4">
                <img src={match.logo} alt="Team Logo" className="h-12 w-12" />
                <span className="text-lg font-bold ">{match.type}</span>
              </div>

              <div>
                <h3 className="font-bold">
                  {match.team1} Vs {match.team2}
                </h3>
                <p>{match.date}</p>
                <p>{match.stadium}</p>
              </div>
             
              <p  className={`p-4 rounded-lg border w-20 ml-auto cursor-pointer  ${
                match.isHome ? 'bg-red-700 text-white' : 'bg-yellow-400'
              }`} >  {
                match.isHome ? 'Home' : 'Away'
              }   </p>

            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    }

    </div>


    </div>
 

   </>
  )
}
