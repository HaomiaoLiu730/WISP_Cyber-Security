import React, {Component} from 'react'
import ReactDOM from 'react-dom'

export default class ScalingQuestion extends Component{
    constructor(){
        super()
        this.state = {
            question : '',
            factor : "1"
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event){
        this.setState(
            {
                [event.target.name]:event.target.value
            }
        )
    }

    render(){
        return(
            <div>
                <h1>Scaling Question</h1>
                <form>
                    <label className = "prompt">Question: On the scale of one to ten</label>
                    <br/>
                    <input 
                        type = "textarea"
                        className = 'question'
                        placeholder = "type the rest of the question here"/>
                    <br/>
                    <label>
                        <input 
                            type = "radio" 
                            name = 'factor'
                            value = "1"
                            checked = {this.state.factor === "1" }
                            onChange = {this.handleChange}/>
                        1
                    </label>
                    <label>
                        <input 
                            type = "radio" 
                            name = 'factor'
                            value = "2"
                            checked = {this.state.factor === "2" }
                            onChange = {this.handleChange}/>
                        2
                    </label>
                    <label>
                        <input 
                            type = "radio" 
                            name = 'factor'
                            value = "3"
                            checked = {this.state.factor === "3" }
                            onChange = {this.handleChange}/>
                        3
                    </label>
                    <label>
                        <input 
                            type = "radio" 
                            name = 'factor'
                            value = "4"
                            checked = {this.state.factor === "4" }
                            onChange = {this.handleChange}/>
                        4
                    </label>
                    <label>
                        <input 
                            type = "radio" 
                            name = 'factor'
                            value = "5"
                            checked = {this.state.factor === "5" }
                            onChange = {this.handleChange}/>
                        5
                    </label>
                </form>
            </div>
        )
    }
}