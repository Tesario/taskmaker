import React from "react";
import { Link } from "react-router-dom";

import "./Card.scss";

interface Props {
  title: string;
  image: string;
  link: string;
}

const Card: React.FC<Props> = ({ title, image, link }) => {
  return (
    <Link to={link} className="dashboard-card">
      <div className="image">
        <img src={image} alt={title} />
      </div>
      <div className="title">{title}</div>
    </Link>
  );
};

export default Card;
