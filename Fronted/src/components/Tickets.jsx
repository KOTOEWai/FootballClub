
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import {  motion } from 'framer-motion';
import { Autoplay, Navigation } from "swiper/modules";
import { useState,useEffect,useContext } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Button } from '@mui/material';
import { format } from 'date-fns';
import {MatchContext}  from './MatchContext'

export default function Tickets() {
  const navigate = useNavigate();
  const [ ticket,setTicket] = useState([]);
  const{setSelectedMatchId} = useContext(MatchContext)
  const [filterMatch,setFilterMatch] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  


  
  useEffect(()=>{
    const fetchmatches = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/matches/");
       setTicket(response.data)
       setFilterMatch(response.data)
      } catch (error) {
        console.error("Error fetching team matches:", error.message);
      }
    };
    fetchmatches();
  },[])
 
  useEffect(()=>{
    if(searchQuery === ""){
      setFilterMatch(ticket)
    }else{
      setFilterMatch(ticket.filter(
        match=>
        match.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.awayTeam.toLowerCase().includes(searchQuery.toLowerCase()) 
      ))
    }
  },[searchQuery,ticket])
  return (
    <>
    <div>
       
    <div className=" p-5 mt-2  ">
      <div className=" text-black p-3 text-lg font-bold flex justify-between">
      <h2 className="font-bold text-3xl ">Fixtures</h2>
      <div className="relative flex">
  <input
    type="search"
    className="relative m-0 block flex-auto rounded-full border border-solid border-neutral-200 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-surface outline-none transition duration-200 ease-in-out placeholder:text-neutral-500 focus:z-[3] focus:border-primary focus:shadow-inset focus:outline-none motion-reduce:transition-none dark:border-white/10 dark:text-white dark:placeholder:text-neutral-200 dark:autofill:shadow-autofill dark:focus:border-primary"
    placeholder="Search"
    aria-label="Search"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    id="exampleFormControlInput2"
    aria-describedby="button-addon2" />
  <span
    className="flex items-center whitespace-nowrap px-3 py-[0.25rem] text-surface cursor-pointer dark:border-neutral-400 dark:text-white [&>svg]:h-5 [&>svg]:w-5"
    id="button-addon2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
  </span>
</div>
      </div>

    <div>
      <Swiper
       modules={[Navigation,Autoplay]}
       // Register the Navigation module here
        navigation
        spaceBetween={10}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 3, spaceBetween: 20 }, // Show 3 slides on medium+ screens
        }}
        className="mt-4 mb-7 shadow-slate-50 "
      >
        {filterMatch.map((match, index) => (
          <SwiperSlide key={index}>

            <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            whileHover={{ scale: 1.01 }}
             className='  p-5 cursor-pointer text-black rounded-lg '
             style={{backgroundColor: 'white'}}
            >
              <div className="flex items-center justify-between mb-3 p-4">
                <img  src={`http://localhost:3000/uploads/${match.teamlogo[0]}`} alt="Team Logo" className="h-12 w-12" />
                VS
                <img   src={`http://localhost:3000/uploads/${match.teamlogo[1]}`} alt="Team Logo" className="h-12 w-12" />
                
              </div>

              <div className="space-y-6">
                <div className="font-bold text-center flex justify-between ">
                     <p>  {match.homeTeam}</p>    <p>{match.awayTeam} </p>
                </div>

                <div className='flex justify-between '>
                <div className='space-y-3'>
                <p className='' style={{color:""}}>MatchDate</p>
                <p className='' style={{color:""}}>MatchTime</p>
                <p className='' style={{color:""}}>Stadium</p>
                <p className='' style={{color:""}}>Location</p>
                <p className='' style={{color:""}}>Referees</p>
                </div>
                <div className='space-y-3 '>
                <p>{format(match.matchDate,'dd/MM/yyyy')}</p>
                <p>{match.matchTime}</p>
                <p> {match.stadium} </p>
                <p> {match.location} </p>
                <p> {match.referees} </p>
                </div>

                </div>
              </div>
              <div className='ml-72 mt-3'>
              <Button variant="outlined" size="medium" color='white'  onClick={() => {
                      setSelectedMatchId(match._id); // Set match ID in context
                      navigate(`/ticketDetails/${match._id}`); // Navigate to details page
                    }}>
              Ticket
             </Button>
             </div>

            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
      </div>

    </div>


    </div>
 

   </>
  )
}
