import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";

import "./StarsInput.scss";

interface Props {
  setPriority: (value: number) => void;
}

const StarsInput: React.FC<Props> = ({ setPriority }) => {
  useEffect(() => {
    setPriority(2);
  });

  return (
    <div id="stars-input">
      <span className="star-cb-group">
        <label htmlFor="rating-1">
          <FontAwesomeIcon icon={faStar} />
        </label>
        <input
          type="radio"
          id="rating-1"
          name="rating"
          value="1"
          onChange={() => setPriority(1)}
        />
        <label htmlFor="rating-2">
          <FontAwesomeIcon icon={faStar} />
        </label>
        <input
          type="radio"
          id="rating-2"
          name="rating"
          value="2"
          defaultChecked
          onChange={() => setPriority(2)}
        />
        <label htmlFor="rating-3">
          <FontAwesomeIcon icon={faStar} />
        </label>
        <input
          type="radio"
          id="rating-3"
          name="rating"
          value="3"
          onChange={() => setPriority(3)}
        />
        <label htmlFor="rating-4">
          <FontAwesomeIcon icon={faStar} />
        </label>
        <input
          type="radio"
          id="rating-4"
          name="rating"
          value="4"
          onChange={() => setPriority(4)}
        />
        <label htmlFor="rating-5">
          <FontAwesomeIcon icon={faStar} />
        </label>
        <input
          type="radio"
          id="rating-5"
          name="rating"
          value="5"
          onChange={() => setPriority(5)}
        />
      </span>
    </div>
  );
};

export default StarsInput;
