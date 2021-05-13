import React from 'react'
import { Link } from 'react-router-dom';

export default function EquipmentsList(props) {
  return (
    <div>
      {props.equipments.map((equipment) => {
        return (
          <h3 key={equipment._id}>
            <Link to={`/equipments/${equipment._id}`}>{equipment.name}</Link>
          </h3>
        );
      })}
    </div>
  );
}
