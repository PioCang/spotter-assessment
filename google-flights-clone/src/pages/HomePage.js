import React, { useState, useEffect } from 'react';
import AirportInput from '../components/AirportInput';
import TravelDatesPicker from '../components/TravelDatesPicker';
import CabinClassPicker from '../components/CabinClassPicker';
import HeadCountCollapsible from '../components/HeadCountCollapsible';
import FlightResults from '../components/FlightResults';
import { SearchOutlined, SwapOutlined } from '@ant-design/icons';
import { Button, Flex, Tooltip } from 'antd';

const HomePage = () => {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [cabinClass, setCabinClass] = useState("economy");
  const [adultsCount, setAdultsCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [infantsCount, setInfantsCount] = useState(0);

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
    <>
      <div className="home-page">
        <h1>Flight Search</h1>
        <Flex wrap gap="small">
          <HeadCountCollapsible
            passengerCount={adultsCount + childrenCount + infantsCount}
            setAdultsCount={setAdultsCount}
            setChildrenCount={setChildrenCount}
            setInfantsCount={setInfantsCount}
          />
          <CabinClassPicker
            setCabinClass={setCabinClass}
          />
        </Flex>
        <AirportInput
          placeholder="Where from?"
          targetAirport={origin}
          airportMutator={setOrigin}
        />
        <Tooltip title="Swap Airports">
          <Button
            shape="circle"
            icon={<SwapOutlined />}
          />
        </Tooltip>
        <AirportInput
          placeholder="Where to?"
          targetAirport={destination}
          airportMutator={setDestination}
        />
        <TravelDatesPicker
          setDepartureDate={setDepartureDate}
          setReturnDate={setReturnDate}
        />
        <Button
          type="primary"
          icon={<SearchOutlined />}
          iconPosition={"end"}
        >
            Search
        </Button>
      </div>
      <div>
      </div>
    </>
  );
};

export default HomePage;
