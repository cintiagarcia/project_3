import React, { Component } from "react";
import axios from "axios";
import SearchResults from "./SearchResults";

export default class Rent extends Component {
  state = {
    city: "",
    // error: null
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    this.setState({
      city: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { city } = this.state;
    console.log("llamadaaaa");
    console.log(city);
    this.props.history.push(`/search/${city}`);
  };

  render() {
    return (
      <div class="rent">
        <section>
          <div class="photo">
            <img
              src="/images/prismaticos.jpeg"
              class="d-block w-100"
              alt="..."
            ></img>
          </div>
        </section>

        <div class="search-sec">
          <div class="container">
            <form action="#" onSubmit={this.handleSubmit}>
              <div class="row">
                <div class="col-lg-12">
                  <div class="row">
                    <div class="col-lg-3 col-md-3 col-sm-12 p-0">
                      <input
                        type="text"
                        class="form-control search-slt"
                        placeholder="Enter Pickup City"
                        name="city"
                        value={this.state.city}
                        onChange={this.handleChange}
                      ></input>
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-12 p-0">
                      <input
                        type="text"
                        class="form-control search-slt"
                        placeholder="Enter Drop City"
                        name="city"
                        value={this.state.city}
                        onChange={this.handleChange}
                      ></input>
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-12 p-0">
                      <select class="form-control search-slt" id="select">
                        <option>Select baby's equipment </option>
                        <option>Strollers</option>
                        <option>Car Seats</option>
                        <option>Baby Wipe</option>
                        <option>High Chair</option>
                        <option>Baby Carrier</option>
                        <option>Baby Bed</option>
                      </select>
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-12 p-0">
                      <button type="button" class="btn btn-danger wrn-btn" onClick={this.handleSubmit}>
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
