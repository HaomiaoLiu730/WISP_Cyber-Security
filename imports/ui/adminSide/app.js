/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import NavBar from './NavBar';
import Header from './Header';
import '../../../styling/Styles.CSS';
import MultipleChoice from './MultipleChoice';
import ShortAnswer from './ShortAnswer';
import Title from './Title';
import QuestionType from './QuestionType';


const createQN = gql`
  mutation createQN ($questions: [InputQuestionBlock]!){
  createQN(questions: $questions){
    _id
  }
}
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      begin: false,
      name: '',
      showSA: false,
      title: '',
      showTitle: false,
      showQuestionType: false,
      QuestionType: '',
      showQuestion: false,
      section: -1,
      choices: [],
      MCQ: [],
      MCQNumOfQuestions: 0,
      SA: [],
      SANumOfQuestions: 0,
      questions: [],
      numOfTotalQuestions: 0,
      collection: [],
    };
    this.onChangeShowTitle = this.onChangeShowTitle.bind(this);
    this.onChangeShowQuestionType = this.onChangeShowQuestionType.bind(this);
    this.onChangeQuestionType = this.onChangeQuestionType.bind(this);
    this.onChangeShowQuestion = this.onChangeShowQuestion.bind(this);
    this.cleanAllData = this.cleanAllData.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeBegin = this.onChangeBegin.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);

    this.addMCQ = this.addMCQ.bind(this);
    this.addNumOfMCQ = this.addNumOfMCQ.bind(this);
    this.addSA = this.addSA.bind(this);
    this.addNumOfSA = this.addNumOfSA.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.addNumOfTotalQuestion = this.addNumOfTotalQuestion.bind(this);
    this.changeSectionNumber = this.changeSectionNumber.bind(this);
    this.addToCollection = this.addToCollection.bind(this);
  }

  parseChoices(choices) {
    for (let i = 0; i < choices.length; i += 1) {
      this.state.choices.push({
        textDesc: choices[i][0],
        nextQNo: parseInt(choices[i][1], 10),
      });
    }
    return this.state.choices;
  }

  addQuestion(question) {
    if (Array.isArray(question)) {
      this.setState(
        (prevState) => {
          prevState.questions.push({
            qText: question[0],
            QID: this.state.numOfTotalQuestions,
            ansType: {
              type: 'MCQ',
              choices: this.parseChoices(question[1]).slice(0),
              nextQNo: -1,
            },
          });
          return ({
            questions: prevState.questions,
            choices: [],
          });
        },
      );
    } else {
      this.setState(
        (prevState) => {
          prevState.questions.push({
            qText: question.question,
            QID: this.state.numOfTotalQuestions,
            ansType: {
              type: 'Text',
              choices: null,
              nextQNo: parseInt(question.link, 10),
            },
          });
          return ({
            questions: prevState.questions,
          });
        },
      );
    }
    console.log('questions, ', this.state.questions);
  }

  addNumOfMCQ() {
    this.setState((prevState, props) => ({
      MCQNumOfQuestions: prevState.MCQNumOfQuestions + 1,
    }));
  }

  addNumOfSA() {
    this.setState(
      (prevState) => {
        const numOfPrev = prevState.SANumOfQuestions;
        const newNumOfSA = numOfPrev + 1;
        return ({
          SANumOfQuestions: newNumOfSA,
        });
      },
    );
  }

  addMCQ(question, answer) {
    if (this.state.MCQNumOfQuestions > this.state.MCQ.length) {
      this.setState(
        (prevState) => {
          const prevAnswer = prevState.MCQ;
          const newAnswer = prevAnswer.push({ question, answer });
          return ({
            MCQ: prevAnswer,
          });
        },
      );
    }
    console.log('mcq', this.state.MCQ);
    this.addQuestion([question, answer]);
  }

  addSA(question) {
    if (this.state.SANumOfQuestions > this.state.SA.length) {
      this.setState(
        (prevState) => {
          const prevSAs = prevState.SA;
          const newSAs = prevSAs.push(question);
          return ({
            SA: prevSAs,
          });
        },
      );
    }
    console.log('sa', this.state.SA);
    this.addQuestion(question);
  }

  addNumOfTotalQuestion() {
    this.setState({ numOfTotalQuestions: this.state.numOfTotalQuestions + 1 });
    return this.state.numOfTotalQuestions;
  }

  changeSectionNumber(value) {
    this.setState({
      section: value,
    });
  }

  addToCollection() {
    if (this.state.section !== -1 && this.state.title !== '') {
      this.setState(
        (prevState) => {
          prevState.collection.push(
            {
              title: this.state.title,
              section: this.state.section,
              questions: this.state.questions,
            },
          );
          return (
            {
              collection: prevState.collection,
            }
          );
        },
      );
    }
  }


  cleanAllData() {
    this.setState({
      name: '',
      showSA: false,
      title: '',
      showTitle: true,
      showQuestionType: false,
      QuestionType: '',
      showQuestion: false,
      choices: [],
      MCQ: [],
      MCQNumOfQuestions: 0,
      SA: [],
      SANumOfQuestions: 0,
      questions: [],
      numOfTotalQuestions: 0,
    });
  }

  onChangeTitle(value) {
    this.setState({
      title: value,
    });
  }

  onChangeBegin(value) {
    this.setState({
      begin: value,
    });
  }

  onChangeShowTitle(value) {
    this.setState({
      showTitle: value,
    });
  }

  onChangeShowQuestionType(value) {
    this.setState({
      showQuestionType: value,
    });
  }

  onChangeQuestionType(value) {
    this.setState({
      QuestionType: value,
    });
  }

  onChangeShowQuestion(value) {
    this.setState({
      showQuestion: value,
    });
  }

  onAddNumOfQuestion() {
    this.setState(
      prevState => ({
        numOfQuestion: prevState.numOfQuestion += 1,
      }),
    );
  }

  renderQuestionType() {
    if (this.state.showQuestionType) {
      return (
        <QuestionType
          changeQuestionType = {this.onChangeQuestionType}
          addMCQ = {this.addMCQ}
          addNumOfMCQ = {this.addNumOfMCQ}
          addSA = {this.addSA}
          addNumOfSA = {this.addNumOfSA}
          addQuestion = {this.addQuestion}
          addNumOfTotalQuestion = {this.addNumOfTotalQuestion}
          questions = {this.questions}
          MCQ = {this.MCQ}
          SA = {this.SA}
          numOfTotalQuestions = {this.numOfTotalQuestions}
        />
      );
    }
  }

  renderTitle() {
    return (
      <Title
      showTitle = {this.state.showTitle}
      changeShowQuestionType = {this.onChangeShowQuestionType}
      renderQuestionType = {this.renderQuestionType}
      changeShowTitle = {this.onChangeShowTitle}
      begin = {this.state.begin}
      changeTitle = {this.onChangeTitle}
      title = {this.state.title}
    />
    );
  }

  onSubmit() {
    this.addToCollection();
    this.cleanAllData();
    this.renderTitle();
    console.log('the collection is ', this.state.collection);
  }

  onFinish() {
    this.props.createQN({
      variables: {
        questions: this.state.collection,
      },
    }).then(
      () => this.state.collection = [],
    ).catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <Header/>
        <NavBar
          changeSA = {this.onChangeShowSA}
          changeTitle = {this.onChangeShowTitle}
          changeBegin = {this.onChangeBegin}
          onSubmit = {this.onSubmit}
          changeSectionNumber = {this.changeSectionNumber}
        />
        {this.renderTitle()}
        <div>{this.renderQuestionType()}</div>
        <br/>
        <button onClick = {this.onSubmit} className = "submit">Submit</button>
        <button onClick = {this.onFinish.bind(this)}
        style = {{
          position: 'absolute',
          left: 0,
          bottom: 0,
        }}>Finish</button>
      </div>
    );
  }
}

export default graphql(createQN, {
  name: 'createQN',
})(App);
