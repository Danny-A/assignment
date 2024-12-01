import { FC } from 'react';
import { useFlights } from 'src/context/FlightContext';
import FlightDetails from 'src/components/FlightDetails';
import Button from 'src/components/Button';

const FlightList: FC = () => {
  const { selectedFlights, isLoading, sortFlightResults, sortState } = useFlights();

  const toggleSort = (sortBy: 'date' | 'expectedTime') => {
    const currentOrder = sortState[sortBy];
    const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
    sortFlightResults(sortBy, newOrder);
  };

  if (!selectedFlights) {
    return null;
  }

  if (isLoading) {
    return <p className="text-black">Loading...</p>;
  }

  if (selectedFlights && selectedFlights.length === 0) {
    return <p className="text-black">No flights found for the selected airport.</p>;
  }

  return (
    <div className="mt-4">
      <div className="flex gap-4 mb-4">
        <div>
          <Button onClick={() => toggleSort('date')}>
            Date {sortState.date && (sortState.date === 'asc' ? '↑' : '↓')}
          </Button>
        </div>
        <div>
          <Button onClick={() => toggleSort('expectedTime')}>
            Time {sortState.expectedTime && (sortState.expectedTime === 'asc' ? '↑' : '↓')}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {selectedFlights?.map((flight) => <FlightDetails key={flight.flightIdentifier} flight={flight} />)}
      </div>
    </div>
  );
};

export default FlightList;
