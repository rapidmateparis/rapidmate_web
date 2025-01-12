import React from 'react';
import DateAndTimePicker from '../../../common/PickupHomeDateTimePicker'; // assuming you have this component
import Styles from '../../../assets/css/home.module.css';

const DateTimePicker = ({ setDate, setIsSchedule }) => {
  const handleDateTimeChange = (selectedDate, isNow) => {
    setDate(selectedDate);
    setIsSchedule(isNow);
  };

  return (
    <div>
      <p className={Styles.pickupRequestText}>Request it now or schedule for later</p>
      <DateAndTimePicker onDateTimeChange={handleDateTimeChange} />
    </div>
  );
};

export default DateTimePicker;