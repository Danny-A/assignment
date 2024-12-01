import FlightList from 'src/components/FlightList';
import SearchBar from 'src/components/Searchbar';

const Home = () => {
  return (
    <main className="px-2 md:px-0">
      <section className="container mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-2 text-schiphol-blue">Flight Search</h1>
        <SearchBar />
      </section>

      <section className="container mx-auto">
        <FlightList />
      </section>
    </main>
  );
};

export default Home;
