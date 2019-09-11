/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-dupe-class-members */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { runInThisContext } from 'vm';
import MultipleChoice from './MultipleChoice';
import ShortAnswer from './ShortAnswer';

export default class QuestionType extends Component {
  // 1 stands for MCQ and 2 stands for short answer
  constructor(props) {
    super(props);
    this.displayData = [];
    this.state = {
      type: '1',
      showMCQ: false,
      showSA: false,
      showdata: this.displayData,
      postVal: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.setPrompt = this.setPrompt.bind(this);

    this.cleanSomeData = this.cleanSomeData.bind(this);
    this.appendAnotherQuestionType = this.appendAnotherQuestionType.bind(this);

    this.appendData = this.appendData.bind(this);
    this.prependData = this.prependData.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  cleanSomeData() {
    this.setState({
      type: '1',
      showMCQ: false,
      showSA: false,
    });
  }

  appendAnotherQuestionType() {
    this.appendData();
  }

  appendData() {
    this.displayData.push(
      <QuestionType
        changeQuestionType = {this.props.changeQuestionType}
        MCQ = {this.props.MCQ}
        SA = {this.props.SA}
        addMCQ = {this.props.addMCQ}
        addNumOfMCQ = {this.props.addNumOfMCQ}
        addSA = {this.props.addSA}
        addNumOfSA = {this.props.addNumOfSA}
        addQuestion = {this.props.addQuestion}
        addNumOfTotalQuestion = {this.props.addNumOfTotalQuestion}
        numOfTotalQuestions = {this.props.numOfTotalQuestions}
      />,
    );
    this.setState({
      showdata: this.displayData,
      postVal: '',
    });
  }

  prependData() {
    this.displayData.unshift(<div id="display-data"><pre>{this.state.postVal}</pre></div>);
    this.setState({
      showdata: this.displayData,
      postVal: '',
    });
  }

  handleChange(e) {
    const getTextAreaValue = e.target.value;
    this.setState({
      postVal: getTextAreaValue,
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
    this.props.changeQuestionType(event.target.value);
  }

  setPrompt() {
    if (this.state.type === '1') {
      this.setState({
        showMCQ: true,
        showSA: false,
      });
    } else if (this.state.type === '2') {
      this.setState({
        showSA: true,
        showMCQ: false,
      });
    } else {
      this.setState({
        showSA: false,
        showMCQ: false,
      });
    }
  }

  renderPrompt() {
    if (this.state.showMCQ) {
      return <MultipleChoice
        MCQ = {this.props.MCQ}
        addMCQ = {this.props.addMCQ}
        addNumOfMCQ = {this.props.addNumOfMCQ}
        addNumOfTotalQuestion = {this.props.addNumOfTotalQuestion}
        appendAnotherQuestionType = {this.appendAnotherQuestionType}
        questions = {this.props.questions}
        numOfTotalQuestions = {this.props.numOfTotalQuestions}
        />;
    }
    if (this.state.showSA) {
      return <ShortAnswer
        SA = {this.props.SA}
        addSA = {this.props.addSA}
        addNumOfSA={this.props.addNumOfSA}
        addNumOfTotalQuestion = {this.props.addNumOfTotalQuestion}
        appendAnotherQuestionType = {this.appendAnotherQuestionType}
        questions = {this.props.questions}
        numOfTotalQuestions = {this.props.numOfTotalQuestions}
        />;
    }
  }

  renderCorrectPrompt() {
    if (!this.state.showMCQ && !this.state.showSA) {
      return (
        <div>
          <h2 className = "prompt">What is the question type you want for the next question? </h2>
          <label>
              <input
                  type = "radio"
                  name = "type"
                  checked = {this.state.type === '1'}
                  value = "1"
                  onChange = {this.handleChange}
              />
              Multiple Choice Question
          </label>
          <br/>
          <label>
              <input
                  type = "radio"
                  name = "type"
                  checked = {this.state.type === '2'}
                  value = "2"
                  onChange = {this.handleChange}
              />
              Short Answer Question
          </label>
          <br/>
          <button onClick = {this.setPrompt}>DONE</button>
        </div>
      );
    }
    return this.renderPrompt();
  }

  render() {
    return (
            <div>
              {this.renderCorrectPrompt()}
              <div id="display-data-Container">
                {this.displayData}
              </div>
            </div>
    );
  }
}
