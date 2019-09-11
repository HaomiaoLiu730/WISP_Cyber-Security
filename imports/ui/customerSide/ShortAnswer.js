import React , {Component} from "react"
import ReactDOM from "react-dom"

export default class ShortAnswer extends Component{
    constructor(){
        super()
        this.state = {
            question : "",
            answer : ""
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event){
        this.setState({
            [event.target.name] : event.target.value
        })
        this.props.changeAnswer(event.target.value)
        this.props.changeQuestion(this.props.question)
    }

    render(){
        return(
            <div>
                <h1>{this.props.question}</h1>
                <form>
                    <input 
                        type = "text" 
                        name = "answer"
                        value = {this.state.answer}
                        onChange = {this.handleChange}
                        placeholder = "enter your answer here"
                    />
                </form>           
            </div>

        )
    }
}