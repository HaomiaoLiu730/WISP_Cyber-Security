/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import EmptyReminder from './EmptyReminder';

export default class Title extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      showTitle: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.renderPrompt = this.renderPrompt.bind(this);
    this.renderTitle = this.renderTitle.bind(this);
  }

  cleanAllData() {
    this.setState({
      title: '',
      showTitle: false,
    });
  }

  handleChange(event) {
    this.props.changeTitle(event.target.value);
  }

  renderPrompt() {
    this.props.changeShowQuestionType(true);
    this.props.changeShowTitle(false);
  }

  renderTitle() {
    if (this.props.begin === true) {
      if (this.props.showTitle === true) {
        return (
                    <div className = {this.props.showTitle === true ? 'Title' : 'hide'}>
                            <h2 className = "promt">Title: </h2>
                            <form>
                            <input
                                    type = "textarea"
                                    placeholder = 'type your title here'
                                    name ='title'
                                    className = 'question'
                                    value = {this.props.title}
                                    onChange = {this.handleChange}/>
                            </form>
                        <button onClick = {this.renderPrompt}>DONE</button>
                    </div>
        );
      }
      return (
                <h1>Title: {this.props.title}</h1>
      );
    }
  }

  render() {
    return (
            <div>
                {this.renderTitle()}
            </div>
    );
  }
}
