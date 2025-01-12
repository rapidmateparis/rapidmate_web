import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import Styles from "../assets/css/home.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const DateAndTimePicker = ({ onDateTimeChange }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  // Handles the "Now" button click
  const handleNowClick = () => {
    const now = new Date();
    const formattedDate = now.toISOString().split("T")[0];
    const formattedTime = now.toTimeString().split(" ")[0].slice(0, 5);
    setSelectedDate(formattedDate);
    setSelectedTime(formattedTime);
    const combinedDateTime = new Date(`${formattedDate}T${formattedTime}`);
    onDateTimeChange(combinedDateTime,false);
  };

  const calendarClick = () => {
    const now = new Date();
    const formattedDate = now.toISOString().split("T")[0];
    const formattedTime = now.toTimeString().split(" ")[0].slice(0, 5);
    setSelectedDate(formattedDate);
    setSelectedTime(formattedTime);
    setShowPicker(true);
  };

  const handleSave = () => {
    const combinedDateTime = new Date(`${selectedDate}T${selectedTime}`);
    onDateTimeChange(combinedDateTime,true);
    setShowPicker(false);
  };
  return (
    <div className={Styles.homepickupScheduleRequestCardMain}>
      <div className={Styles.pickupHomeScheduleselectCard}>
        <div onClick={calendarClick}  style={{ cursor: "pointer" }}>
          <FontAwesomeIcon
            className={Styles.pickupHomeCalenderIcon}
            icon={faCalendarDays}
          />
        </div>

        <p className={Styles.pickupHomeWhenNeedText}>
          When do you need it? {selectedDate?.toString()}{" "}
          {selectedTime?.toString()}
        </p>
        <p
          className={Styles.pickupHomeNowText}
          onClick={handleNowClick}
          style={{ cursor: "pointer" }}
        >
          Now
        </p>
      </div>
      {/* Modal */}
      {showPicker && (
        <div
          style={{
            position: "absolute",
            top: "42%",
            left: "35%",
            transform: "translate(-50%, -20%)",
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
            zIndex: 1000,
            width: "336px",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h6 style={{ margin: 0 }}>Schedule this Pickup</h6>
            <button
              onClick={() => setShowPicker(false)}
              style={{
                background: "none",
                border: "none",
                color: "#ff4081",
                fontSize: "14px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Today
            </button>
          </div>

          {/* Calendar */}
          <div style={{ margin: "20px 0" }}>
            <DatePicker
              selected={selectedDate}
              onChange={(date) =>
                setSelectedDate(date.toISOString().split("T")[0])
              }
              inline
              calendarClassName="custom-calendar"
            />
          </div>

          {/* Time Input */}
          <div style={{ marginBottom: "20px" }}>
            <p style={{ marginBottom: "8px", fontSize: "14px" }}>
              Choose a time that suits you!
            </p>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ddd",
                width: "100%",
                fontSize: "14px",
              }}
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            style={{
              backgroundColor: "#ffc107",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              padding: "10px 16px",
              fontSize: "14px",
              fontWeight: "bold",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Save
          </button>
        </div>
      )}

      {/* Overlay */}
      {showPicker && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
          onClick={() => setShowPicker(false)}
        />
    
      )}
    </div>
  );
};

export default DateAndTimePicker;
