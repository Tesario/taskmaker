import DateTimePicker from "react-datetime-picker";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faXmark } from "@fortawesome/free-solid-svg-icons";
import { handleValueFunc } from "@components/Buttons/EditButton";

import "./DatetimePicker.scss";

interface Props {
  handleValue: handleValueFunc;
  due: Date;
}

const DatetimePicker: React.FC<Props> = ({ handleValue, due }) => {
  const [value, onChange] = useState<Date>(due);
  useEffect(() => {
    handleValue("due", value);
  }, [value]);

  useEffect(() => {
    onChange(due);
  }, [due]);

  return (
    <div id="datetime-picker">
      <DateTimePicker
        onChange={onChange}
        value={new Date(value)}
        format={"d.M.y HH:mm"}
        calendarIcon={<FontAwesomeIcon icon={faCalendar} />}
        clearIcon={<FontAwesomeIcon icon={faXmark} />}
      />
    </div>
  );
};

export default DatetimePicker;
