/* eslint-disable */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import QN from './QN';
import NavBar from './NavBar';
import '../../../styling/Styles.CSS';
import Section from './Section';
import Title from '../adminSide/Title';

const Questions =gql`
query showQns {
  QN {
    _id
    questions {
      title
      section
      questions {
        qText
        QID
        ansType {
          type
          nextQNo
          choices {
            textDesc
            nextQNo
          }
        }
      }
    }
  }
}
`

const sendAnswers =gql`

mutation sendAnswers($templateID: String!, $answers: [CInputQuestionBlock]!) {
  sendAnswers(
      templateID: $templateID,
      answers: $answers
  ) {
    templateID
  }
}

`


class App extends Component{

    constructor(props){
      super(props)
      this.data = []
      this.refreshSection = false
      this.state = {
        showQN: false,
        curQuestions : [],
        sections : [],
        sectionNumber : 0,
        displayData : this.data,
        collectionOfAnswers : [],
        finalCollection : [],
      }
      this.submitID = this.submitID.bind(this)
      this.filterSectionQuestions = this.filterSectionQuestions.bind(this)
      this.renderQuestions = this.renderQuestions.bind(this)
      this.changeSectionNumber = this.changeSectionNumber.bind(this)
      this.appendDisplayData = this.appendDisplayData.bind(this)
      this.addToCollection = this.addToCollection.bind(this)
      this.cleanUpOneCategory = this.cleanUpOneCategory.bind(this)
      this.getAnswers = this.getAnswers.bind(this)
    }    

    // once the questionnaire ID is found, set everything to visible
    // while initializing the curQuestions field
    submitID(){
      if (this.props.QN.some( qn  => (
        qn._id === this.QuestionnaireID.value
      ))) this.setState({
            showQN: true,
            curQuestions: (this.props.QN.find(qn => {
              return qn._id === this.QuestionnaireID.value
            })).questions
          })
    }

    appendDisplayData(newData){
      this.data.push(newData)
      this.setState({
        displayData : this.data
      })
    }

    addToCollection(newData){
      this.setState(
          (prevState) => {
              prevState.collectionOfAnswers.push(newData)
              return({
                collectionOfAnswers : prevState.collectionOfAnswers
              })
          }
      )
      console.log("collection of answers",this.state.collectionOfAnswers)
    }

    getAnswers(collection){
      const answers = []
      for(let i = 0; i < collection.length; i += 1){
          collection[0][i].forEach( (item) => {
            answers.push(item);
          })
      }
      console.log(answers);
      return answers;
    }

    cleanUpOneCategory(){
      this.setState(
        (prevState) =>{
          let col = this.state.collectionOfAnswers
          console.log("col", col)
          prevState.finalCollection.push(col)
          return({
            finalCollection : prevState.finalCollection
          })
        },
        function () {
          this.props.sendAnswers({ 
            variables: {
              templateID: this.QuestionnaireID.value,
              answers: this.getAnswers(this.state.finalCollection),
            }
          }).catch((error) => {
            console.log(error)
          });
        }
      )

      

      console.log("finalCollection", this.state.finalCollection);

      

    }

    // this is called when onclick event happens in NavBar
    changeSectionNumber(value){
      if (parseInt(value,10) === this.state.sectionNumber) return null;
      let tempVal = parseInt(value , 10)
      this.setState(
        { sectionNumber: tempVal },
          () => {
            this.renderQuestions()
          }
      );
      if(this.state.sections.length === 0){
        this.filterSectionQuestions()
      }
    }

    // return an array of all the question block with the same sectionNumber
    findCorrectSection(sectionNumber){
      let section = this.state.curQuestions.filter(
        (questionBlock)=>{
          // do not change this to triple equals!!!!!
          return questionBlock.section == sectionNumber
        }
      )
      return section
    }

    // initialize the state.sections, which is an array of objects
    filterSectionQuestions(){
      for (let i = 1; i < 6 ; i ++){
        let newSection = this.findCorrectSection(i)
        this.setState(
          (prevState)=>{
            prevState.sections.push(newSection)
            return ({
              sections : prevState.sections
            })
          }
          )
      }
      console.log("sections", this.state.sections)
    }

    handleMultipleTitles(section){
      section.map(
        (questionBlock , index) => {
          this.appendDisplayData(<Section questionBlock = {questionBlock} 
                                          refreshSection = {this.refreshSection} 
                                          setRefreshSection = {this.setRefreshSection}
                                          addToCollection = {this.addToCollection}
                                          cleanUpOneCategory = {this.cleanUpOneCategory}
                                />)
        }
      )
    }

    renderQuestions(){
      switch(this.state.sectionNumber){
        case 1:{
          this.handleMultipleTitles(this.state.sections[0])
          break
        }
        case 2:{
          this.handleMultipleTitles(this.state.sections[1])
          break
        }
        case 3:{
          this.handleMultipleTitles(this.state.sections[2])
          break
        }
        case 4:{
          this.handleMultipleTitles(this.state.sections[3])
          break
        }
        case 5:{
          this.handleMultipleTitles(this.state.sections[4])
          break
        }
        default:{
          break
        }
      }
    }

    render(){
      if (this.props.loading) return null;
        return(
          <div>
            <header className = "header"> <h1>Welcome to the Survey</h1> </header>
            Enter QN ID: 
            <input type="text" ref={input => this.QuestionnaireID = input } />
            <button onClick={this.submitID.bind(this)}>Submit</button>
            {this.state.showQN ? ( 
            <div>
              <NavBar 
                changeSectionNumber = {this.changeSectionNumber}
                clearData = {this.clearData}
                renderQuestions = {this.renderQuestions}
              />
              <div>
                {this.state.displayData}
              </div>
            </div>
             ) 
             : null
            }
           </div> 
        )
    }
}

export default compose (
graphql(Questions, { props: ({ data }) => ({ ...data }) }),
graphql(sendAnswers, {name: 'sendAnswers'})
)(App)