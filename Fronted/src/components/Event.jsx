import  { useState } from 'react';
import EventCard from './EventCard';
import t1 from '../image/t1.webp';
import t2 from '../image/t2.webp';
import t3 from '../image/t3.webp';
import t4 from '../image/t4.webp';

const events = [
  {
    team1: 'Leganés',
    team1Logo: t1,
    team2: 'Real Madrid',
    team2Logo: t2,
    league: 'La Liga',
    matchday: 14,
    date: 'Sunday, Nov 24, 6:30PM',
    venue: 'Estadio Municipal',
  },
  {
    team1: 'Liverpool',
    team1Logo: t3,
    team2: 'Real Madrid',
    team2Logo: t2,
    league: 'Champions League',
    matchday: 5,
    date: 'Wednesday, Nov 27, 9:00PM',
    venue: 'Anfield',
  },
  {
    team1: 'Real Madrid',
    team1Logo: t2,
    team2: 'Getafe',
    team2Logo: t4,
    league: 'La Liga',
    matchday: 15,
    date: 'Sunday, Dec 1, 4:15PM',
    venue: 'Estadio Santiago',
  },
];


const NextEvents = () => {
  const [selectedTeams, setSelectedTeams] = useState({
    football: {
      men: true,
      women: false,
      academy: false,
    },
    basketball: {
      men: false,
    },
  });
  
  const handleCheckboxChange = (sport, team) => {
    setSelectedTeams((prev) => ({
      ...prev,
      [sport]: {  ...prev[sport] ,  [team]: !prev[sport][team] },
    }));
  };
  
  const resetFilters = () => {
    setSelectedTeams({
      football: { men: false, women: false, academy: false },
      basketball: { men: false },
    });
  };
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className=" pb-5">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 ms-14">Next Events</h2>
      <div className="flex items-center space-x-4 mb-6 ms-14">
        <button 
          onClick={openModal} 
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Teams (1)
        </button>
        <span className="text-blue-500">subscribe</span>
      </div>

      {isModalOpen && (

        <div id="medium-modal" className="fixed top-0 left-0 right-0 z-50 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="relative w-full max-w-lg max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
         
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-96 p-6 shadow-lg relative">

          <div className="mb-4 flex justify-between">
          <button
            onClick={resetFilters}
            className="text-blue-600 hover:underline text-sm font-medium"
          >
            Reset filters
          </button>

          <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
        </div>

        {/* Filter Title */}
        <h2 className="text-lg font-semibold mb-4">Filter teams</h2>

        {/* Filter Options */}
        <div className="flex justify-between">
          {/* Football Section */}
          <div>
            <h3 className="text-sm font-medium mb-2">Football</h3>
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={selectedTeams.football.men}
                onChange={() => handleCheckboxChange('football', 'men')}
                className="form-checkbox text-indigo-600"
              />
              <span className="ml-2 text-gray-700">First Team · Men</span>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={selectedTeams.football.women}
                onChange={() => handleCheckboxChange('football', 'women')}
                className="form-checkbox text-indigo-600"
              />
              <span className="ml-2 text-gray-700">First Team · Women</span>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectedTeams.football.academy}
                onChange={() => handleCheckboxChange('football', 'academy')}
                className="form-checkbox text-indigo-600"
              />
              <span className="ml-2 text-gray-700">Academy</span>
            </div>
          </div>

          {/* Basketball Section */}
          <div>
            <h3 className="text-sm font-medium mb-2">Basketball</h3>
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={selectedTeams.basketball.men}
                onChange={() => handleCheckboxChange('basketball', 'men')}
                className="form-checkbox text-indigo-600"
              />
              <span className="ml-2 text-gray-700">First Team · Men</span>
            </div>
          </div>
        </div>

            {/* Modal Footer */}
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
          onClick={closeModal}
          className="mt-6 w-full bg-indigo-600 text-white rounded-lg py-2 font-medium hover:bg-indigo-700"
        >
          Show events
        </button>
            
            </div>



            </div>

            </div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-6 justify-center">
        {events.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </div>
    </div>
  );
};

export default NextEvents;
