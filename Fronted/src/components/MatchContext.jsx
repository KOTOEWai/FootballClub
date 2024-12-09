import  { createContext, useState } from 'react';

// Create the context
// eslint-disable-next-line react-refresh/only-export-components
export const MatchContext = createContext();

// Create a provider component
// eslint-disable-next-line react/prop-types
export const MatchProvider = ({ children }) => {
  const [selectedMatchId, setSelectedMatchId] = useState(null);

  return (
    <MatchContext.Provider value={{ selectedMatchId, setSelectedMatchId }}>
      {children}
    </MatchContext.Provider>
  );
};
