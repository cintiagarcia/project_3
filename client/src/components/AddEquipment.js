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
    let config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const { user } = this.props
    axios.post("/api/equipments/upload", fd, config).then((response) => {
      const { img } = response.data;
      console.log(user);

      const { username, email, street, number, city, postalCode, country } = user;
      console.log("==============");
      console.log(response);

      const address =
        street +
        number +
        city +
        postalCode +
        country;
      axios
        .post("/api/equipments", {
          name,
          img,
          description,
          price,
          deposit,
          email,
          username,
          address,

        })
        .then((response) => {
          console.log(response);
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
      <div className="login d-flex justify-content-center p-2">
        <div className="card w-50 h-75 p-2">
          <h5 className="card-header info-color white-text text-center py-4">
            <strong>Add Equipment</strong>
          </h5>

          <br />
          <div className="card-body px-lg-5 pt-0">
            <form
              className="text-center border border-light p-3"
              onSubmit={this.handleSubmit}
            >
              <label htmlFor="title"></label>
              <input
                placeholder="Photo"
                className="form-control"
                type="file"
                onChange={this.handleImg}
              />

              <label htmlFor="name"> </label>
              <input
                placeholder="Name"
                className="form-control"
                type="text"
                name="name"
                id="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
              <label htmlFor="title"> </label>
              <input
                placeholder="Description"
                className="form-control"
                type="text"
                name="description"
                id="description"
                value={this.state.description}
                onChange={this.handleChange}
              />
              <label htmlFor="title"> </label>
              <input
                placeholder="Price"
                className="form-control"
                type="number"
                name="price"
                id="price"
                value={this.state.price}
                onChange={this.handleChange}
              />
              <label htmlFor="title"></label>
              <input
                placeholder="Deposit"
                className="form-control"
                type="number"
                name="deposit"
                id="deposit"
                value={this.state.deposit}
                onChange={this.handleChange}
              />

              {/* {this.state.error && this.state.error} */}
              <button type="submit" className="btn btn-info btn-block my-4">
                Create this equipment
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
