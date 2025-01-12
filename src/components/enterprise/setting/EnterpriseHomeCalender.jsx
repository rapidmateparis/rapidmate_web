import moment from "moment";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const EnterpriseHomeCalender = ({setCurrentDate}) => {
  const [value, setValue] = useState(new Date());

  // Define dates with different colors
  const dateStyles = [
    { date: new Date(2024, 6, 15), color: "orange" },
    { date: new Date(2024, 6, 20), color: "mediumaquamarine" },
    { date: new Date(2024, 6, 25), color: "steelblue" },
    { date: new Date(2024, 6, 28), color: "mediumpurple" },
  ];

  
  // Handle date change
  const handleDateChange = (newValue) => {
    setValue(newValue);
    const newDate=moment(newValue).format("YYYY-MM-DD")
    setCurrentDate(newDate)
  };

  const tileClassName = ({ date }) => {
    const style = dateStyles.find(
      (d) =>
        date.getDate() === d.date.getDate() &&
        date.getMonth() === d.date.getMonth() &&
        date.getFullYear() === d.date.getFullYear()
    );
    return style ? `marked-date-${style.color}` : null;
  };

  return (
    <>
      <Calendar
        onChange={handleDateChange}
        value={value}
        tileClassName={tileClassName}
      />
      <style>
        {`
          .react-calendar__tile {
            position: relative;
          }
          .marked-date-orange::after {
            content: '';
            position: absolute;
            bottom: 5px;
            left: 50%;
            transform: translateX(-50%);
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: orange;
          }
          .marked-date-mediumaquamarine::after {
            content: '';
            position: absolute;
            bottom: 5px;
            left: 50%;
            transform: translateX(-50%);
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: mediumaquamarine;
          }
          .marked-date-steelblue::after {
            content: '';
            position: absolute;
            bottom: 5px;
            left: 50%;
            transform: translateX(-50%);
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: steelblue;
          }
            .marked-date-mediumpurple::after {
            content: '';
            position: absolute;
            bottom: 5px;
            left: 50%;
            transform: translateX(-50%);
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: mediumpurple;
          }
        `}
      </style>
    </>
  );
};

export default EnterpriseHomeCalender;
