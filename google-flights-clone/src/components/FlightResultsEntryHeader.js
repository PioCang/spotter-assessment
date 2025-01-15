import React from 'react';
import { Button, Row, Col, Image, Flex } from 'antd';


const FlightResultsEntryHeader = (props) => {
  const routingInfo = props.flightData.legs[0];
  const departure = new Date(routingInfo.departure);
  const arrival = new Date(routingInfo.arrival);
  const durationInHours = Math.floor(routingInfo.durationInMinutes / 60);
  const durationExtraMinutes = routingInfo.durationInMinutes % 60;

  const dataWhenCollapsed = () => {
    return (
      <>
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
              {routingInfo.timeDeltaInDays > 0 ? `(+${routingInfo.timeDeltaInDays})` : ""}
              <br/>
              {routingInfo.carriers.marketing[0].name}
          </Flex>
        </Col>
        <Col span={4}>
          {durationInHours > 0 && `${durationInHours} hr `}
          {durationExtraMinutes > 0 && `${durationExtraMinutes} min`}
          <br/>
          {`${routingInfo.origin.id} - ${routingInfo.destination.id}`}
        </Col>
        <Col span={4}>
          {routingInfo.stopCount === 0
            ? "Nonstop"
            : `${routingInfo.stopCount} Stop${routingInfo.stopCount > 1 ? "s" : ""}`
          }
        </Col>
        <Col span={4}>
          <Button color="default" variant="outlined">
            Select Flight
          </Button>
        </Col>
        <Col span={4}>
          {props.flightData.price.formatted}
        </Col>
      </>
    )
  }

  const dataWhenExpanded = () => {
    return (
      <>
        <Col span={2}>
          <Image
            width={50}
            src={routingInfo.carriers.marketing[0].logoUrl}
          />
        </Col>
        <Col span={14}>
          <Flex gap="middle">
              {departure.toLocaleDateString([], {weekday: "short"})}
              {", "}
              {departure.toLocaleDateString([], {day: 'numeric', month: 'short'})}
          </Flex>
        </Col>
        <Col span={4}>
          <Button color="default" variant="outlined">
            Select Flight
          </Button>
        </Col>
        <Col span={4}>
          {props.flightData.price.formatted}
        </Col>
      </>
    )
  }

  return (
    <Row>
        {
          props.isExpanded ?
          dataWhenExpanded()
          :
          dataWhenCollapsed()
        }
    </Row>
  );
}
export default FlightResultsEntryHeader;