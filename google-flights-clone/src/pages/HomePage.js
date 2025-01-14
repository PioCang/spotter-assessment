import React, { useState } from 'react';
import AirportInput from '../components/AirportInput';

const HomePage = () => {
  const [origin, setOrigin] = useState({
    value: "",
    skyID: "",
    entityID: "",
  });
  const [destination, setDestination] = useState({
    value: "",
    skyID: "",
    entityID: "",
  });


  return (
    <div className="home-page">
      <h1>Flight Search</h1>
      <AirportInput
        placeholder="Where from?"
        style={{width: 500}}
      />
      <AirportInput
        placeholder="Where to?"
        style={{width: 500}}
      />
    </div>
  );
};

export default HomePage;
