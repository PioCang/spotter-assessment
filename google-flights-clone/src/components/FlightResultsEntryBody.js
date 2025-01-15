import React from 'react';
import { Button, Row, Col, Image, Flex, Timeline } from 'antd';


const FlightResultsEntryBody = (props) => {
  const flightSegments = props.flightData.legs[0].segments;
  const firstFlightDeparture = new Date(flightSegments[0].departure);

  const calculateLayover = (previousSegment, nextSegment) => {
    let previousSegmentArrival = new Date(previousSegment.arrival)
    let nextSegmentDeparture = new Date(nextSegment.departure);
    let isOvernightLayover = nextSegmentDeparture.getDate() > previousSegmentArrival.getDate();

    let layoverInMillis = nextSegmentDeparture - previousSegmentArrival;

    let layoverInHrs = Math.floor((layoverInMillis % 86400000) / 3600000); // hours
    let layoverInMins = Math.round(((layoverInMillis % 86400000) % 3600000) / 60000); // minutes


    return (
      <>
        <hr/>
        {layoverInHrs > 0 && `${layoverInHrs} hr `}
        {layoverInMins > 0 && `${layoverInMins} min`}
        {" layover · "}
        {`${nextSegment.origin.name} (${nextSegment.origin.flightPlaceId})`}
        { isOvernightLayover
          ? " · Overnight layover"
          : ""
        }
        <hr/>
      </>
    )
  }

  const getDaysElapsedIndicator = (start, end) => {
    let startDateNoTime = new Date(start.toDateString());
    let endDateNoTime =  new Date(end.toDateString());

    return (endDateNoTime.getDate() > startDateNoTime.getDate())
      ? Math.floor((endDateNoTime - startDateNoTime) / 86400000)
      : 0;
  }


  const segment_timeline = (segment, index) => {
    const departure = new Date(segment.departure);
    const arrival = new Date(segment.arrival);

    const durationInHours = Math.floor(segment.durationInMinutes / 60);
    const durationExtraMinutes = segment.durationInMinutes % 60;

    return (
      <>
        <div>
          {index === 0
            ? ""
            : calculateLayover(flightSegments[index -1], flightSegments[index])
          }
        </div>
        <div>
          <p>
            {segment.marketingCarrier.name}
            {" · "}
            {`${segment.marketingCarrier.displayCode} ${segment.flightNumber}`}
          </p>
          <Timeline
            items={[
              {
                  color: 'gray',
                  children: <div>
                    {departure.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    {getDaysElapsedIndicator(firstFlightDeparture, departure) > 0 ? `(+${getDaysElapsedIndicator(firstFlightDeparture, departure)})` : ""}
                    {" · "}
                    {`${segment.origin.name} (${segment.origin.flightPlaceId})`}
                    <br/>
                    Travel time: {durationInHours > 0 && `${durationInHours} hr `}
                    {durationExtraMinutes > 0 && `${durationExtraMinutes} min`}
                  </div>,
              },
              {
                color: 'gray',
                children: <div>
                {arrival.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                {getDaysElapsedIndicator(firstFlightDeparture, arrival) > 0 ? `(+${getDaysElapsedIndicator(firstFlightDeparture, arrival)})` : ""}
                {" · "}
                {`${segment.destination.name} (${segment.destination.flightPlaceId})`}
              </div>,
              },
            ]}
          />
        </div>
      </>
    );
  };

  return (
    (flightSegments || []).map((segment, index) => segment_timeline(segment, index))
  );
}
export default FlightResultsEntryBody;
