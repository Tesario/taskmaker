import DateTimePicker from "react-datetime-picker";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faXmark } from "@fortawesome/free-solid-svg-icons";

import "./DatetimePicker.scss";

interface Props {
  setDatetime: (value: Date) => void;
}

const DatetimePicker: React.FC<Props> = ({ setDatetime }) => {
  const [value, onChange] = useState<Date>(new Date());

  useEffect(() => {
    setDatetime(value);
  }, [setDatetime, value]);

  return (
    <div id="datetime-picker">
      <DateTimePicker
        onChange={onChange}
        value={value}
        format={"d.M.y HH:mm"}
        autoFocus
        calendarIcon={<FontAwesomeIcon icon={faCalendar} />}
        clearIcon={<FontAwesomeIcon icon={faXmark} />}
      />
    </div>
  );
};

export default DatetimePicker;
