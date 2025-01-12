import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Ensure this is imported for styles
import { Controller } from "react-hook-form";

const DatePickerField = ({ control, name, selectedDate, error }) => (
  <div className="me-2">
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <DatePicker
          selected={value || selectedDate} // Ensure selected value or fallback
          onChange={(date) => onChange(date)} // Update the value in react-hook-form
          onBlur={onBlur} // Register blur event
          placeholderText="Select date"
          dateFormat="yyyy-MM-dd"
          className="dynamic-border-input"
        />
      )}
    />
    {error && (
      <p style={{ color: "red", fontSize: "13px" }}>{error.message}</p>
    )}
  </div>
);

export default DatePickerField;
