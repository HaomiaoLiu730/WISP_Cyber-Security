import React, {Component} from "react"
import ReactDOM from "react-dom"

export default class MultipleChoice extends Component{ 

    constructor(props){
        super(props)
        this.state = {
            qText : this.props.question,
            QID : this.props.QID,
            choices : this.props.choices,
        }
        this.renderChoices = this.renderChoices.bind(this)
        this.onChangeChoices = this.onChangeChoices.bind(this)
        this.onChangeChoiceID = this.onChangeChoiceID.bind(this)
        this.onChangeQID = this.onChangeQID.bind(this)
        this.onChangeqText = this.onChangeqText.bind(this)
    }

    onChangeqText(event){
        this.setState({
            qText : event.target.value
        })
        this.props.changeqText(this.props.QNindex, event.target.value)
    }

    onChangeChoices(event){
        let newOptions = this.state.choices
        newOptions[event.target.name].textDesc = event.target.value
        this.setState({
            choices : newOptions
        })
        this.props.changeChoices(this.props.QNindex,event.target.name, event.target.value)
    }

    onChangeChoiceID(event){
        let newOptions = this.state.choices
        newOptions[event.target.name].nextQNo = event.target.value
        this.setState({
            choices : newOptions
        })
        this.props.changeChoiceID(this.props.QNindex,event.target.name, event.target.value)
    }

    onChangeQID(event){
        this.setState({
            QID : event.target.value
        })
        this.props.changeQID(this.props.QNindex,event.target.value)
    }

    renderChoices(){
        return(
            this.props.choices.map(
                (option, i)=>{
                    return(
                        <div>
                            <label className = "prompt">
                                option is: 
                                <input 
                                type = "textarea"
                                name = {i}
                                className = 'option'
                                value = {option.textDesc}
                                onChange = {this.onChangeChoices}
                                />
                            </label>
                            <br/>
                            <label className = "prompt">
                            With the ID of the next question being 
                            <input 
                                type = "textarea"
                                name = {i}
                                className = 'ID'
                                value = {option.nextQNo}
                                onChange = {this.onChangeChoiceID}
                            />
                            </label>
                        </div>
                    )
                }
            )
        )
    }

    render(){
        return(
        <div>
            <form>
                <label className = "prompt"> Questions: </label>
                <input
                    type = "textarea"
                    name ='qText'
                    className = 'question'
                    value = {this.state.qText}
                    onChange = {this.onChangeqText}
                    >
                </input>
                <br/>
                <label className = "prompt"> QID: </label>
                <input
                    type = "textarea"
                    name ='QID'
                    className = 'question'
                    value = {this.state.QID}
                    onChange = {this.onChangeQID}
                    >
                </input>
                <br/>
                <div>
                    {this.renderChoices()}
                </div>
                <br/>
                <hr/>
            </form>
        </div>)
    }
}