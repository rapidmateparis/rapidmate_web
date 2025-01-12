import React, { useState } from "react";
import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-time-picker/dist/TimePicker.css";
import "react-calendar/dist/Calendar.css";

const EnterpriseSelectServiceDatePicker = ({ mode }) => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(`${new Date().getHours()}:${new Date().getMinutes()}`);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleTimeChange = (newTime) => {
    setTime(newTime);
  };

  return (
    <>
      {mode === "date" ? (
        <DatePicker onChange={handleDateChange} value={date} format="dd/MM/yyyy" />
      ) : mode === "time" ? (
        <TimePicker onChange={handleTimeChange} value={time} disableClock={true} />
      ) : null}
    </>
  );
};

export default EnterpriseSelectServiceDatePicker;
