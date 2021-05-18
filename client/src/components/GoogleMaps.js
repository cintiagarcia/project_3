import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 52.5186,
      lng: 13.4081,
    },
    zoom: 11,
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "50vh", width: "50%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.GOOGLE_MAP }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent lat={52.5186} lng={13.4081} text="My Marker" />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;