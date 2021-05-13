import React, { Component } from "react";
import axios from "axios";

export default class AddEquipment extends Component {
  state = {
    name: " ",
    description: " ",
    price: 0,
    deposit: 0,
    // error: null
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {  name, description, price, deposit } = this.state;
    axios
      .post("/api/equipments", {
        
        name,
        description,
        price,
        deposit,
      })
      .then((response) => {
        console.log(response.data);
        this.setState({
          
          name: " ",
          description: " ",
          price: 0,
          deposit: 0,
        });
        // update the list of equipments -> we want to trigger getData() in the Equipments
        // component
        this.props.getData();
      });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    // if (value.length < 8) {
    //   this.setState({
    //     error: 'String is not long enough'
    //   })
    // } else {
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {/* <label htmlFor="title">Photo: </label>
        <input
          type="text"
          name="photo"
          id="photo"
          value={this.state.imageUrl}
          onChange={this.handleChange}
        /> */}

        <label htmlFor="name">Name: </label>
        <input
          type="text"
          name="name"
          id="name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <label htmlFor="title">Description: </label>
        <input
          type="text"
          name="description"
          id="description"
          value={this.state.description}
          onChange={this.handleChange}
        />
        <label htmlFor="title">Price: </label>
        <input
          type="number"
          name="price"
          id="price"
          value={this.state.price}
          onChange={this.handleChange}
        />
        <label htmlFor="title">Deposit: </label>
        <input
          type="number"
          name="deposit"
          id="deposit"
          value={this.state.deposit}
          onChange={this.handleChange}
        />

        {/* {this.state.error && this.state.error} */}
        <button type="submit">Create this equipment</button>
      </form>
    );
  }
}
