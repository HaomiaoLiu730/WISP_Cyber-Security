/* eslint-disable no-plusplus */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
/* eslint-disable prefer-const */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.onClickEvent = this.onClickEvent.bind(this)
  }

  onClickEvent(event){
    //this.props.clearData()
    this.props.changeSectionNumber(event.target.value)
  }

  render() {
    return (
      <div>
        <button
          className = "navBarOption"
          value = {1}
          onClick = {this.onClickEvent}
        >
        Identify</button>
        <button
          className = "navBarOption"
          value = {2}
          onClick = {this.onClickEvent}
        >
        Protect</button>
        <button
          className = "navBarOption"
          value = {3}
          onClick = {this.onClickEvent}
        >
        Detect</button>
        <button
          className = "navBarOption"
          value = {4}
          onClick = {this.onClickEvent}
        >
        Respond</button>
        <button
          className = "navBarOption"
          value = {5}
          onClick = {this.onClickEvent}
        >
        Recover</button>
      </div>
    );
  }
}
