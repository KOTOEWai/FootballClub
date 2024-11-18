
/* eslint-disable react/prop-types */
import battle1 from  '../image/l1.svg'
import battle2 from '../image/l2.svg'

import { motion } from 'framer-motion';
const EventCard = ({ event }) => {
  return (
    <motion.div
    className="bg-white rounded-lg shadow-lg overflow-hidden max-w-xs mx-auto"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
    whileHover={{ scale: 1.05 }}>
      <div className="bg-blue-900 p-4 flex items-center justify-between text-white rounded-t-lg">

        <div className="flex items-center space-x-2">
          <img src={event.team1Logo} alt={event.team1} className="w-8 h-8" />
          <span>{event.team1}</span>
        </div>
  
        <img 
  src={event.league === 'Champions League' ? battle2 : battle1} 
  className="w-8 h-8 mx-3" 
  alt="League Icon"
   />
   
     <div className="flex items-center space-x-2">
          <img src={event.team2Logo} alt={event.team2} className="w-8 h-8" />
          <span>{event.team2}</span>
        </div>
      </div>
      <div className="p-4">
        <p className="text-xs  text-black">Football • First Team • Male</p>
        <h3 className="font-semibold text-lg">{event.league}</h3>
        <p className="text-sm text-gray-700">Matchday {event.matchday}</p>
        <div className="mt-4 flex items-center text-gray-700">
          <span className="material-icons mr-1 text-2xl text-black ">Event</span>
          <span className=' ms-3'>{event.date}</span>
        </div>
        <div className="flex items-center text-gray-700 mt-2">
          <span className="material-icons text-black text-2xl mr-1">location_on</span>
          <span className='ms-3'>{event.venue}</span>
        </div>
        <div className="mt-4 text-blue-500 font-semibold">
          <a href="#" className="hover:underline">More</a>
        </div>
      </div>
    </motion.div>
  );
};



export default EventCard;
