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
    this.changeDisplayTitle = this.changeDisplayTitle.bind(this);
  }

  changeDisplayTitle(event) {
    this.props.changeBegin(true);
    this.props.changeTitle(true);
    this.props.onSubmit();
    this.props.changeSectionNumber(event.target.value);
  }

  render() {
    return (
      <div>
        <button
          className = "navBarOption"
          value = {1}
          onClick = {this.changeDisplayTitle}>
        Identify</button>
        <button
          className = "navBarOption"
          value = {2}
          onClick = {this.changeDisplayTitle}>
        Protect</button>
        <button
          className = "navBarOption"
          value = {3}
          onClick = {this.changeDisplayTitle}>
        Detect</button>
        <button
          className = "navBarOption"
          value = {4}
          onClick = {this.changeDisplayTitle}>
        Respond</button>
        <button
          className = "navBarOption"
          value = {5}
          onClick = {this.changeDisplayTitle}>
        Recover</button>
      </div>
    );
  }
}
