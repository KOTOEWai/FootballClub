import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import background from "../forUpload/Player Profile Instagram - Made with PosterMyWall.jpg";

const PlayerDetail = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState([]);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/players/${id}`);
        setPlayer(response.data);
      } catch (error) {
        console.error("Error fetching player:", error.message);
      }
    };
    fetchPlayer();
  }, [id]);

  return (
    <div className="">
      <div className="w-full">
        {/* Background section */}
        <div
          className="w-full min-h-screen flex flex-col md:flex-row items-center  p-6 md:p-10 bg-white"
        >
          {/* Player Information */}
        
        
            <div className="text-black flex justify-center items-end space-x-10   md:w-1/2">
            <div className="space-y-5 ">
            <h2 className="text-2xl md:text-3xl font-bold">Name</h2>
            <p className="text-md md:text-lg">JerserNumber</p>
            <p className="text-md md:text-lg">Position:</p>
            <p className="text-md md:text-lg">Team:</p>
            <p className="text-sm md:text-lg">Nationality:</p>
            <p className="text-sm md:text-lg">Weight</p>
            <p className="text-sm md:text-lg">Height</p>
          
            </div>
            <div className="space-y-5">
            <h2 className="text-2xl md:text-3xl font-bold">{player.name}</h2>
            <p className="text-md md:text-lg">{player.jerseyNumber}</p>
            <p className="text-md md:text-lg">{player.position}</p>
            <p className="text-md md:text-lg">{player.team}</p>
            <p className="text-sm md:text-lg">{player.nationality}</p>
            <p className="text-sm md:text-lg">{player.weight}</p>
            <p className="text-sm md:text-lg">{player.height}</p>
            </div>
          </div>
         

          {/* Player Image */}
          <div className="flex justify-center items-center md:w-1/2 p-5">
            <img
              src={`http://localhost:3000/uploads/${player.profileImage}`}
              alt={player.name || "Player Image"}
              className="w-full max-w-sm md:max-w-lg object-cover rounded-lg shadow-lg"
            />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default PlayerDetail;
