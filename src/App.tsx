import { useState } from 'react';
import SearchResult from './components/SearchResult';
import SearchForm from './components/SearchForm';
import { FlightInfo } from './interfaces/Flight.interface';
import FlightService from './services/FlightService';
import data from './assets/data.json';

function App() {
  const flightService = new FlightService(data);

  const [isSearching, setIsSearching] = useState(false);
  const [searchedFlightResults, setSearchedFlightResults] = useState<
    FlightInfo[][]
  >([]);
  const searchFlight = (
    isRoundTrip: boolean,
    fromCity: string,
    toCity: string,
    fromDate: Date,
    toDate: Date,
  ) => {
    const flights = flightService.getAvailableFlights(
      isRoundTrip,
      fromCity,
      toCity,
      fromDate,
      toDate,
    ) as FlightInfo[][];

    setSearchedFlightResults(flights);
    setIsSearching(true);
  };
  const clearSearch = () => {
    setIsSearching(false);
    setSearchedFlightResults([]);
  };

  return (
    <div className="grid">
      <div className="col-12 md:col-10 md:col-offset-1">
        <SearchForm onSearch={searchFlight} onClear={clearSearch}></SearchForm>

        {isSearching ? (
          <>
            <SearchResult flightInfos={searchedFlightResults}></SearchResult>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default App;
