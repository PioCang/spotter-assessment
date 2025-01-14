import React from 'react';

const FlightResults = ({ flights }) => {
  if (!flights || flights.length === 0) {
    return <p>No flights found. Try adjusting your search.</p>;
  }

  return (
    <div className="flight-results">
      {flights.map((flight, index) => (
        <div key={index} className="flight-card">
          <h3>{flight.MinPrice} USD</h3>
          <p>From: {flight.QuoteDateTime}</p>
          <p>Origin: {flight.OriginPlace}</p>
          <p>Destination: {flight.DestinationPlace}</p>
          <p>Airline: {flight.Airline}</p>
        </div>
      ))}
    </div>
  );
};

export default FlightResults;
