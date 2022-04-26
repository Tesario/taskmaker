import React, { useEffect } from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./StarsInput.scss";

interface Props {
  setPriority: (value: number) => void;
}

export const renderStars = (stars: 1 | 2 | 3 | 4 | 5) => {
  var rows = [];
  for (var i = 0; i < stars; i++) {
    rows.push(
      <div key={i} className="star">
        <FontAwesomeIcon icon={faStar} />
      </div>
    );
  }
  return <div className="priority">{rows}</div>;
};

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
