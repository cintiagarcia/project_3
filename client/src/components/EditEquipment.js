import React, { Component } from 'react'

export default class EditEquipment extends Component {
  render() {
    return (
      <div>
        <h1>Edit this Equipment</h1>
        <form onSubmit={this.props.handleSubmit}>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            name="name"
            value={this.props.name}
            onChange={this.props.handleChange}
          />
          <label htmlFor="description">Description: </label>
          <input
            type="text"
            id="description"
            name="description"
            value={this.props.description}
            onChange={this.props.handleChange}
          />
          <button type="submit">Update this Equipment</button>
        </form>
      </div>
    )
  }
}
