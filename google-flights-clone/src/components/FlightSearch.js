import React, { useState } from 'react';

const FlightSearch = ({ onSearch }) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');

  const handleSearch = () => {
    if (origin && destination && date) {
      onSearch(origin, destination, date);
    }
  };

  return (
    <div className="flight-search">
      <input
        type="text"
        placeholder="Origin (e.g., NYC)"
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
      />
      <input
        type="text"
        placeholder="Destination (e.g., LAX)"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={handleSearch}>Search Flights</button>
    </div>
  );
};

export default FlightSearch;
