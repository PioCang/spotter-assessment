import React from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

const TravelDatesPicker = (props) => {

  const disabledDates = (current) => {
    return current < dayjs().startOf('day');
  };

  return (
    <DatePicker.RangePicker
      placeholder={["Departure", "Return"]}
      allowEmpty={[false, true]}
      disabledDate={disabledDates}
      onChange={(date, dateString) => {
        props.setDepartureDate(dateString[0]);
        props.setReturnDate(dateString[1]);
      }}
    />
  );
};
export default TravelDatesPicker;