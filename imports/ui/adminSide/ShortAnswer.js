/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class ShortAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      totalNumOfQuestions: 0,
      link: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.finish = this.finish.bind(this);
  }

  handleChange(event) {
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
    );
  }

  componentDidMount() {
    this.setState(
      {
        totalNumOfQuestions: this.props.addNumOfTotalQuestion(),
      },
    );
    this.props.addNumOfSA();
  }

  finish() {
    this.props.addSA({ question: this.state.question, link: this.state.link });
    this.props.appendAnotherQuestionType();
  }

  render() {
    return (
            <div>
                <h1>ShortAnswer Question ID : {this.state.totalNumOfQuestions + 1}</h1>
                <form>
                    <label className = "prompt">Questions: </label>
                    <input
                        type = 'textarea'
                        name = "question"
                        placeholder = "type your quesiton here"
                        className = "question"
                        value = {this.state.question}
                        onChange = {this.handleChange}
                    />
                    <label className = "prompt">Linkz: </label>
                    <input
                        type = 'number'
                        name = "link"
                        placeholder = "link your question"
                        className = "question"
                        value = {this.state.link}
                        onChange = {this.handleChange}
                    />
                </form>
                <button onClick = {this.finish}>Next</button>
            </div>
    );
  }
}
