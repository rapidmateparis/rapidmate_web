import React from "react";
import { Controller } from "react-hook-form";
import Styles from "../../../assets/css/home.module.css";
import Select from "react-select";
const DaysSelect = ({ control, error }) => {
  const days=[
    {label:'day',value:'Day'},
    {label:"week",value:"Week"}
  ]
  return (
  <div className="me-2">
    <Controller
      name="days"
      control={control}
      className={Styles.enterpriseSelectServiceRepeatDateSelect}
      render={({ field }) => (
        <Select
          {...field}
          options={days}
          defaultValue={days[0]}
          styles={customSelectStyles}
        />
      )}
    />
    {error && <p style={{ color: "red", fontSize: "13px" }}>{error.message}</p>}
  </div>
)};

const customSelectStyles = {
  control: (styles, state) => ({
    ...styles,
    backgroundColor: "#fff",
    width: "100%",
    fontSize: "13px",
    borderColor: state.isFocused ? "#ff0058" : "#ccc",
    boxShadow: state.isFocused ? "0 0 5px rgba(255, 64, 129, 0.5)" : "none",
    "&:hover": {
      borderColor: state.isFocused ? "#ff0058" : "#999",
    },
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: isSelected ? "#ffc72b" : isFocused ? "#f8f9fa" : "#fff",
    color: "#333",
    fontSize: "14px",
  }),
};

export default DaysSelect;
