import React, { useState } from 'react';
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
      "returnDate": "",
      "cabinClass": cabinClass,
      "adults": adultsCount,
      "childrens": childrenCount,
      "infants": infantsCount,
      "currency": "PHP",
      "sortBy": "price_high",
    }

    let results = await searchFlights(query_payload);
    setIsFetching(false);

    // Handle inconsistent API
    let flightResultsData = results.data.itineraries;
    if (flightResultsData.hasOwnProperty("key")) {
      flightResultsData = flightResultsData.results;
    }
    setFlightResults(flightResultsData);
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
      <div className="home-page m-12">
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
        <Flex wrap gap="middle" className='my-2'>
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
              className='rotate-90 sm:rotate-0'
            />
          </Tooltip>
          <AirportInput
            placeholder="Where to?"
            targetAirport={destination}
            airportMutator={setDestination}
            conflictingAirports={origin !== null && destination !== null && origin?.skyId === destination?.skyId}
          />
        </Flex>
        <Flex wrap gap="middle" className='my-2'>
          <TravelDatesPicker
            setDepartureDate={setDepartureDate}
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
        </Flex>
      </div>
      {
        (flightResults || []).length > 0 &&
        <div className='m-2 md:m-8'>
          <FlightResults
            flightResults={flightResults}
          />
        </div>
      }
    </>
  );
};

export default HomePage;
