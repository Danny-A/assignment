import React from 'react';
import { MINIMUM_SEARCH_LENGTH, useFlights } from 'src/context/FlightContext';

const SearchBar: React.FC = () => {
  const { searchAirport, setSearchAirport, filteredAirports, selectAirport } = useFlights();

  const handleAirportSelect = (airport: string) => {
    selectAirport(airport);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={searchAirport}
        onChange={(e) => setSearchAirport(e.target.value)}
        placeholder="Search for an airport..."
        className="w-full p-4 text-sm rounded-md z-20 relative"
      />
      {searchAirport.length >= MINIMUM_SEARCH_LENGTH && (
        <>
          <div className="fixed inset-0 bg-black/30 z-0" />
          <div className="absolute w-full bg-white rounded-lg mt-1 max-h-40 overflow-auto z-20">
            {filteredAirports.length > 0 ? (
              <ul>
                {filteredAirports.map((airport) => (
                  <li
                    key={airport}
                    onClick={() => handleAirportSelect(airport)}
                    className="px-4 py-2 text-sm hover:bg-afternoon-blue hover:text-white cursor-pointer"
                  >
                    <p>{airport}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-grey-storm px-4 py-2 text-sm">No airports found</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchBar;