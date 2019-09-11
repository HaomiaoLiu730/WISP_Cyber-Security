import React, {Component} from "react"
import ReactDOM from "react-dom"

export default class MultipleChoice extends Component{
    constructor(props){
        super(props)
        this.state = {
            qText : this.props.question,
            QID : this.props.QID,
        }
        this.onChangeQID = this.onChangeQID.bind(this)
        this.onChangeqText = this.onChangeqText.bind(this)
    }

    onChangeqText(event){
        this.setState({
            qText : event.target.value
        })
        this.props.changeqText(this.props.QNindex, event.target.value)
    }

    onChangeQID(event){
        this.setState({
            QID : event.target.value
        })
        this.props.changeQID(this.props.QNindex,event.target.value)
    }

    render(){
        return(
        <div>
            <form>
                <label className = "prompt"> Questions: 
                    <input
                        type = "textarea"
                        name ='question'
                        className = 'question'
                        value = {this.state.qText}
                        onChange = {this.onChangeqText}
                        >
                    </input> 
                </label>
                <br/>
                <label className = "prompt"> QID: 
                    <input
                        type = "textarea"
                        name ='question'
                        className = 'question'
                        value = {this.state.QID}
                        onChange = {this.onChangeQID}
                        >
                    </input> 
                </label>
            </form>
            <br/>
            <hr/>
        </div>)

    }
}