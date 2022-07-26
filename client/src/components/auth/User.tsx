import React from "react";
import { userI } from "types/auth";

import "./User.scss";

interface PropsI {
  user: userI;
}

const User: React.FC<PropsI> = ({ user }) => {
  return (
    <div id="user">
      <div className="avatar">
        <img src={user.picture} alt={user.name} />
      </div>
      <div>{user.name}</div>
    </div>
  );
};

export default User;
