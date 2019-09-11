/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ChoiceOption from './ChoiceOption';

export default class MultipleChoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numOfAnswers: 0,
      finalCount: 0,
      answers: [],
      question: '',
      totalNumOfQuestions: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeAnswer = this.onChangeAnswer.bind(this);
    this.onChangeQuestion = this.onChangeQuestion.bind(this);
    this.finish = this.finish.bind(this);
    this.renderOptions = this.renderOptions.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    this.setState(
      {
        totalNumOfQuestions: this.props.addNumOfTotalQuestion(),
      },
    );
    this.props.addNumOfMCQ();
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
    );
    this.state.questions = [];
  }

  onSubmit(event) {
    this.setState(
      {
        finalCount: this.state.numOfAnswers,
      },
    );
    // every time when the user hit submit button, it will spontanesouly refresh the entire array
    this.state.answers = [];
  }

  /**
     * this is showing the correct number of prompts for the number of answers selected by the admin
     */
  renderOptions() {
    let i = 0;
    for (i; i < this.state.finalCount; i += 1) {
      if (i === this.state.answers.length) {
        this.state.answers.push('');
      }
    }
    i = 0;
    const tempfunc = this.onChangeAnswer;
    return this.state.answers.map(
      (answer) => {
        i += 1;
        const tempID = 'MCQ'.concat(i.toString());
        return <ChoiceOption
                    key = {tempID}
                    id = {tempID}
                    addAnswer = {tempfunc}
                    initialValue = {answer}/>;
      },
    );
  }

  onChangeAnswer(id, newAnswer, newID) {
    const index = id.substr(-1) - 1;
    this.state.answers[index] = [newAnswer, newID];
    console.log(this.state.answers);
  }

  onChangeQuestion(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  finish() {
    this.props.addMCQ(this.state.question, this.state.answers);
    this.props.appendAnotherQuestionType();
    // this.props.cleanSomeDataForQT()
  }

  render() {
    return (
            <div>
                <h1>Multiple Choice Question ID : {this.state.totalNumOfQuestions + 1}</h1>
                <form>
                    <label className = "prompt">Questions:  </label>
                    <input
                        type = "textarea"
                        placeholder = 'type your question here'
                        name ='question'
                        className = 'question'
                        value = {this.state.question}
                        onChange = {this.onChangeQuestion}
                        >
                    </input>
                    <br/>
                    <br/>
                    <label className = "prompt">How many choices would you like for this question: </label>
                    <select
                        name = "numOfAnswers"
                        value = {this.state.numOfAnswers}
                        onChange = {this.handleChange}>
                        <option value = {0}> zero </option>
                        <option value = {1}> one </option>
                        <option value = {2}> two </option>
                        <option value = {3}> three </option>
                        <option value = {4}> four </option>
                        <option value = {5}> five </option>
                    </select>
                </form>
                <button onClick = {this.onSubmit}>DONE</button>
                <ul id="choices">
                    {this.renderOptions()}
                </ul>
                <button onClick = {this.finish}>Next</button>
            </div>
    );
  }
}
