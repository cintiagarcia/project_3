import React, { Component } from "react";
import { login } from "../services/auth";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBDropdownLink,
} from "mdb-react-ui-kit";

export default class Login extends Component {
  state = {
    username: "",
    password: "",
    message: "",
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    login(username, password).then((response) => {
      if (response.message) {
        this.setState({
          message: response.message,
          username: "",
          password: "",
        });
      } else {
        console.log(response);
        // we now put the user in the state of App.js
        this.props.setUser(response);

        this.props.history.push("/");
      }
    });
  };

  render() {
    return (
      <div className="login d-flex justify-content-center p-4">
        <div className="card w-44 h-75 p-4">
          <h5 className="card-header info-color white-text text-center py-4">
            <strong>Sign in</strong>
          </h5>

          <br />

          <div className="card-body px-lg-5 pt-0">
            <form
              className="text-center border border-light p-5"
              action="#!"
              onSubmit={this.handleSubmit}
            >
              {/* <label htmlFor="username"> </label> */}
              <input
                placeholder="Username"
                className="form-control mb-4"
                id="username"
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
              />

              {/* <label htmlFor="password"> </label> */}
              <input
                placeholder="Password"
                className="form-control mb-4"
                id="password"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <button className="btn btn-info btn-block my-4" type="submit">
                Log in
              </button>

              <p>
                Not a member?
                <a href=""> Register</a>
              </p>

              <p>or sign in with:</p>

              <a href="#" class="btn btn-info mx-2 buttonRounded" role="button">
                <i class="fab fa-facebook-f light-blue-text"></i>
              </a>
              <a href="#" class="btn btn-info mx-2 buttonRounded" role="button">
                <i class="fab fa-twitter light-blue-text"></i>
              </a>
              <a href="#" class="btn btn-info mx-2 buttonRounded" role="button">
                <i class="fab fa-linkedin-in light-blue-text"></i>
              </a>
              <a href="#" class="btn btn-info mx-2 buttonRounded" role="button">
                <i class="fab fa-github light-blue-text"></i>
              </a>

              {this.state.message && <h3>{this.state.message}</h3>}
            </form>
          </div>
        </div>
      </div>
    );
  }
}
