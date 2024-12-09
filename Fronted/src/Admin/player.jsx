
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod'; // Zod validation library
 import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

// Define the validation schema using Zod
const playerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  position: z.string().min(1, 'Position is required'),
  jerseyNumber: z.number().min(1, 'Jersey number is required').max(99, 'Jersey number must be less than 99'),
  age: z.number().min(14, 'Age must be least 14').max(45,'age must be less than 45'),
  nationality: z.string().min(1, 'Nationality is required'),
  height: z.number().min(177, 'Height is required'),
  weight: z.number().optional(),
  team: z.string().min(1, 'Team is required'),
  isInjured: z.boolean().optional(),
  stats: z.object({
  appearances: z.number().default(0),
  goals: z.number().default(0),
  assists: z.number().default(0),
   cleanSheets: z.number().default(0),
  }),
  contract: z.object({
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    salary: z.number().default(0),
  }),
});
const AddPlayerForm = () => {
  const { id } = useParams();

  const { register,setValue,handleSubmit, formState: { errors } } = useForm(
    {resolver: zodResolver(playerSchema)}
);

useEffect(() => {
    if (id) {
      // Fetch player data by ID
      const fetchPlayer = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/players/${id}`);
          // Populate the form fields
            Object.keys(response.data).forEach((key) => {
            if (typeof response.data[key] === 'object' && response.data[key] !== null && response.data[key] === "profileImage") {
              // For nested fields
              Object.keys(response.data[key]).forEach((nestedKey) => {
                setValue(`${key}.${nestedKey}`, response.data[key][nestedKey]);
              });
            } else {
              setValue(key, response.data[key]);
            }
          });
        } catch (error) {
          console.error('Error fetching player:', error.message);
        }
      };
      fetchPlayer();
    }
  }, [id,setValue]);


  const [ imgProfile ,setImgProfile] = useState([])
  
  const handleFileChange = (e) => {
      setImgProfile([...e.target.files]);
  };
  
  // Function to handle form submission
  const onSubmit = async (data) => {
    console.log(data);
    const formData = new FormData();


    if (imgProfile.length > 0) {
      imgProfile.forEach((image) => formData.append('profileImage', image));
    }

    for (const key in data) {
       if (typeof data[key] === "object" && !Array.isArray(data[key])){
          for (const nestedKey in data[key]) {
            formData.append(`${key}.${nestedKey}`, data[key][nestedKey]);
          }
        }
        else {
          formData.append(key, data[key]);
          console.log([...formData.entries()]);
        }
      }
 

    try {

  const response = id ? await axios.put(`http://localhost:3000/api/players/${id}`, formData,
       
        { headers: {
                'Content-Type':'multipart/form-data'
            } } 
          ) 
          :await axios.post('http://localhost:3000/api/players/createplayer', formData,
            { headers: {
              'Content-Type':'multipart/form-data'
          } } 
        )

      
     
       alert(id ?'Player updated successfully': 'Player Created successfully');
     console.log(response.data);

    } catch (error) {
      console.error('Error adding player:', error.response.message);
    }
  };

  const[open,setOpen] = useState(false);

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


 const handleDelete = async(id)=>{
   try{
     const res = await axios.delete(`http://localhost:3000/api/players/${id}`)
     alert("Are you sure delete Player?")
     setplayers(players.filter((p) => p._id !== id));
     console.log(res.data)

    
   }catch(error){
    console.log("Error deleting match: " + (error.response?.data || error.message));
    console.error("Error deleting match:", error.response?.data || error.message);
   }

 }
  return (
<>
<div className="">
<button onClick={()=>setOpen(current=>!current)}   className='bg-red-500 p-5 rounded-lg
     text-white ms-20 mt-3  '> {id ? 'Update Player': 'Create Player'}</button>

<div className='flex justify-center items-center '>
{ open && (
   
    <motion.div
    initial={{ y:400}}
    animate={{y:0}}
    transition={{ duration: 1.5 }}
    className=" absolute top-48     p-10 bg-slate-700 max-w-lg   rounded-lg  shadow-lg">
    <h2 className="text-2xl font-bold mb-6 text-white text-center border-b border-white pb-2">{ id ? "Update Player" : "Add New Player" }</h2>
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
    <div>
        <label htmlFor="profileImage" className="block text-sm font-medium text-white">
          Profile Image
        </label>
        <input
          id="profileImage"
          type="file"
          
          multiple
          onChange={handleFileChange}
          className="mt-1 block w-full rounded-md border-white shadow-sm text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.profileImage && <p className="text-sm text-red-500 mt-1">{errors.profileImage.message}</p>}
      </div>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-white">
          Name
        </label>
        <input
          id="name"
          type="text"
           
          {...register('name', { required: 'Name is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
      </div>
  
      <div>
        <label htmlFor="position" className="block text-sm font-medium text-white">
          Position
        </label>
        <input
          id="position"
          type="text"
          {...register('position', { required: 'Position is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.position && <p className="text-sm text-red-500 mt-1">{errors.position.message}</p>}
      </div>
  
      <div>
        <label htmlFor="jerseyNumber" className="block text-sm font-medium text-white">
          Jersey Number
        </label>
        <input
          id="jerseyNumber"
          type="number"
          {...register('jerseyNumber', { valueAsNumber: true, required: 'Jersey number is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          min={0}
          max={100}
        />
        {errors.jerseyNumber && <p className="text-sm text-red-500 mt-1">{errors.jerseyNumber.message}</p>}
      </div>
     
      <div>
        <label htmlFor="age" className="block text-sm font-medium text-white">
         Age
        </label>
        <input
          id="age"
          type="number"
          {...register('age', { valueAsNumber: true, required: 'age is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          min={0}
          max={100}
        />
        {errors.age && <p className="text-sm text-red-500 mt-1">{errors.age.message}</p>}
      </div>

      <div>
        <label htmlFor="nationality" className="block text-sm font-medium text-white">
        Nationality
        </label>
        <input
          id="nationality"
          type="text"
          {...register('nationality', { required: 'Nationality is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.jerseyNumber && <p className="text-sm text-red-500 mt-1">{errors.jerseyNumber.message}</p>}
      </div>

      
      <div>
        <label htmlFor="height" className="block text-sm font-medium text-white">
        Height
        </label>
        <input
          id="height"
          type="number"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          {...register('height', { valueAsNumber: true, required: 'height is required' })}
          min={0}
        />
        {errors.height && <p className="text-sm text-red-500 mt-1">{errors.height.message}</p>}
     
      </div>
      
      <div>
        <label htmlFor=" weight" className="block text-sm font-medium text-white">
        weight
        </label>
        <input
          id=" weight"
          type="number"
          {...register('weight', { valueAsNumber: true, required: ' weight is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          min={0}
        />
      {errors. weight && <p className="text-sm text-red-500 mt-1">{errors. weight.message}</p>}
      </div>
     
      <div>
        <label htmlFor="team" className="block text-sm font-medium text-white">
        Team    </label>
        <input
          id="team"
          type="text"
          {...register('team', { valueAsNumber: false, required: ' team is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        
        />
      {errors.team && <p className="text-sm text-red-500 mt-1">{errors.team.message}</p>}
      </div>


      <div>
        <label htmlFor="isInjured" className="flex items-center space-x-2">
          <input
            id="isInjured"
            type="checkbox"
            {...register('isInjured')}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span className="text-sm text-white">Is Injured</span>
        </label>
      </div>
  
    
  
      <div>
        <h3 className="text-lg font-medium text-white">Stats</h3>
        <div className="grid grid-cols-2 gap-4">

          <div>
            <label htmlFor="stats.appearances" className="block text-sm font-medium text-white">
              Appearances
            </label>
            <input
              id="stats.appearances"
              type="number"
              {...register('stats.appearances', { valueAsNumber: true , required: "appearences required" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
              min={0}
            />
        
          </div>
          <div>
            <label htmlFor="stats.goals" className="block text-sm font-medium text-white">
             Goals
            </label>
            <input
              id="stats.goals"
              type="number"
              {...register('stats.goals', { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
              min={0}
            />
          </div>
          <div>
            <label htmlFor="stats.assists" className="block text-sm font-medium text-white">
            Assists
            </label>
            <input
              id="stats.assists"
              type="number"
              {...register('stats.assists', { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
              min={0}
            />
          </div>
          <div>
            <label htmlFor="stats.cleanSheets" className="block text-sm font-medium text-white">
            Clean Sheets 
            </label>
            <input
              id="stats.cleanSheets"
              type="number"
              {...register('stats.cleanSheets', { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
              min={0}
            />
          </div>
         </div>
      </div>
  
      <div>
        <h3 className="text-lg font-medium text-white">Contract</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="contract.startDate" className="block text-sm font-medium text-white">
              Contract Start Date
            </label>
            <input
              id="contract.startDate"
              type="date"
              {...register('contract.startDate')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="contract.startDate" className="block text-sm font-medium text-white">
              Contract End Date
            </label>
            <input
              id="contract.endDate"
              type="date"
              {...register('contract.endDate')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div >
          <label htmlFor="contract.salary" className="block text-sm font-medium text-white">Salary</label>
          <input
            id="contract.salary"
            type="number"
            {...register('contract.salary', { valueAsNumber: true })}
             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
             required
             min={0}
          />
          </div>
          {/* Repeat for Contract End Date, Salary */}
        </div>
      </div>
      

     <div className='flex justify-center items-center'>
      <button type="submit" className='bg-red-500 rounded-lg p-4 text-white'>{ id ? 'Update Player':'Add Player'}</button>
    </div>

    </form>
    </motion.div>  
)}
</div>


<div className="grid sm:grid-cols-1 md:grid-cols-3 md:w-[35%]  md:gap-3  mb-4 container    md:mx-10 mt-4 ">
{
   players.map((player, index) => (

       <div
       key={index}
       className="mx-auto"
        >
       <div className="bg-white shadow-lg rounded-lg overflow-hidden border">
         <div className="flex items-center px-4 py-4">
           <span className="text-4xl font-bold text-gray-800">
             {player.number}
           </span>
           <img
             src={`http://localhost:3000/uploads/${player.profileImage[0]}`}
             className="w-20 h-20 rounded-full object-cover ml-auto"
           />
         </div>
         <div className="px-4 py-2">
           <h2 className="text-xl font-bold text-gray-800">{player.name}</h2>
           <p className="text-gray-600">{player.position}</p>
           <p className="mt-2 text-sm text-gray-500">{player.jerseyNumber}</p>
           
           <div className="mt-12 space-y-3">
             <div className="flex justify-between bg-slate-300 p-4 rounded shadow-md">
               <strong>Time Played:</strong>
               <p className="text-gray-700">{player.age}</p>
             </div>

             <div className="flex justify-between bg-slate-300 p-4 rounded shadow-md">
               <strong>Nationality:</strong>
               <p className="text-gray-700">{player.nationality}</p>
             </div>

             <div className="flex justify-between bg-slate-300 p-4 rounded shadow-md">
               <strong>Goals:</strong>
               <p className="text-gray-700">{player.stats.goals}</p>
             </div>
             <div className="flex justify-between bg-slate-300 p-4 rounded shadow-md">
               <strong>Weight:</strong>
               <p className="text-gray-700">{player.weight}</p>
             </div>
             <div className="flex justify-between bg-slate-300 p-4 rounded shadow-md">
               <strong>Team</strong>
               <p className="text-gray-700">{player.team}</p>
             </div>
             <div className="flex justify-between bg-slate-300 p-4 rounded shadow-md">
               <strong>Injured</strong>
               <p className="text-gray-700">{player.isInjured?'Injured':'No'}</p>
             </div>
             <div className="flex justify-between bg-slate-300 p-4 rounded shadow-md">
               <strong>Appearances</strong>
               <p className="text-gray-700">{player.stats.appearances}</p>
             </div>
             <div className="flex justify-between bg-slate-300 p-4 rounded shadow-md">
               <strong>Assits</strong>
               <p className="text-gray-700">{player.stats.assists}</p>
             </div>
            
             <div className="flex justify-between bg-slate-300 p-4 rounded shadow-md">
               <strong>Cleansheet:</strong>
               <p className="text-gray-700">{player.stats.cleanSheets}</p>
             </div>
             <div className="flex justify-between bg-slate-300 p-4 rounded shadow-md">
               <strong>StartDate</strong>
               <p className="text-gray-700">{player.contract.startDate}</p>
             </div>
             <div className="flex justify-between bg-slate-300 p-4 rounded shadow-md">
               <strong>EndDate:</strong>
               <p className="text-gray-700">{player.contract.endDate}</p>
             </div>
             <div className="flex justify-between bg-slate-300 p-4 rounded shadow-md">
               <strong>Salary:</strong>
               <p className="text-gray-700">{player.contract.salary}</p>
             </div>
            
           </div>
           <div className="mt-10 flex justify-between gap-4">
             <Link to={`/admin/players/${player._id}`} onClick={()=>setOpen(true)} className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Edit Player 
             </Link>
             <button
             onClick={()=>handleDelete(player._id)}
             className="px-3 py-2 bg-red-500 text-white  p-8  rounded hover:bg-gray-300">
               Delete
             </button>
           </div>
         </div>
       </div>
 
       </div>
   ))
}  
</div>







</div>
 

 

</>


  );
}

export default AddPlayerForm;
