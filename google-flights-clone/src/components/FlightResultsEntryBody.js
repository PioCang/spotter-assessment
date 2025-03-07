import React from 'react';
import { Timeline } from 'antd';


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
      <div className='mb-10'>
        <hr/>
        <div className='my-2'>
          {layoverInHrs > 0 && `${layoverInHrs} hr `}
          {layoverInMins > 0 && `${layoverInMins} min`}
          {" layover · "}
          {`${nextSegment.origin.name} (${nextSegment.origin.flightPlaceId})`}
          { isOvernightLayover
            ? " · Overnight layover"
            : ""
          }
        </div>
        <hr/>
      </div>
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
      <div key={index}>
        <div>
          {index === 0
            ? ""
            : calculateLayover(flightSegments[index -1], flightSegments[index])
          }
        </div>
        <div>
          <p className='mb-2'>
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
                    <sup>
                      {getDaysElapsedIndicator(firstFlightDeparture, arrival) > 0 && index !== 0
                        ? `+${getDaysElapsedIndicator(firstFlightDeparture, arrival)}`
                        : ""}
                    </sup>
                    {" · "}
                    {`${segment.origin.name} (${segment.origin.flightPlaceId})`}
                    <br/>
                    <span className='text-gray-500'>
                      Travel time: {durationInHours > 0 && `${durationInHours} hr `}
                      {durationExtraMinutes > 0 && `${durationExtraMinutes} min`}
                    </span>
                  </div>,
              },
              {
                color: 'gray',
                children: <div>
                {arrival.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                <sup>
                  {getDaysElapsedIndicator(firstFlightDeparture, arrival) > 0
                    ? `+${getDaysElapsedIndicator(firstFlightDeparture, arrival)}`
                    : ""}
                </sup>
                {" · "}
                {`${segment.destination.name} (${segment.destination.flightPlaceId})`}
              </div>,
              },
            ]}
          />
        </div>
      </div>
    );
  };

  return (
    (flightSegments || []).map((segment, index) => segment_timeline(segment, index))
  );
}
export default FlightResultsEntryBody;
