import React, { Component } from "react";
import { signup } from "../services/auth";
//import { gmaps } from "../services/gmaps";
import Geocode from "react-geocode";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS);

export default class Signup extends Component {
  state = {
    username: "",
    password: "",
    message: "",
    email: "",
    street: "",
    number: Number,
    city: "",
    postalCode: Number,
    country: "",
  };

  addressConversion = () => {
    const address =
      this.state.street +
      this.state.number +
      this.state.city +
      this.state.postalCode +
      this.state.country;
    Geocode.fromAddress(address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(">>>>>Conversion:");
        console.log(lat, lng);
      },
      (error) => {
        console.log(">>>>>BANANA:");

        console.error(error);
      }
    );
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.addressConversion();
    const {
      username,
      password,
      email,
      street,
      number,
      city,
      postalCode,
      country,
    } = this.state;
    signup(
      username,
      password,
      email,
      street,
      number,
      city,
      postalCode,
      country
    ).then((response) => {
      if (response.message) {
        this.setState({
          message: response.message,
          username: "",
          password: "",
          email: "",
          street: "",
          number: Number,
          city: "",
          postalCode: Number,
          country: "",
        });
      } else {
        console.log(response);
        // we now put the user in the state of App.js
        this.props.setUser(response);
        // this.props.history.push("/projects");
      }
    });
  };

  render() {
    return (
      <div className="login d-flex justify-content-center p-4">
        <div className="card w-50 p-4">
          <h5 className="card-header info-color white-text text-center py-4">
            <strong>Register</strong>
          </h5>

          <br />

          <div className="card-body px-lg-5 pt-0">
            <form
              onSubmit={this.handleSubmit}
              className="text-center border border-light p-5"
            >
              <div className="form-group">
                {/* <label htmlFor="username"></label> */}
                <input
                  id="username"
                  className="form-control mb-2"
                  placeholder="Username"
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
              </div>

              <div className="form-group">
                {/* <label htmlFor="password"></label> */}
                <input
                  id="password"
                  className="form-control mb-2"
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>

              <div className="form-group">
                <input
                  id="email"
                  className="form-control mb-2"
                  placeholder="Email"
                  type="text"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </div>

              <div className="form-group">
                <input
                  id="street"
                  className="form-control mb-2"
                  placeholder="Street"
                  type="text"
                  name="street"
                  value={this.state.street}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  id="number"
                  className="form-control mb-2"
                  placeholder="Number"
                  type="number"
                  name="number"
                  value={this.state.number}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  id="city"
                  className="form-control mb-2"
                  placeholder="City"
                  type="text"
                  name="city"
                  value={this.state.city}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  id="postalCode"
                  className="form-control mb-2"
                  placeholder="Postal Code"
                  type="text"
                  name="postalCode"
                  value={this.state.postalCode}
                  onChange={this.handleChange}
                />
              </div>

              <div className="form-group">
                <input
                  id="country"
                  className="form-control mb-2"
                  placeholder="Country"
                  type="text"
                  name="country"
                  value={this.state.country}
                  onChange={this.handleChange}
                />
              </div>

              <button type="submit" className="btn btn-info btn-block my-4">
                Sign Up
              </button>
              <p className="forgot-password text-right">
                Already registered <a href="#"> log in?</a>
              </p>
              {this.state.message && <h3>{this.state.message}</h3>}
            </form>
          </div>
        </div>
      </div>
    );
  }
}
