import React from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

const TravelDatesPicker = (props) => {

  const disabledDates = (current) => {
    return current < dayjs().startOf('day');
  };

  return (
    <DatePicker
      placeholder={"Travel Date"}
      disabledDate={disabledDates}
      onChange={(date, dateString) => {
        props.setDepartureDate(dateString);
      }}
    />
  );
};
export default TravelDatesPicker;