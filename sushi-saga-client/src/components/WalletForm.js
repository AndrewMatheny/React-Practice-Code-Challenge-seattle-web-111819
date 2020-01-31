import React, { Component } from 'react'

class WalletForm extends Component {

    constructor(){
        super()
        this.state = {
            currentInput: ""
        }
    }

    handleChange = (e) => {
       this.setState({
       [e.target.name]: e.target.value
       })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.addBudget(this.state.currentInput)
        this.setState({
            currentInput: ""
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} >
                <input type="text" value={this.state.currentInput} name="currentInput" onChange={(e) => this.handleChange(e)} >
                </input>
                <button type="submit">Add Funds</button>
            </form>
        )
    }
}

export default WalletForm