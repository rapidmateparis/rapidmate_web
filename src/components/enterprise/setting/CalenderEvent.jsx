import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const CalenderEvent = ({
  events,
  setEvents,
  calendarDate,
  setCalendarDate,
  setSlots,
}) => {
 

  const handleDeleteEvent = (eventToDelete) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the event "${eventToDelete.title}"?`
    );
    if (confirmDelete) {
      setEvents(events.filter((event) => event !== eventToDelete));
      setSlots(null);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ height: "500px" }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          date={calendarDate} // Set the calendar date to the start date
          onNavigate={(date) => setCalendarDate(date)} // Update calendarDate on manual navigation
          style={{ height: "100%", width: "100%" }}
          views={["month", "week","day"]}
          defaultView="month"
          onSelectEvent={(event) => handleDeleteEvent(event)}
        />
      </div>
    </div>
  );
};

export default CalenderEvent;
