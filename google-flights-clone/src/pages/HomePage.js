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
  const [isFetching, setIsFetching] = useState(false);

  const swapOriginAndDestination = async () => {
    let temp = {...origin}
    let newOriginAirport = {...destination}
    let newDestinationAirport = temp;

    if (! areSearchParamsInvalid()){
      fetchFlightResults(newOriginAirport, newDestinationAirport);
    }
    setOrigin(newOriginAirport);
    setDestination(newDestinationAirport);
  };

  const fetchFlightResults = async (originAirport, destinationAirport) => {
    setFlightResults([]);
    setIsFetching(true);

    let query_payload = {
      "originSkyId": originAirport.skyId,
      "destinationSkyId": destinationAirport.skyId,
      "originEntityId": originAirport.entityId,
      "destinationEntityId": destinationAirport.entityId,
      "date": departureDate,
      "returnDate": returnDate,
      "cabinClass": cabinClass,
      "adults": adultsCount,
      "childrens": childrenCount,
      "infants": infantsCount,
      "currency": "PHP",
      "sortBy": "price_high",
    }

    let results = await searchFlights(query_payload);
    setIsFetching(false);
    setFlightResults(results.data.itineraries);
    console.log(results.data.itineraries);
  }

  const areSearchParamsInvalid = () => {
    let invalid_conditions = [
      origin === null,
      destination === null,
      origin?.skyId === destination?.skyId,
      departureDate === "",
      adultsCount < 1,
    ]

    return invalid_conditions.find((cond) => cond === true);
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
            conflictingAirports={origin !== null && destination !== null && origin?.skyId === destination?.skyId}
          />
          <Tooltip title="Swap Airports">
            <Button
              shape="circle"
              icon={<SwapOutlined />}
              onClick={swapOriginAndDestination}
            />
          </Tooltip>
          <AirportInput
            placeholder="Where to?"
            targetAirport={destination}
            airportMutator={setDestination}
            conflictingAirports={origin !== null && destination !== null && origin?.skyId === destination?.skyId}
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
          onClick={() => {fetchFlightResults(origin, destination)}}
          disabled={areSearchParamsInvalid()}
          loading={isFetching}
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
