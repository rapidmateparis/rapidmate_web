import { Controller } from "react-hook-form";

const WeekDaysSelect = ({ control, selectedDays }) => (
    <div className="d-flex flex-wrap">
      {Object.keys(selectedDays).map((day) => (
        <div key={day} className="form-check">
          <Controller
            name={`selectedDays.${day}`}
            control={control}
            render={({ field }) => (
              <div>
                <input
                  type="checkbox"
                  {...field}
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
                <label>{day}</label>
              </div>
            )}
          />
        </div>
      ))}
    </div>
  );

  export default WeekDaysSelect