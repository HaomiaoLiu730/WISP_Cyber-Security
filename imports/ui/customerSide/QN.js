/* eslint-disable */

import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import Loading from './Loading'

export default class QN extends Component{

  render(){
    if(this.props.loading) return <Loading />;
    const CurrQN = this.props.QN.find((qn) => {
      return qn._id === this.props.QuestionnaireID
    })
      return(
          <div>
            {/* {CurrQN.questions.map((qBlock) => (
              <ul key={qBlock.title}>
                <div>
                  <h1>{qBlock.title}</h1>
                  <br/>
                  {qBlock.section}
                </div>
              </ul>
            ))} */}
          </div>
      )
  }
}