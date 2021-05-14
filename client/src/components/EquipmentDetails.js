import axios from "axios";
import React, { Component } from "react";
import EditEquipment from "./EditEquipment";

export default class EquipmentDetails extends Component {
  state = {
    equipment: null,
    imageUrl: " ",
    name: "",
    description: "",
    price: 0,
    deposit: 0,
    error: null,
    editForm: false,
    // this is the flag
    // dataRequested: false
  };

  toggleEditForm = () => {
    this.setState((state) => ({
      editForm: !state.editForm,
    }));
  };

  getData = () => {
    // // sets a flag - the data is requested but is not there yet
    // this.setState({
    //   dataRequested: true
    // })
    axios
      .get(`/api/equipments/${this.props.match.params.id}`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          equipment: response.data,
          imageUrl: response.data.imageUrl,
          name: response.data.name,
          description: response.data.description,
          price: response.data.price,
          deposit: response.data.deposit,
          // this unsets the flag when the data is available
          // dataRequested: false
        });
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 404) {
          this.setState({
            error: "Not found 🤷‍♀️🤷‍♂️",
          });
        }
      });
  };

  deleteEquipment = () => {
    axios
      .delete(`/api/equipments/${this.state.equipment._id}`)
      .then(() => {
        // we want to redirect to the equipments list
        this.props.history.push("/equipments");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    const { imageUrl, name, description, price, deposit } = this.state;
    e.preventDefault();
    axios
      .put(`/api/equipments/${this.state.equipment._id}`, {
        imageUrl,
        name,
        description,
        price,
        deposit,
      })
      .then((response) => {
        this.setState({
          equipment: response.data,
          imageUrl: response.data.imageUrl,
          name: response.data.name,
          description: response.data.description,
          price: response.data.price,
          deposit: response.data.deposit,
          editForm: false,
        });
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    if (this.state.error) return <h2>{this.state.error}</h2>;
    if (!this.state.equipment) return <></>;
    return (
      <>
        <h1>Name: {this.state.equipment.name}</h1>
        <img src= "{imageUrl}" alt="{title}"></img>
        <p>Description: {this.state.equipment.description}</p>
        <p>Price: {this.state.equipment.price}</p>
        <p>Deposit: {this.state.equipment.deposit}</p>
        <button onClick={this.deleteEquipment}>Delete this Equipment ❌</button>
        <button onClick={this.toggleEditForm}>Show Edit Form 📝</button>
        {this.state.editForm && (
          <EditEquipment
            {...this.state}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        )}
      </>
    );
  }
}
