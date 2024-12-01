export interface Flight {
  flightIdentifier: string;
  flightNumber: string;
  airport: string;
  date: string;
  expectedTime: string;
  originalTime: string;
  url: string;
  score: string;
}

interface FlightsResponse {
  flights: Flight[];
}

export default async function fetchFlights(): Promise<FlightsResponse> {
  const response = await fetch('/flights.json');

  if (!response.ok) {
    throw new Error('Failed to fetch flights');
  }

  return await response.json();
}
