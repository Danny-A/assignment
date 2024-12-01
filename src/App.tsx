import { FlightProvider } from 'src/context/FlightContext';
import Home from 'src/templates/Home';

function App() {
  return (
    <FlightProvider>
      <Home />
    </FlightProvider>
  );
}

export default App;
