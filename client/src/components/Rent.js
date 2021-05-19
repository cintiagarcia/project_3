import React, { Component } from "react";
import axios from "axios";

export default class Rent extends Component {
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

        <section class="search-sec">
          <div class="container">
            <form action="#" method="post" novalidate="novalidate">
              <div class="row">
                <div class="col-lg-12">
                  <div class="row">
                    <div class="col-lg-3 col-md-3 col-sm-12 p-0">
                      <input
                        type="text"
                        class="form-control search-slt"
                        placeholder="Enter Pickup City"
                      ></input>
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-12 p-0">
                      <input
                        type="text"
                        class="form-control search-slt"
                        placeholder="Enter Drop City"
                      ></input>
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-12 p-0">
                      <select
                        class="form-control search-slt"
                        id="exampleFormControlSelect1"
                      >
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
                      <button type="button" class="btn btn-danger wrn-btn">
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    );
  }
}
