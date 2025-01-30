import React from 'react';
import DateAndTimePicker from '../../../common/PickupHomeDateTimePicker'; // assuming you have this component
import Styles from '../../../assets/css/home.module.css';
import { useTranslation } from 'react-i18next';

const DateTimePicker = ({ setDate, setIsSchedule }) => {
  const {t}=useTranslation()
  const handleDateTimeChange = (selectedDate, isNow) => {
    setDate(selectedDate);
    setIsSchedule(isNow);
  };

  return (
    <div>
      <p className={Styles.pickupRequestText}>{t("requestNowOrLater")}</p>
      <DateAndTimePicker onDateTimeChange={handleDateTimeChange} />
    </div>
  );
};

export default DateTimePicker;