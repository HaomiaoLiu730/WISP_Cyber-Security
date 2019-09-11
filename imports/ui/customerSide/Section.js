/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ShortAnswer from './ShortAnswer';
import MultipleChoice from './MultipleChoice';

export default class Section extends Component {
  constructor(props) {
    super(props);
    this.data = [];
    this.state = {
      displayData: this.data,
      nextQID: 1,
      answers: [],
      question: '',
      answer: '',
    };
    this.appendData = this.appendData.bind(this);
    this.changeNextQID = this.changeNextQID.bind(this);
    this.renderNextQuestion = this.renderNextQuestion.bind(this);
    this.addAnswers = this.addAnswers.bind(this);
    this.changeAnswer = this.changeAnswer.bind(this);
    this.changeQuestion = this.changeQuestion.bind(this);
    this.saveAnswers = this.saveAnswers.bind(this);
    this.submit = this.submit.bind(this);
  }

  appendData(newData) {
    this.data.push(newData);
    this.setState({
      displayData: this.data,
    });
  }

  addAnswers(value) {
    this.setState(
      (prevState) => {
        prevState.answers.push(value);
        return ({
          answers: prevState.answers,
        });
      },
    );
  }

  changeQuestion(value) {
    this.setState({
      question: value,
    });
  }

  changeAnswer(value) {
    this.setState({
      answer: value,
    });
  }

  changeNextQID(value) {
    const intVal = parseInt(value, 10);
    // this.setState({
    //     nextQID : intVal
    // })
    this.state.nextQID = intVal;
  }

  saveAnswers() {
    const pair = {
      title: this.props.questionBlock.title,
      section: parseInt(this.props.questionBlock.section, 10),
      question: this.state.question,
      answer: this.state.answer,
    };
    const reloading = this.state.answers.some(
      answer => answer.question === this.state.question,
    );
    if (this.state.question.length !== 0 && !reloading) {
      this.setState(
        (prevState) => {
          prevState.answers.push(pair);
          return ({
            answers: prevState.answers,
          });
        },
      );
    }
    console.log('answer is ', this.state.answers);
  }

  submit() {
    this.props.cleanUpOneCategory();
  }

  renderNextQuestion() {
    const curQuestion = this.props.questionBlock.questions.filter(
      question => question.QID === this.state.nextQID,
    )[0];
    if (curQuestion === undefined) {
      this.props.addToCollection(this.state.answers);
      this.appendData(<h1>there's no more question in this section</h1>);
    } else if (curQuestion === 1 && this.data.length !== 0) {
      return;
    } else if (curQuestion.ansType.type === 'Text') {
      this.appendData(<ShortAnswer
                    question = {curQuestion.qText}
                    changeAnswer = {this.changeAnswer}
                    changeQuestion = {this.changeQuestion}
                />);
      this.changeNextQID(curQuestion.ansType.nextQNo);
    } else if (curQuestion.ansType.type === 'MCQ') {
      this.appendData(<MultipleChoice
                    question = {curQuestion.qText}
                    options = {curQuestion.ansType.choices}
                    changeNextQID = {this.changeNextQID}
                    changeAnswer = {this.changeAnswer}
                    changeQuestion = {this.changeQuestion}
                />);
    }

    this.saveAnswers();
  }

  render() {
    return (
            <div>
                <h1>{this.props.questionBlock.title}</h1>
                <div>
                    {this.state.displayData}
                </div>
                <button onClick = {this.renderNextQuestion}>Next</button>
                <br></br>
                <br/>
                <button onClick = {this.submit} className = "submit">Finish</button>
            </div>
    );
  }
}
