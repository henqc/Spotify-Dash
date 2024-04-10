import React from "react";
import { User } from "../../utils/types";
import "./user.css";

const UserCard = ({ user }: { user: User }) => {
  const { name, external_urls, image } = user;

  return (
    <a className="user-card" href={external_urls}>
      <img className="user-image" src={image} alt={name} />
      <div className="user-content">
        <div className="user-title">{name}</div>
      </div>
    </a>
  );
};

export default UserCard;
