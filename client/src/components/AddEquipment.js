import React, { Component } from "react";
import axios from "axios";

export default class AddEquipment extends Component {
  state = {
    fd: undefined,
    name: " ",
    description: " ",
    price: 0,
    deposit: 0,
    // error: null
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { fd, name, description, price, deposit } = this.state;
    console.log("LOOL");
    console.log(fd);
    let config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios.post("/api/equipments/upload", fd, config).then((response) => {
      const { img } = response;

      axios
        .post("/api/equipments", {
          name,
          img,
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
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleImg = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    console.log(`FILE: ${file}`);

    const fd = new FormData();
    fd.append("imageUrl", file);
    this.setState({
      fd: fd,
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="title">Photo: </label>
        <input type="file" onChange={this.handleImg} />

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
