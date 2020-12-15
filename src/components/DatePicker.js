import React from "react";
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import DateTimePicker from "react-widgets/lib/DateTimePicker"

import "react-widgets/dist/css/react-widgets.css";

Moment.locale("en");
momentLocalizer();

const DatePicker = ({ date, setDate }) => (
  <DateTimePicker
    value={date}
    onChange={value => setDate(value)}
    format="MM/DD/YYYY"
    time={false}
  />
);

export default DatePicker;