import React, { useState, useEffect } from 'react';
import AirportInput from '../components/AirportInput';
import TravelDatesPicker from '../components/TravelDatesPicker';
import CabinClassPicker from '../components/CabinClassPicker';
import HeadCountCollapsible from '../components/HeadCountCollapsible';
import FlightResults from '../components/FlightResults';
import { SearchOutlined, SwapOutlined } from '@ant-design/icons';
import { Button, Flex, Tooltip } from 'antd';
import { searchFlights } from '../services/flightService';

const HomePage = () => {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [cabinClass, setCabinClass] = useState("economy");
  const [adultsCount, setAdultsCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [infantsCount, setInfantsCount] = useState(0);
  const [flightResults, setFlightResults] = useState([]);

  useEffect(() => {
    if (origin && destination && origin.skyId === destination.skyId) {
      setDestination("");
    }
  }, [origin]);

  useEffect(() => {
    if (origin && destination && origin.skyId === destination.skyId) {
      setOrigin("");
    }
  }, [destination]);


  const fetchFlightResults = async () => {
    let query_payload = {
      "originSkyId": origin.skyId,
      "destinationSkyId": destination.skyId,
      "originEntityId": origin.entityId,
      "destinationEntityId": destination.entityId,
      "date": departureDate,
      "returnDate": returnDate,
      "cabinClass": cabinClass,
      "adults": adultsCount,
      "childrens": childrenCount,
      "infants": infantsCount,
    }

    let flightResults = await searchFlights(query_payload);
    setFlightResults(flightResults.itineraries);
  }

  const areSearchParamsInvalid = () => {
    let invalid_conditions = [
      origin === null,
      destination === null,
      departureDate === "",
      adultsCount < 1,
    ]

    return invalid_conditions.find((cond) => cond == true);
  }

  return (
    <>
      <div className="home-page">
        <h1>Flight Search</h1>
        <Flex wrap gap="middle">
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
        <Flex wrap gap="middle">
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
        </Flex>
        <TravelDatesPicker
          setDepartureDate={setDepartureDate}
          setReturnDate={setReturnDate}
        />
        <Button
          type="primary"
          icon={<SearchOutlined />}
          iconPosition={"end"}
          onClick={fetchFlightResults}
          disabled={areSearchParamsInvalid()}
        >
            Search
        </Button>
      </div>
      <div>
        <FlightResults
          flightResults={flightResults}
        />
      </div>
    </>
  );
};

export default HomePage;
