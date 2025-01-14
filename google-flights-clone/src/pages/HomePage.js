import React, { useState, useEffect } from 'react';
import AirportInput from '../components/AirportInput';

const HomePage = () => {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    if (origin && destination && origin.skyId == destination.skyId) {
      setDestination(null);
    }
  }, [origin]);

  useEffect(() => {
    if (origin && destination && origin.skyId == destination.skyId) {
      setOrigin(null);
    }
  }, [destination]);

  return (
    <div className="home-page">
      <h1>Flight Search</h1>
      <AirportInput
        placeholder="Where from?"
        targetAirport={origin}
        airportMutator={setOrigin}
      />
      <AirportInput
        placeholder="Where to?"
        targetAirport={destination}
        airportMutator={setDestination}
      />
    </div>
  );
};

export default HomePage;
