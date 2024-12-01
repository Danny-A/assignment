import { FC, createContext, useContext, useState, useEffect, ReactNode } from 'react';
import fetchFlights, { Flight } from 'src/services/fetchFlights';

interface FlightContextType {
  flights: Flight[];
  isLoading: boolean;
  selectedFlights: Flight[] | undefined;
  searchAirport: string;
  setSearchAirport: React.Dispatch<React.SetStateAction<string>>;
  filteredAirports: string[];
  selectAirport: (airport: string) => void;
  sortFlightResults: (sortBy: 'date' | 'expectedTime', order: 'asc' | 'desc') => void;
  sortState: {
    date?: 'asc' | 'desc';
    expectedTime?: 'asc' | 'desc';
  };
}

export const MINIMUM_SEARCH_LENGTH = 3;
const MAX_FLIGHT_RESULTS = 5;

const FlightContext = createContext<FlightContextType | undefined>(undefined);

export const FlightProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [selectedFlights, setSelectedFlights] = useState<Flight[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchAirport, setSearchAirport] = useState<string>('');
  const [filteredAirports, setFilteredAirports] = useState<string[]>([]);
  const [sortState, setSortState] = useState<{
    date?: 'asc' | 'desc';
    expectedTime?: 'asc' | 'desc';
  }>({});

  useEffect(() => {
    const loadFlights = async () => {
      try {
        const data = await fetchFlights();
        setFlights(data.flights);
      } catch (error) {
        console.error('Error fetching flights:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFlights();
  }, []);

  useEffect(() => {
    if (searchAirport.length >= MINIMUM_SEARCH_LENGTH) {
      const uniqueAirports = Array.from(new Set(flights.map((f) => f.airport)));
      const filtered = uniqueAirports.filter((airport) => airport.toLowerCase().includes(searchAirport.toLowerCase()));

      setFilteredAirports(filtered);
    } else {
      setFilteredAirports([]);
    }
  }, [searchAirport, flights]);

  const parseTimeToMs = (timeStr: string): number => {
    return new Date(`1970-01-01T${timeStr}`).getTime();
  };

  const sortFlightResults = (sortBy: 'date' | 'expectedTime', order: 'asc' | 'desc') => {
    if (!selectedFlights) return;

    const sortedFlights = [...selectedFlights].sort((a, b) => {
      const valueA = sortBy === 'date' ? new Date(a.date).getTime() : parseTimeToMs(a.expectedTime);
      const valueB = sortBy === 'date' ? new Date(b.date).getTime() : parseTimeToMs(b.expectedTime);

      return (valueA - valueB) * (order === 'asc' ? 1 : -1);
    });

    setSortState((prevState) => ({
      ...prevState,
      [sortBy]: order,
    }));
    setSelectedFlights(sortedFlights);
  };

  const selectAirport = (airport: string) => {
    setSearchAirport('');
    const flightsForAirport = flights.filter((flight) => flight.airport === airport);

    const sortedFlights = [...flightsForAirport]
      .sort((a, b) => {
        const timeA = parseTimeToMs(a.expectedTime);
        const timeB = parseTimeToMs(b.expectedTime);
        return timeA - timeB;
      })
      .slice(0, MAX_FLIGHT_RESULTS);

    setSelectedFlights(sortedFlights);
    setSortState({ date: 'asc', expectedTime: 'asc' });
  };

  return (
    <FlightContext.Provider
      value={{
        flights,
        isLoading,
        selectedFlights,
        searchAirport,
        setSearchAirport,
        filteredAirports,
        selectAirport,
        sortFlightResults,
        sortState,
      }}
    >
      {children}
    </FlightContext.Provider>
  );
};

export const useFlights = () => {
  const context = useContext(FlightContext);

  if (!context) {
    throw new Error('useFlights must be used within a FlightProvider');
  }

  return context;
};
