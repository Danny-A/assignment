import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import { FlightProvider, useFlights } from './FlightContext';
import fetchFlights from 'src/services/fetchFlights';

// Mock the fetchFlights service
vi.mock('src/services/fetchFlights', () => ({
  default: vi.fn(),
}));

const mockFlights = {
  flights: [
    {
      flightIdentifier: 'D20190401KL0937',
      flightNumber: 'KL 937',
      airport: 'Dublin',
      date: '2022-02-23',
      expectedTime: '16:00',
      originalTime: '16:00',
      url: '/en/departures/flight/D20190401KL0937/',
      score: '255.66647',
    },
    {
      flightIdentifier: 'D20190401EI609',
      flightNumber: 'EI 609',
      airport: 'Dublin',
      date: '2022-02-23',
      expectedTime: '17:15',
      originalTime: '17:15',
      url: '/en/departures/flight/D20190401EI609/',
      score: '261.41364',
    },
    {
      flightIdentifier: 'D20190401FR3105',
      flightNumber: 'FR 3105',
      airport: 'Dublin',
      date: '2022-02-23',
      expectedTime: '18:35',
      originalTime: '18:35',
      url: '/en/departures/flight/D20190401FR3105/',
      score: '261.41364',
    },
    {
      flightIdentifier: 'D20190401EI611',
      flightNumber: 'EI 611',
      airport: 'Dublin',
      date: '2022-02-23',
      expectedTime: '21:40',
      originalTime: '21:40',
      url: '/en/departures/flight/D20190401EI611/',
      score: '262.5605',
    },
    {
      flightIdentifier: 'D20190401KL0939',
      flightNumber: 'KL 939',
      airport: 'Dublin',
      date: '2022-02-23',
      expectedTime: '21:45',
      originalTime: '21:45',
      url: '/en/departures/flight/D20190401KL0939/',
      score: '262.5605',
    },
    {
      flightIdentifier: 'D20190401FR3007',
      flightNumber: 'FR 3007',
      airport: 'Dublin',
      date: '2022-02-23',
      expectedTime: '22:05',
      originalTime: '22:05',
      url: '/en/departures/flight/D20190401FR3007/',
      score: '261.34207',
    },
  ],
};

const wrapper = ({ children }: { children: React.ReactNode }) => <FlightProvider>{children}</FlightProvider>;

describe('FlightContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock the API response
    (fetchFlights as Mock).mockResolvedValue(mockFlights);
  });

  it('should load flights on mount', async () => {
    const { result } = renderHook(() => useFlights(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.flights).toEqual(mockFlights.flights);
  });

  describe('airport search filtering', () => {
    it('should not set filtered airports when search length is below minimum', async () => {
      const { result } = renderHook(() => useFlights(), {
        wrapper: FlightProvider,
      });

      act(() => {
        result.current.setSearchAirport('Du');
      });

      expect(result.current.filteredAirports).toEqual([]);
    });

    it('should set filtered airports when search length meets minimum', async () => {
      const { result } = renderHook(() => useFlights(), {
        wrapper: FlightProvider,
      });

      // Wait for initial flights to load
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      act(() => {
        result.current.setSearchAirport('Dub');
      });

      expect(result.current.filteredAirports.length).toBeGreaterThan(0);
      expect(result.current.filteredAirports.every((airport) => airport.toLowerCase().includes('dub'))).toBe(true);
    });

    it('should limit selected flights to maximum of 5 results and sort by expected time', async () => {
      const { result } = renderHook(() => useFlights(), { wrapper });

      // Wait for initial load
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // Select Dublin which has 6 flights in our mock data
      act(() => {
        result.current.selectAirport('Dublin');
      });

      // Verify only 5 flights are selected
      expect(result.current.selectedFlights?.length).toBe(5);

      // Verify flights are sorted by expected time (early to late)
      const expectedTimes = result.current.selectedFlights?.map((flight) => flight.expectedTime);
      const sortedExpectedTimes = [...(expectedTimes || [])].sort();
      expect(expectedTimes).toEqual(sortedExpectedTimes);

      // Verify specific times are in correct order
      expect(result.current.selectedFlights?.map((f) => f.expectedTime)).toEqual([
        '16:00',
        '17:15',
        '18:35',
        '21:40',
        '21:45',
      ]);
    });
  });

  describe('flight sorting', () => {
    const setupTest = async () => {
      const { result } = renderHook(() => useFlights(), { wrapper });
      await waitFor(() => expect(result.current.isLoading).toBe(false));
      act(() => result.current.selectAirport('Dublin'));
      return result;
    };

    it('should sort flights by date', async () => {
      const result = await setupTest();

      // Test ascending
      act(() => result.current.sortFlightResults('date', 'asc'));
      expect(result.current.selectedFlights?.map((f) => f.date)).toEqual([
        '2022-02-23',
        '2022-02-23',
        '2022-02-23',
        '2022-02-23',
        '2022-02-23',
      ]);
      expect(result.current.sortState.date).toBe('asc');

      // Test descending
      act(() => result.current.sortFlightResults('date', 'desc'));
      expect(result.current.selectedFlights?.map((f) => f.date)).toEqual([
        '2022-02-23',
        '2022-02-23',
        '2022-02-23',
        '2022-02-23',
        '2022-02-23',
      ]);
      expect(result.current.sortState.date).toBe('desc');
    });

    it('should sort flights by expected time', async () => {
      const result = await setupTest();

      // Test ascending
      act(() => result.current.sortFlightResults('expectedTime', 'asc'));
      expect(result.current.selectedFlights?.map((f) => f.expectedTime)).toEqual([
        '16:00',
        '17:15',
        '18:35',
        '21:40',
        '21:45',
      ]);
      expect(result.current.sortState.expectedTime).toBe('asc');

      // Test descending
      act(() => result.current.sortFlightResults('expectedTime', 'desc'));
      expect(result.current.selectedFlights?.map((f) => f.expectedTime)).toEqual([
        '21:45',
        '21:40',
        '18:35',
        '17:15',
        '16:00',
      ]);
      expect(result.current.sortState.expectedTime).toBe('desc');
    });
  });
});
