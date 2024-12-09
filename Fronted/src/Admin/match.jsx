/* eslint-disable react-hooks/rules-of-hooks */

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Match() {
  let {id} = useParams();
 
const [open , setOpen] = useState(false)

 const [formData, setFormData] = useState({
  matchDate: "",
  matchTime: "",
  stadium: "",
  homeTeam: "",
  awayTeam: "",
  location: "",
  matchType: "",
  homeTeamscore: "",
  awayTeamscore: "",
  referees: "",
});
const [teamLogos, setTeamLogos] = useState([]);

const [loading, setLoading] = useState(false);

useEffect (( ) =>{
     let fetchMatch = async( ) => {
      if(id) {
       try {
         const response = await axios.get(`http://localhost:3000/api/matches/${id}`);
         if( response.status === 200){
           setFormData(response.data);
           setTeamLogos(response.data.teamLogos);
           setOpen(true);
           setLoading(false);

         }
       } catch (error) {
         console.error(error);
       }
     }
    }
     fetchMatch();
},[id])

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};

const handleFileChange = (e) => {
  setTeamLogos([...e.target.files]);
};

const validateForm = () => {
  if (!formData.matchDate || !formData.stadium || !formData.homeTeam || !formData.awayTeam) {
    alert("Please fill out all required fields.");
    return false;
  }
  if (teamLogos.length !== 2) {
    alert("Please upload logos for both teams.");
    return false;
  }
  return true;
};

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  setLoading(true);
  const data = new FormData();
  Object.keys(formData).forEach((key) => data.append(key, formData[key]));
  teamLogos.forEach((logo) => data.append("teamlogo", logo));

  try {
    const response = id
      ? await axios.put(`http://localhost:3000/api/matches/${id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      : await axios.post("http://localhost:3000/api/matches/createMatch", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
    alert(id ? "Match updated successfully" : "Match created successfully");
    console.log("Match:", response.data);
  } catch (error) {
    console.log(error.response?.data || error.message);
  } finally {
    setLoading(false);
    setOpen(false);
  }
};

const [matches,setMatches] = useState([])

useEffect(()=>{
  const fetchmatches = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/matches/");
     setMatches(response.data)
    } catch (error) {
      console.error("Error fetching team matches:", error.message);
    }
  };
  fetchmatches();
},[])

const deletematch = async (id) =>{
 
  try {
    const response = await axios.delete(`http://localhost:3000/api/matches/${id}`);
  
    console.log("Match deleted:", response.data);
    const updatedMatches = matches.filter(m => m._id!== id);
    setMatches(updatedMatches);
  } catch (error) {
    console.log("Error deleting match: " + (error.response?.data || error.message));
    console.error("Error deleting match:", error.response?.data || error.message);
  }
}
  return (
    
<>
       

        <button onClick={()=>setOpen(current => !current)} className=" bg-red-600   text-teal-50 p-5 ms-20 mt-3 rounded-md">
           { id ? "Update Match": "Create Match" }
        </button>

       
        {open && (
          <motion.div
           initial={{ y:400}}
           animate={{y:0}}
            transition={{ duration: 1.5 }}
          className=" flex justify-center  ">
          <div className="md:ms-48  p-10 bg-gray-100  rounded md:mx-40 shadow absolute mx-10 ">
            <div className='flex justify-between items-center '>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">{ id ? 'Update match' : 'Add Match' }</h2>
             <p onClick={()=>setOpen(false)} className='text-4xl font-bold cursor-pointer'>X</p>
             </div>
            <form  onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Match Date */}
                <div>
                  <label htmlFor="matchDate" className="block text-sm font-medium text-gray-700">Match Date</label>
                  <input
                  id='matchDate'
                 type= 'date'
                 name="matchDate"
               value = {id ? `${formData.matchDate}` : null}
                onChange={handleInputChange}
                 className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  required
                    />
                </div>

                <div>
                  <label htmlFor="matchtime" className="block text-sm font-medium text-gray-700">Match Time</label>
                  <input
                  id='matchtime'
                 type= 'time'
                 name="matchTime"
               value = {id ? `${formData.matchTime}` : null}
                onChange={handleInputChange}
                 className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  required
                    />
                </div>

                <div>
                  <label htmlFor="logo" className="block text-sm font-medium text-gray-700">Home Team Logo</label>
                  <input
                  id='logo'
                   type="file"
                  name="teamlogo"
              onChange={handleFileChange}
        
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
           multiple
           required
      />
                </div>

        
                {/* Other Inputs */}
                <div>
                  <label htmlFor="stadium" className="block text-sm font-medium text-gray-700">Stadium</label>
                    <input
                    id='stadium'
        type="text"
       name="stadium"
      value = {id ? `${formData.stadium}` : null  }
        placeholder="Stadium"
        className="mt-1 block w-full p-2 border border-gray-300 rounded"
        onChange={handleInputChange}
        required
      />
                </div>
                <div>
                  <label  htmlFor="HomeTeam" className="block text-sm font-medium text-gray-700">Home Team</label>
                 
                        <input
                        id='HomeTeam'
        type="text"
        name="homeTeam"
        placeholder="Home Team"
        value = {id ? `${formData.homeTeam}` : null }
        onChange={handleInputChange}
         className="mt-1 block w-full p-2 border border-gray-300 rounded"
        required
      />
                </div>
                <div>
                  <label htmlFor="awayTeam" className="block text-sm font-medium text-gray-700">Away Team</label>
                  
                     <input
                     id='awayTeam'
        type="text"
        name="awayTeam"
        placeholder="Away Team"
        value = {id ? `${formData.awayTeam}` : null }
        onChange={handleInputChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        required
      />
                </div>
                <div>
                  <label htmlFor="refree" className="block text-sm font-medium text-gray-700">Referees </label>
                  <input
                  id='refree'
        name="referees"
        value = {id ? `${formData.referees}` : null }
      
        placeholder="Enter referees, separated by commas"
         className="mt-1 block w-full p-2 border border-gray-300 rounded"
        onChange={handleInputChange}
        />
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                 

        <input
        id='location'
        type="text"
        name="location"
        value = {id ? `${formData.location}` : null }
        placeholder="Location"
        onChange={handleInputChange}
         className="mt-1 block w-full p-2 border border-gray-300 rounded"
        required
        />

                </div>
        <input
        type="number"
        name="homeTeamscore"
        placeholder="Home Team Goal"
        value = {id ? `${formData.homeTeamscore}` : null }
         className="mt-1 block w-full p-1 border border-gray-300 rounded"
        onChange={handleInputChange}
        min={0}
        max={100}
      />
      <input
        type="number"
        name="awayTeamscore"
       value = {id ? `${formData.awayTeamscore}` : null }
        placeholder="Away Team Goal"
         className="mt-1 block w-full p-1 border border-gray-300 rounded"
        onChange={handleInputChange}
        min={0}
        max={100}
      />

            <div>
                  <label htmlFor="matchType" className="block text-sm font-medium text-gray-700">Match Type</label>
                <select name="matchType"
                value = {id ? `${formData.matchType}` : null }
                id="matchType"
         className="mt-1 block w-full p-2 border border-gray-300 rounded"
          onChange={handleInputChange}>
        <option value="">SelectMatchType</option>
        <option value="LaLiga">LaLiga</option>
        <option value="UEFA">UEFA</option>
        <option value="FIFA Club World Cup">FIFA Club World Cup</option>
        <option value="Spanish Super Cup">Spanish Super Cup</option>
        <option value="European Cups">European Cups</option>
      </select>
                </div>
              </div>
              <div className="mt-6">
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                  {id ? 'Update' : 'ADD'} Match
                </button>
              </div>
            </form>
          </div>
          </motion.div>

        )}

    


       <div className="grid grid-cols-1 md:grid-cols-3 gap-5   ms-20 mt-4">
  {matches.map((event, index) => (
    <motion.div
      key={index}
      className="bg-white rounded-lg shadow-lg overflow-hidden max-w-lg mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="bg-blue-900  flex items-center justify-between py-5 text-white rounded-t-lg">

        <div className="flex items-center space-x-2 p-5">
          {event.teamlogo && event.teamlogo.length > 0 ? (
            <img
              src={`http://localhost:3000/uploads/${event.teamlogo[0]}`}
              alt="Home Team Logo"
              className="h-10 w-10 rounded-full"
            />
          ) : (
            <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
              No Logo
            </div>
          )}
          <p className="font-bold text-xl ">{event.homeTeam}</p>
        </div>
           
         <p className='text-center'>Vs</p>
          
        <div className='flex items-center space-x-2 p-5'>
        <p className="font-bold text-xl">{event.awayTeam}</p>
        {event.teamlogo && event.teamlogo.length > 1 ? (
          <img
            src={`http://localhost:3000/uploads/${event.teamlogo[1]}`}
            alt="Away Team Logo"
            className="h-10 w-10 rounded-full"
          />
        ) : (
          <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
            No Logo
          </div>
        )}
         </div>

      </div>

      <div className="p-4">
        
        <div className='flex justify-between space-x-8 p-2 bg-slate-300 rounded-lg shadow-lg m-2'>
        <p>Match Date</p>
        <p className="text-gray-800 font-semibold">{event.matchDate}</p>
        </div>

        <div className='flex justify-between space-x-8 p-2 bg-slate-300 rounded-lg shadow-lg m-2'>
        <p>Match Time</p>
        <p className="text-gray-800 font-semibold">{event.matchTime}</p>
        </div>

        <div className='flex justify-between space-x-8 p-2 bg-slate-300 rounded-lg shadow-lg m-2'>
        <p>Stadium</p>
        <p className="text-gray-600">{event.stadium}</p>
        </div>
        
        <div className='flex justify-between space-x-8 p-2 bg-slate-300 rounded-lg shadow-lg m-2'>
        <p>Location</p>
        <p className="text-gray-600"> {event.location}</p>
        </div>

        <div className='flex justify-between space-x-8 p-2 bg-slate-300 rounded-lg shadow-lg m-2'>
        <p>MatchType</p>
        <p className="text-gray-600">{event.matchType}</p>
        </div>
        
        <div className='flex justify-between space-x-8 p-2 bg-slate-300 rounded-lg shadow-lg m-2'>
        <p>Refree</p>
        <p className="text-gray-600"> {event.referees}</p>
        </div>

      </div>
      <div className="p-4 flex justify-between">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => deletematch(event._id)}
        >
          Delete
        </button>
        <Link
          className="bg-blue-500 text-white px-4 py-2 rounded"
           to={`/admin/matches/${event._id}`}
        >
          Edit
        </Link>
        <Link
          className="bg-blue-500 text-white px-4 py-2 rounded"
           to={`/admin/tickets/${event._id}`}
        >
          Create Ticket
        </Link>
      </div>
    </motion.div>
  ))}
        </div>
   </>


    
  )
}
