import React, { Component } from "react";
import axios from "axios";
import EquipmentsList from "./EquipmentsList";
import AddEquipment from "./AddEquipment";

export default class Equipments extends Component {
  state = {
    equipments: [],
  };

  getData = () => {
    axios
      .get("/api/equipments")
      .then((response) => {
        console.log(response);
        this.setState({
          equipments: response.data,
        });
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      
      <div>
        <AddEquipment getData={this.getData} />
        <EquipmentsList equipments={this.state.equipments} />
      </div>
    );
  }
}
