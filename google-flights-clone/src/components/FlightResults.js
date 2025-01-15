import React from 'react';
import { Collapse, Row, Col, Image, Flex } from 'antd';


const FlightResults = (props) => {

  const build_flight_header = (flightData) => {
    const routingInfo = flightData.legs[0];
    const departure = new Date(routingInfo.departure);
    const arrival = new Date(routingInfo.arrival);
    const isNextDayArrival = arrival.getDate() > departure.getDate();
    const durationInHours = Math.floor(routingInfo.durationInMinutes / 60);
    const durationExtraMinutes = routingInfo.durationInMinutes % 60;

    return (
      <Row>
        <Col span={2}>
          <Image
            width={50}
            src={routingInfo.carriers.marketing[0].logoUrl}
          />
        </Col>
        <Col span={6}>
          <Flex gap="middle">
              {departure.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              -
              {arrival.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              {isNextDayArrival ? "(+1)" : ""}
              <br/>
              {routingInfo.carriers.marketing[0].name}
          </Flex>
        </Col>
        <Col span={6}>
          {durationInHours > 0 && `${durationInHours} hr `}
          {durationExtraMinutes > 0 && `${durationExtraMinutes} min`}
          <br/>
          {`${routingInfo.origin.id} - ${routingInfo.destination.id}`}
        </Col>
        <Col span={6}>
          {routingInfo.stopCount == 0
            ? "Nonstop"
            : `${routingInfo.stopCount} Stop${routingInfo.stopCount > 1 ? "s" : ""}`
          }
        </Col>
        <Col span={4}>
          {flightData.price.formatted}
        </Col>
      </Row>
    );
  }

  const build_flight_body = (flightData) => {
    return (
      "body here"
    );
  };

  const build_collapsible_entry = (flightResult, index) => {
    return {
      key: index,
      label: build_flight_header(flightResult),
      children: "test,"// build_flight_body(),
    };
  };

  return (
    <>
      <Collapse
        expandIconPosition="end"
        size="large"
        items={(props.flightResults || [])
              .map((flightResult, index) => build_collapsible_entry(flightResult, index))
        }
      />
    </>
  )
};
export default FlightResults;