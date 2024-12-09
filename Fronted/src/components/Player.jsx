

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from "swiper/modules";
import { useNavigate } from 'react-router-dom';



const AddPlayerForm = () => {
  const navigate = useNavigate();

  const [players,setplayers] = useState([]);
   useEffect (() =>{
    const fetchPlayer = async () =>{
      try{
        const response = await axios.get('http://localhost:3000/api/players');
       setplayers(response.data);
       console.log(response.data);
      }catch(error){
        console.error('Error fetching players:', error.message);
      }
    }
      fetchPlayer()
  },[])



  return (
<>
<div className="mt-3 ">

<Swiper
 modules={[Navigation,Autoplay]}
        navigation
        spaceBetween={10}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 3, spaceBetween: 20 }, // Show 3 slides on medium+ screens
        }}
         className="mt-4 mb-7 shadow-slate-50 md:w-[35%]  md:gap-1  container    md:mx-10  "
      >
        
{
   players.filter((n)=>n.position==="Goalkeeper").map((player, index) => (

  <SwiperSlide  key={index}
  onClick={()=>navigate(`/playerDetails/${player._id}`)}
  className=" max-w-[20rem]  rounded-lg shadow-lg cursor-pointer bg-white text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white">
  <div className="relative overflow-hidden bg-cover bg-no-repeat ">
  <img
  src={`http://localhost:3000/uploads/${player.profileImage[0]}`}
             className="  object-cover  w-full "
           />
  </div>
  <div className="p-6">
    <p className="text-base">
    {player.name}
    </p>
  </div>

</SwiperSlide>
       
 

   ))
}  
</Swiper>


<Swiper
 modules={[Navigation,Autoplay]}
        navigation
        spaceBetween={10}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 3, spaceBetween: 20 }, // Show 3 slides on medium+ screens
        }}
         className="mt-4 mb-7 shadow-slate-50 md:w-[35%]  md:gap-1  container    md:mx-10  "
      >
{
   players.filter((n)=>n.position==="Defender").map((player, index) => (

  <SwiperSlide  key={index}
  onClick={()=>navigate(`/playerDetails/${player._id}`)}
  className="block max-w-[20rem]  rounded-lg shadow-lg bg-white text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white">
  <div className="relative overflow-hidden bg-cover bg-no-repeat ">
  <img
  src={`http://localhost:3000/uploads/${player.profileImage[0]}`}
             className="  object-cover  w-full "
           />
  </div>
  <div className="p-6">
    <p className="text-base">
    {player.name}
    </p>
  </div>

</SwiperSlide>
       
 

   ))
}  
</Swiper>

<Swiper
 modules={[Navigation,Autoplay]}
        navigation
        spaceBetween={10}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 }, // Show 3 slides on medium+ screens
        }}
        className="mt-4 mb-7 shadow-slate-50 md:w-[35%]  md:gap-1  container    md:mx-10  "
      >
{
   players.filter((n)=>n.position==="Midfielder").map((player, index) => (

  <SwiperSlide  key={index}
  onClick={()=>navigate(`/playerDetails/${player._id}`)}
  className="block max-w-[20rem]  rounded-lg shadow-lg bg-white text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white">
  <div className="relative overflow-hidden bg-cover bg-no-repeat ">
  <img
  src={`http://localhost:3000/uploads/${player.profileImage[0]}`}
             className="  object-cover  w-full "
           />
  </div>
  <div className="p-6">
    <p className="text-base">
    {player.name}
    </p>
  </div>

</SwiperSlide>
       
 

   ))
}  
</Swiper>
 
<Swiper
 modules={[Navigation,Autoplay]}
        navigation
        spaceBetween={10}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 }, // Show 3 slides on medium+ screens
        }}
        className="mt-4 mb-7 shadow-slate-50 md:w-[35%]  md:gap-1  container    md:mx-10  "
      >
{
   players.filter((n)=>n.position==="Forward").map((player, index) => (

  <SwiperSlide  key={index}
  onClick={()=>navigate(`/playerDetails/${player._id}`)}
  className="block max-w-[20rem]  rounded-lg shadow-lg bg-white text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white">
  <div className="relative overflow-hidden bg-cover bg-no-repeat ">
  <img
  src={`http://localhost:3000/uploads/${player.profileImage[0]}`}
             className="  object-cover  w-full "
           />
  </div>
  <div className="p-6">
    <p className="text-base">
    {player.name}
    </p>
  </div>

</SwiperSlide>
       
 

   ))
}  
</Swiper>


</div>
 

 

</>


  );
}

export default AddPlayerForm;
