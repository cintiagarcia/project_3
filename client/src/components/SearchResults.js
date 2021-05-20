import React, { Component } from "react";
import axios from "axios";
import SearchItem from "./SearchItem";

export default class SearchResults extends Component {
  state = {
    equipments:[]
  };

  getData = () => {
    console.log(this.props);
    axios
      .get(`/api/equipments/filter/${this.props.match.params.id}`)
      .then((response) => {
          console.log(response);
          this.setState({
            equipments: response.data
          })
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
     this.getData();
  }

  render() {
    return (<div class="container pt-4">
      <div class="row align-items-start">
        {this.state.equipments.map((e) => {
          return <SearchItem equipment={e} history={this.props.history}/>;
        })}
      </div>
    </div>);
  }
}

