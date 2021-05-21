import React from "react";
import { Link } from "react-router-dom";

export default function SearchItem(props) {
  console.log(props);

  return (
    <div class="card cards-search align-items-center col-sd m-2">
      <img
        class="card-img-top cards-image "
        src={props.equipment.imageurl}
        alt="Card image cap"
      />
      <div class="card-body">
        <h5 class="card-title">{props.equipment.name}</h5>
        <p class="card-text">{props.equipment.description}</p>
        <a
          href="#"
          class="btn btn-primary"
          onClick={(e) => {
            props.history.push(`/equipments/${props.equipment._id}`);
          }}
        >
          Details
        </a>
      </div>
    </div>
  );
}
