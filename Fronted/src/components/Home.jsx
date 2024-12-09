
import image1  from '../image/image1.webp'
import image2  from '../image/image2.webp'
import image3 from '../image/image3.webp'
import image4  from '../image/image4.webp'
import image5  from '../image/image5.webp'
import image6  from '../image/image6.webp'
import image7  from '../image/image7.webp'
import image8  from '../image/image8.webp'
import image from '../image/ND_REAL_MADRID_WORLD_1VC9025.webp'
import BarProgress from './Barprogress'
import homekit from '../image/homekit.webp'
import goalkit from '../image/goalkit.webp'
import thirdkit from '../image/thirdkit.webp'
import training from '../image/trainingkit.webp'
import travel from '../image/travel kit.webp'
import Event from './Event'
import PlayerCard from './playercard'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules"; // Correct path for modules
import "swiper/css";
import "swiper/css/navigation";



import { motion } from "motion/react";
const data = [
  {
    imageUrl: image1,
    title: 'Third training session of the week',
  },
  {
    imageUrl: image2,
    title: 'Real Madrid-Anadolu Efes: rerun of game of four overtimes',
  },
  {
    imageUrl: image3,
    title: 'Schedule for the Real Madrid players called up to represent their national teams',
  },
  {
    imageUrl:image4,
    title: "BMW Spain presents official vehicles to women's first team",
  },
  {
    imageUrl: image5,
    title: '7-0: Madrid goal feast at Alfredo Di Stéfano against FC Twente',
  },
  {
    imageUrl: image6,
    title: 'adidas presents exclusive Bellingham Originals collection',
  },
  {
    imageUrl: image7,
    title: 'Chus Mateo: “The WiZink Center gives us extra boost of energy to play more aggressively and better”',
  },
  {
    imageUrl: image8,
    title: "Vini Jr.'s goals this season",
  },
];

const items = [
  {
    image: thirdkit,
    title: "New Real Madrid 24/25 third kit",
    buttonText: "Buy the third kit",
  },
  {
    image: homekit,
    title: "Home kit",
    buttonText: "Buy the home kit",
  },
  {
    image: goalkit,
    title: "Goalkeeper kit",
    buttonText: "Buy the goalkeeper kit",
  },
  {
    image: training,
    title: "Trainning kit",
    buttonText: "Buy the trainning kit",
  },
  {
    image: travel,
    title: "Travel Collection",
    buttonText: "Buy the travel collection",
  },
];

function Home() {
  return (
    <>
    <div className="flex justify-center items-center   mt-3">
      <div className=" max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-2 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex justify-center items-center">
          <motion.img 
          initial ={{x: -500}}
          animate ={{x: 0}}
          transition={{ duration: 1.5 }}
          src={image} alt="ND Real Madrid" className="w-full h-auto object-cover rounded-l-lg md:rounded-none" />
        </div>
        <div className="flex flex-col justify-center p-6">
          <motion.h2
          initial ={{ x:500}}
          animate ={{ x: 0}}
          transition={{duration: 2}}
          className="text-3xl font-bold text-gray-800 mb-4">ND Real Madrid</motion.h2>
          <motion.p
           initial ={{ x:500}}
           animate ={{ x: 0}}
           transition={{duration: 2}}
          className="text-gray-700 leading-relaxed text-lg">
            ND Real Madrid is a professional football club based in Madrid, Spain, founded in 1902. They are the top-ranked team in La Liga and are currently ranked 1st in Spain.
          </motion.p>
        </div>
      </div>
    </div>

    <div
    
    className="min-h-screen flex items-center justify-center p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((item, index) => (
          <motion.div 
          key={index}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{scale: 1.09}}

          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-800">{item.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
    
  <Event/>
  <BarProgress/>


  <div className="container mx-auto">
  <Swiper
  modules={[Navigation,Autoplay]}
   // Register the Navigation module here
  navigation
  spaceBetween={20}
  slidesPerView={1.2}
  autoplay={{ delay: 1000 }}
 
  breakpoints={{
    840: { slidesPerView: 1.5 },
    1024: { slidesPerView: 3.5 },
  }}
  className="p-4"
>
  {items.map((item, index) => (
    <SwiperSlide key={index}>
      <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate = {{opacity: 1, y: 0}}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className=" me-7 bg-white rounded-lg shadow-lg">
        <img src={item.image} alt={item.title} className=" w-full" />
        <h3 className="text-xl font-semibold mt-4 p-4 rounded-t-2xl">{item.title}</h3>
        <button className="mt-4 px-4 mb-4 ms-2 py-2 bg-blue-600 text-white rounded-lg">
          {item.buttonText}
        </button>
      </motion.div>
    </SwiperSlide>
  ))}
</Swiper>
    </div>
<div>
<div className="bg-slate-800 mx-auto max-w-[1200px] px-4 py-4 rounded mt-7">
  <h1 className="text-center text-white text-2xl font-bold">
    Men&apos;s Top Scorers
  </h1>
</div>

 <PlayerCard/>
 </div>
    </>
  );
}

export default Home;
