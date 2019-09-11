import React , {Component} from "react"
import ReactDOM from "react-dom"

export default class MultipleChoice extends Component{
    constructor(){
        super()
        this.state = {
            question: '',
            options : [] ,
            answer : ""
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event){
        this.props.changeNextQID(event.target.name)
        this.setState({
            answer : event.target.value
        })
        this.props.changeAnswer(event.target.value)
        this.props.changeQuestion(this.props.question)
    }

    renderOptions(){
        return(
            this.props.options.map(
                (option , index) => {
                    return (
                        <div>
                            <label>
                                <input 
                                    type="radio" 
                                    name = {option.nextQNo}
                                    checked = {this.state.answer === option.textDesc}
                                    value = {option.textDesc}
                                    onChange = {this.handleChange}
                                />
                                {option.textDesc}
                            </label>
                            <br/>
                        </div>
                    )
                }
            )
        )
    }

    render(){
        return(
            <div>
                <h1>{this.props.question}</h1>
                <form>
                    {this.renderOptions()}
                </form>
            </div>
        )
    }
}