import axios from "axios";
import React, { Component } from "react";
import EditEquipment from "./EditEquipment";
import GoogleMapReact from "google-map-react";
import Marker from "./marker";
import Geocode from "react-geocode";



export default class EquipmentDetails extends Component {
  state = {
    equipment: null,
    imageurl: undefined,
    name: "",
    description: "",
    price: 0,
    deposit: 0,
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

  addressConversion = (address) => {
    console.log(address);
    Geocode.fromAddress(address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(">>>>>Conversion:");
        console.log(lat, lng);
        this.setState((state) => ({
          center: {
            lat: lat,
            lng: lng,
          },
        }));
      },
      (error) => {
        console.log(">>>>>BANANA:");
        console.error(error);
      }
    );
  };

  toggleEditForm = () => {
    this.setState((state) => ({
      editForm: !state.editForm,
    }));
  };

  getData = () => {
    console.log(this.props);
    axios
      .get(`/api/equipments/${this.props.match.params.id}`)
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
    const {
      imageurl,
      name,
      description,
      price,
      deposit,
      email,
      street,
      number,
      city,
      postalCode,
      country,
    } = this.state;
    e.preventDefault();
    axios
      .put(`/api/equipments/${this.state.equipment._id}`, {
        imageurl,
        name,
        description,
        price,
        deposit,
        email,
        street,
        number,
        city,
        postalCode,
        country,
      })
      .then((response) => {
        this.setState({
          equipment: response.data,
          imageurl: response.data.imageurl,
          name: response.data.name,
          description: response.data.description,
          price: response.data.price,
          deposit: response.data.deposit,
          email: response.data.email,
          street: response.data.street,
          number: response.data.number,
          city: response.data.city,
          postalCode: response.data.postalCode,
          country: response.data.country,
          center: {
            lat: response.data.lat,
            lng: response.data.lng,
          },
          editForm: false,
        });
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.getData();
  }

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

                  <div class="row pt-5">
                    <div>
                      <button
                        className="btn btn-info btn-block my-4"
                        onClick={this.deleteEquipment}
                      >
                        Delete this Equipment
                      </button>
                    </div>
                    <div>
                      <button
                        className="btn btn-info btn-block my-4"
                        onClick={this.toggleEditForm}
                      >
                        Show Edit Form
                      </button>
                    </div>
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
              <Marker
                lat={this.state.center.lat}
                lng={this.state.center.lng}
                // text=""
              />
            </GoogleMapReact>
          </div>
        </div>
      </div>
    );
  }
}
