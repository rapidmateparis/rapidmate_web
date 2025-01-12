import { Controller } from "react-hook-form";
import Select from "react-select";
const RepeatEverySelect = ({ control, name, error, repeatList}) => {
   return (
    <div className="me-2">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
          {...field}
          options={repeatList}
          defaultValue={repeatList[0]}
          onChange={(selectedOption) => field.onChange(selectedOption.value)}
          styles={customSelectStyles}
        />
        )}
      />
      {error && <p style={{ color: "red", fontSize: "13px" }}>{error.message}</p>}
    </div>
   )
  };
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
export default RepeatEverySelect

