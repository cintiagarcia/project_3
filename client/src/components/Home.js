import React, { Component } from "react";
import axios from "axios";


export default class Home extends Component {
  render() {
    return (
      <div>
        <div class="home">
          <div class="information ">
            <div>
              <h2>
                Equipment rental for
                <br />
                traveling families
              </h2>
            </div>

            <div class="Homebuttons">
              <a href="/signup">Sign Up</a>
              <a href="/login">Log In</a>
            </div>

            <div class="logo">
              <a class="navbar-brand" href="#">
                <img src="/images/baby3.0.png" alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}