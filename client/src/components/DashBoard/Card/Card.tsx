import React from "react";
import { Link } from "react-router-dom";

import "./Card.scss";

interface Props {
  title: string;
  image: string;
  link: string;
  comingSoon?: boolean;
}

const Card: React.FC<Props> = ({ title, image, link, comingSoon }) => {
  return (
    <Link to={link} className={`dashboard-card ${comingSoon && "coming-soon"}`}>
      <div className="image">
        <img src={image} alt={title} />
      </div>
      <div className="title">{title}</div>
    </Link>
  );
};

export default Card;
