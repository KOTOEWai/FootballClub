
import salah from "../image/mohamed-salah-headshot-v3-2024.webp";

const PlayerCardList = () => {
  const players = [
    {
      number: "11",
      name: "Mohamed Salah",
      position: "Forward",
      season: "Season 2024-25",
      timePlayed: 1347,
      appearances: 17,
      goals: 10,
      image: salah, // Importing Salah's image
    },
    {
      number: "7",
      name: "Luis Diaz",
      position: "Forward",
      season: "Season 2024-25",
      timePlayed: 953,
      appearances: 16,
      goals: 9,
      image: "https://via.placeholder.com/100", // Replace with actual image URL
    },
    {
      number: "18",
      name: "Cody Gakpo",
      position: "Forward",
      season: "Season 2024-25",
      timePlayed: 832,
      appearances: 17,
      goals: 6,
      image: "https://via.placeholder.com/100", // Replace with actual image URL
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 mt-8 mb-4 md:container mx-auto  ">
       
      {players.map((player, index) => (
        <div
          key={index}
          className=" sm:w-[45%] md:w-[30%] lg:w-[22%] flex-grow "
        >
          <div className="bg-white shadow-lg rounded-lg overflow-hidden border">
            <div className="flex items-center px-4 py-4">
              <span className="text-4xl font-bold text-gray-800">
                {player.number}
              </span>
              <img
                src={player.image}
                alt={player.name}
                className="w-20 h-20 rounded-full object-cover ml-auto"
              />
            </div>
            <div className="px-4 py-2">
              <h2 className="text-xl font-bold text-gray-800">{player.name}</h2>
              <p className="text-gray-600">{player.position}</p>
              <p className="mt-2 text-sm text-gray-500">{player.season}</p>
              <div className="mt-12 space-y-3">
                <div className="flex justify-between bg-slate-300 p-4 rounded shadow-md">
                  <strong>Time Played:</strong>
                  <p className="text-gray-700">{player.timePlayed}</p>
                </div>

                <div className="flex justify-between bg-slate-300 p-4 rounded shadow-md">
                  <strong>Appearances:</strong>
                  <p className="text-gray-700">{player.appearances}</p>
                </div>

                <div className="flex justify-between bg-slate-300 p-4 rounded shadow-md">
                  <strong>Goals:</strong>
                  <p className="text-gray-700">{player.goals}</p>
                </div>
              </div>
              <div className="mt-10 flex justify-between gap-4">
                <button className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Buy Shirt
                </button>
                <button className="px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                  View Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayerCardList;
