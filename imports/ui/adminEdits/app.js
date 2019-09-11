/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import '../../../styling/Styles.CSS';
import NavBar from "./NavBar"
import Section from './Section'

const showQN = gql`
query showQNs {
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
`;

class App extends Component {

  constructor(props){
    super(props);
    this.data = []
    this.state = {
      showQN: false,
      curQuestions : [],
      sectionNumber : 0,
      sections : [],
      displayData : this.data,
      finalCollection : {_id : 0, questions : []},
      questions : [],
      titleNumber : 0,
      totalTitle : 0,
    }
    this.changeSectionNumber = this.changeSectionNumber.bind(this)
    this.findCorrectSection = this.findCorrectSection.bind(this)
    this.filterSectionQuestions = this.filterSectionQuestions.bind(this)
    this.renderQuestions = this.renderQuestions.bind(this)
    this.updateFinalCollection = this.updateFinalCollection.bind(this)
    this.renderFirstTitle = this.renderFirstTitle.bind(this)
    this.renderNextTitle = this.renderNextTitle.bind(this)
  }

    submitID(){
    if (this.props.QN.some( qn  => (
      qn._id === this.QuestionnaireID.value
    ))) {
      let newFinalCollection = this.state.finalCollection
      newFinalCollection._id = this.QuestionnaireID.value
      this.setState({
          showQN: true,
          curQuestions: (this.props.QN.find(qn => {
            return qn._id === this.QuestionnaireID.value
          })).questions,
          finalCollection : newFinalCollection
        })
      }
  }

  updateFinalCollection(value){
    let newQuestions = this.state.questions;
    newQuestions.push(value)
    let finalCol = this.state.finalCollection;
    finalCol.questions = newQuestions
    this.setState({
      questions : newQuestions,
      finalCollection : finalCol
    })
    console.log("final collection is ", this.state.finalCollection)
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
  }

  changeSectionNumber(value){
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

  appendDisplayData(newData){
    this.data.push(newData)
    this.setState({
      displayData : this.data
    })
  }


  renderNextTitle(){
    if(this.state.titleNumber >= this.state.totalTitle) return
    else{
      let questionBlock = this.state.sections[this.state.sectionNumber-1][this.state.titleNumber]
      this.appendDisplayData(<Section questionBlock = {questionBlock} 
                                        cleanUpOneCategory = {this.cleanUpOneCategory}
                                        updateFinalCollection = {this.updateFinalCollection}
                                        addTitleNumber = {this.addTitleNumber}
                                        renderNextTitle = {this.renderNextTitle}
                            />)
      this.setState({
        titleNumber : this.state.titleNumber+1
      })
    }
  }

  renderFirstTitle(section){
    this.setState({
      totalTitle : section.length
    })
    if(section.length >0){
      let questionBlock = section[0]
      this.appendDisplayData(<Section questionBlock = {questionBlock} 
                              cleanUpOneCategory = {this.cleanUpOneCategory}
                              updateFinalCollection = {this.updateFinalCollection}
                              addTitleNumber = {this.addTitleNumber}
                              renderNextTitle = {this.renderNextTitle}
                            />)
      this.setState({
        titleNumber : this.state.titleNumber+1
      })
    }
    else return
  }

  renderQuestions(){
    console.log("render question")
    this.renderFirstTitle(this.state.sections[this.state.sectionNumber-1])
    // switch(this.state.sectionNumber){
    //   case 1:{
    //     this.handleMultipleTitles(this.state.sections[0])
    //     break
    //   }
    //   case 2:{
    //     this.handleMultipleTitles(this.state.sections[1])
    //     break
    //   }
    //   case 3:{
    //     this.handleMultipleTitles(this.state.sections[2])
    //     break
    //   }
    //   case 4:{
    //     this.handleMultipleTitles(this.state.sections[3])
    //     break
    //   }
    //   case 5:{
    //     this.handleMultipleTitles(this.state.sections[4])
    //     break
    //   }
    //   default:{
    //     break
    //   }
    // }
  }

  render(){
    if (this.props.loading) return null;
      return(
        <div>
          <header className = "header"> <h1>Welcome to the Editing Page</h1> </header>
          Enter QN ID: 
          <input type="text" ref={input => this.QuestionnaireID = input } />
          <button onClick={this.submitID.bind(this)}>Submit</button>
          {this.state.showQN ? ( 
          <div>
            <NavBar 
              changeSectionNumber = {this.changeSectionNumber}
              clearData = {this.clearData}
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

export default compose(
  graphql(showQN, {
    props: ({ data }) => ({ ...data }),
  }),
)(App);
