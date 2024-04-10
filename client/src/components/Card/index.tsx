import React from "react";
import { Playlist } from "../../utils/types";
import { Link } from "react-router-dom";
import "./card.css";

const Card = ({ playlist }: { playlist: Playlist }) => {
  const { id, name, description, images } = playlist;

  return (
    <Link className="card" to={`/Playlists/${id}`}>
      <img className="card-image" src={images} alt={name} />
      <div className="card-content">
        <div className="card-title">{name}</div>
        <div className="card-description">{description}</div>
      </div>
    </Link>
  );
};

export default Card;
