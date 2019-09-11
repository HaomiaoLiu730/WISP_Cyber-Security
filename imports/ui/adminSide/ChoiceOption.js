/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class ChoiceOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: props.initialValue,
      link: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  onAddCouple() {
    this.props.addAnswer(this.props.id, this.state.answer, this.state.link);
  }

  render() {
    return (
            <li>
                <form>
                    <input
                        type = "textArea"
                        name = "answer"
                        placeholder = "type your options here"
                        className = "question"
                        value = {this.state.answer}
                        onChange = {this.handleChange}
                    />
                    <br/>
                    <input
                        type = "number"
                        name = "link"
                        placeholder = "type your linked question ID here"
                        value = {this.state.link}
                        onChange = {this.handleChange}
                        className = "question"/>
                </form>
                <button onClick = {this.onAddCouple.bind(this)}>change answer</button>
            </li>
    );
  }
}
