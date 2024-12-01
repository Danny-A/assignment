import { Flight } from 'src/services/fetchFlights';

const FlightDetails = ({ flight }: { flight: Flight }) => {
  return (
    <li className="bg-white rounded-lg block group">
      <a href={flight.url} className="flex items-baseline p-4 md:px-6 space-between">
        <span className="flex flex-1 gap-4">
          <span className="flex flex-col">
            <time className="font-bold text-schiphol-blue" dateTime={flight.expectedTime}>
              {flight.expectedTime}
            </time>
            {flight.originalTime !== flight.expectedTime && (
              <time className="font-bold text-schiphol-grey-500 line-through" dateTime={flight.originalTime}>
                {flight.originalTime}
              </time>
            )}
          </span>
          <span>
            <p className="text-schiphol-blue group-hover:underline">{flight.airport}</p>
            <p className="text-grey-overcast text-sm">{flight.flightNumber}</p>
          </span>
        </span>
        <span>
          <time className="text-schiphol-blue" dateTime={flight.date}>
            {flight.date}
          </time>
          <p className="text-schiphol-blue">{flight.score}</p>
        </span>
      </a>
    </li>
  );
};

export default FlightDetails;
