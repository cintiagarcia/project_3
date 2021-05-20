import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EditEquipment from "./EditEquipment";
import GoogleMapReact from "google-map-react";
import Geocode from "react-geocode";



const AnyReactComponent = ({ text }) => (
  <div>
    <i class="fas fa-map-marker-alt fa-2x" aria-hidden="true"></i>
  </div>
);

export default class SearchResults extends Component {
  state = {
    equipment: null,
    imageurl: undefined,
    name: "",
    description: "",
    price: null,
    deposit: null,
    email: "",
    street: "",
    number: Number,
    city: "",
    postalCode: Number,
    country: "",
    error: null,
    editForm: false,
    center: {
      lat: 52.52,
      lng: 13.41,
    },
    zoom: 11,
    // this is the flag
    // dataRequested: false
  };

  getData = () => {
    console.log(this.props);
    axios
      .get(`/api/equipments/filter/${this.props.match.params.city}`)
      .then((response) => {
        console.log(response);
        this.setState({
          equipment: response.data,
          imageurl: response.data.imageurl,
          name: response.data.name,
          description: response.data.description,
          price: response.data.price,
          deposit: response.data.deposit,
          email: response.data.email,
          user: response.data.user,
          address: response.data.address,
          userId: response.data.userId,
        });
        // this unsets the flag when the data is available
        // dataRequested: false
        this.addressConversion(response.data.address);
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

  render() {
    console.log("Coordenadas:");
    console.log(this.state.lat);
    if (this.state.error) return <h2>{this.state.error}</h2>;
    if (!this.state.equipment) return <></>;
    return (
      <div class="wrap row p-5">
        <div class="col-8">
          <div class="details d-flex justify-content-center">
            <img
              class="card-img-top img-responsive h-50 w-50"
              src={this.state.imageurl}
              alt="Card image cap"
            />

            <div class="card-body">
              <h3 class="card-title"> {this.state.equipment.name}</h3>

              <p>Description: {this.state.equipment.description}</p>
              <p>Price: {this.state.equipment.price}</p>
              <p>Deposit: {this.state.equipment.deposit}</p>

              <div class="card-footer text-muted">
                <div class="row">
                  <div class="col">
                    <a href="">
                      <i class="fas fa-calendar"></i>
                    </a>
                  </div>
                  <div class="col">
                    <a href="mailto:test@test.com">
                      <i class="fas fa-envelope"></i>
                    </a>
                  </div>
                  <div class="col">
                    <a href="tel:+123456789">
                      <i class="fas fa-phone"></i>
                    </a>
                  </div>

                  {this.state.editForm && (
                    <EditEquipment
                      {...this.state}
                      handleChange={this.handleChange}
                      handleSubmit={this.handleSubmit}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="h-100 p-4">
            <GoogleMapReact
              bootstrapURLKeys={{
                key: process.env.REACT_APP_GOOGLE_MAPS,
              }}
              center={[this.state.center.lat, this.state.center.lng]}
              defaultZoom={this.state.zoom}
            >
              <AnyReactComponent
                lat={this.state.center.lat}
                lng={this.state.center.lng}
                text=""
              />
            </GoogleMapReact>
          </div>
        </div>
      </div>
    );
  }
}

