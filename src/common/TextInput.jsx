import React from "react";
import { Controller } from "react-hook-form";

const TextInput = ({ control, name, placeholder, error ,defaultValue}) => (
  <div>
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <input
          {...field}
          type="text"
          placeholder={placeholder}
          style={{ width: "100%", padding: "5px" }}
          className="dynamic-border-input"
        />
      )}
    />
    {error && (
      <p style={{ color: "red", fontSize: "13px" }}>
        {error.message}
      </p>
    )}
  </div>
);

export default TextInput;
