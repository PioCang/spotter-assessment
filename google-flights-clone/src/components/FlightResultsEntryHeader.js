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
        <Col xs={6} sm={4} md={2}>
          <Image
            width={50}
            src={routingInfo.carriers.marketing[0].logoUrl}
          />
        </Col>
        <Col xs={0} sm={0} md={6}>
          <Flex gap="middle">
              {departure.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              -
              {arrival.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              {routingInfo.timeDeltaInDays > 0 ? `(+${routingInfo.timeDeltaInDays})` : ""}
              <br/>
              {routingInfo.carriers.marketing[0].name}
          </Flex>
        </Col>
        <Col xs={10} sm={10} md={4}>
          <span className="hidden md:block">
            {durationInHours > 0 && `${durationInHours} hr `}
            {durationExtraMinutes > 0 && `${durationExtraMinutes} min`}
            <br/>
          </span>
          <span className="block md:hidden font-bold">
              {departure.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              <br className='block sm:hidden'/>
              -
              <br className='block sm:hidden'/>
              {arrival.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              <sup>
                {routingInfo.timeDeltaInDays > 0 ? `+${routingInfo.timeDeltaInDays}` : ""}
              </sup>
              <br/>
          </span>
          <span className='text-gray-500'>
            {`${routingInfo.origin.id} - ${routingInfo.destination.id}`}
          </span>
        </Col>
        <Col xs={0} sm={0} md={4}>
          {routingInfo.stopCount === 0
            ? "Nonstop"
            : `${routingInfo.stopCount} Stop${routingInfo.stopCount > 1 ? "s" : ""}`
          }
        </Col>
        <Col xs={0} sm={6} md={4}>
          <Button color="default" variant="outlined" className='hidden sm:block'>
            Select Flight
          </Button>
        </Col>
        <Col xs={8} sm={4} md={4}>
          <span className='font-bold'>
            {props.flightData.price.formatted}
          </span>
          <Button color="default" variant="outlined" className='block sm:hidden'>
            Select
          </Button>
        </Col>
      </>
    )
  }

  const dataWhenExpanded = () => {
    return (
      <>
        <Col xs={6} sm={4} md={2}>
          <Image
            width={50}
            src={routingInfo.carriers.marketing[0].logoUrl}
          />
        </Col>
        <Col xs={10} sm={10}  md={14}>
          <Flex gap="middle">
              {departure.toLocaleDateString([], {weekday: "short"})}
              {", "}
              {departure.toLocaleDateString([], {day: 'numeric', month: 'short'})}
          </Flex>
        </Col>
        <Col xs={0} sm={6} md={4}>
          <Button color="default" variant="outlined" className='hidden sm:block'>
            Select Flight
          </Button>
        </Col>
        <Col xs={8} sm={4} md={4}>
          <span className='font-bold'>
            {props.flightData.price.formatted}
          </span>
          <Button color="default" variant="outlined" className='block sm:hidden'>
            Select
          </Button>
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