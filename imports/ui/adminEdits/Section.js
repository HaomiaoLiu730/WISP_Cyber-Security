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
      QID : 0,
      qText : "",
      type : "",
      choices : [],
      optionID : 0,
      textDesc : "",
      QN : this.props.questionBlock.questions,
    };
    this.renderNextQuestion = this.renderNextQuestion.bind(this)
    this.appendData = this.appendData.bind(this);
    this.submit = this.submit.bind(this);
    this.changeChoiceID = this.changeChoiceID.bind(this)
    this.changeqText = this.changeqText.bind(this)
    this.changeChoices = this.changeChoices.bind(this)
    this.changeQID = this.changeQID.bind(this)
  }

  appendData(newData) {
    this.data.push(newData);
    this.setState({
      displayData: this.data,
    });
  }

  changeqText(QNindex, value) {
    // this.setState({
    //   qText: value,
    // });
    let newQN = this.state.QN
    newQN[QNindex].qText = value
    this.setState({
        QN : newQN
    })
    console.log("QN",this.state.QN)
  }

  changeChoices(QNindex, index, value){
    //   let newOptions = this.state.choices
    //   newOptions[index].textDesc = value
    //   this.setState({
    //       choices : newOptions
    //   })
      let newQN = this.state.QN
      newQN[QNindex].ansType.choices[index].textDesc = value
      this.setState({
          QN : newQN
      })
      console.log("QN",this.state.QN)
  }

  changeChoiceID(QNindex, index, value){
    // let newOptions = this.state.choices
    // newOptions[index].nextQNo = value
    // this.setState({
    //     choices : newOptions
    // })
    let newQN = this.state.QN
    newQN[QNindex].ansType.choices[index].nextQNo = value
    this.setState({
        QN : newQN
    })
    console.log("QN",this.state.QN)
  }

  changeQID(QNindex, value){
    //   this.setState({
    //       QID : value
    //   })
      let newQN = this.state.QN
      newQN[QNindex].QID = value
      this.setState({
          QN : newQN
      })
      console.log("QN",this.state.QN)
  }

  submit() {
      let finalQuestionBlock = {
          title : this.props.questionBlock.title,
          section : this.props.questionBlock.section,
          questions : this.state.QN
      }
      this.props.updateFinalCollection(finalQuestionBlock)
      this.props.renderNextTitle()
  }

  renderNextQuestion() {
      this.props.questionBlock.questions.map(
          (curQuestion, QNindex)=>{
            if (curQuestion === undefined) {
                this.props.addToCollection(this.state.answers);
                this.appendData(<h1>there's no more question in this section</h1>);
            } else if (curQuestion === 1 && this.data.length !== 0) {
            return;
            } else if (curQuestion.ansType.type === 'Text') {
            this.appendData(<ShortAnswer
                                QNindex = {QNindex}
                                question = {curQuestion.qText}
                                QID = {curQuestion.QID}
                                changeQID = {this.changeQID}
                                changeqText = {this.changeqText}
                        />);
            } else if (curQuestion.ansType.type === 'MCQ') {
            this.appendData(<MultipleChoice
                            QNindex = {QNindex}
                            question = {curQuestion.qText}
                            QID = {curQuestion.QID}
                            choices = {curQuestion.ansType.choices}
                            renderChoices = {this.renderChoices}
                            changeChoices = {this.changeChoices}
                            changeChoiceID ={this.changeChoiceID}
                            changeQID = {this.changeQID}
                            changeqText = {this.changeqText}
                        />);
            }          
          }
      )
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
