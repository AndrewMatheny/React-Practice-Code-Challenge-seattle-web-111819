import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';
import WalletForm from './components/WalletForm'

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {
  
  state = {
    allSushi: [],
    newSushi: [],
    counter: 0,
    plates: [],
    budget: 50
  }
  
  fetchSushi = () => {
    fetch(API)
    .then(res => res.json())
    .then(data => {this.setState({
      allSushi: data
    })})
    .then(() => this.getFourSushi())
  }

  getFourSushi = () => {
    let fourSushi = this.state.allSushi.slice(this.state.counter, this.state.counter + 4)
    if(fourSushi.length < 4) {
      this.setState({
        counter: 0
      })

    }
    this.setState(PrevState => ({
      newSushi: fourSushi,
      counter: PrevState.counter += 4
    }))
  }


  eatSushi = (selectedSushi) => {
    // this.buySushi(selectedSushi)
    let newBudget = this.state.budget - selectedSushi.price
    if(newBudget >= 0) {
      let currentSushi = this.state.newSushi.filter(sushi => {
        return sushi.id !== selectedSushi.id
      })
      console.log(typeof newBudget)
      let newAllSushi = this.state.allSushi.filter(sushi => sushi.id !== selectedSushi.id)
      this.setState(PrevState => ({
        newSushi: currentSushi,
        allSushi: newAllSushi,
        plates: [...PrevState.plates, "empty plate"],
        budget: newBudget
      }))
    } else {
      alert("YOU ARE BROKE!")
    }
  }

  addBudget = (amount) => {
    console.log(typeof amount)
    let integerAmount = parseInt(amount)
    if(!isNaN(integerAmount)){
      console.log(typeof integerAmount)
      this.setState(PrevState => ({
        budget: (PrevState.budget + integerAmount)
      }))
    } else {
      alert("Stop trying to break the program.  Type a number please.")
    }
  }


  componentDidMount(){
    this.fetchSushi()
  }


  render() {
    return (
      <div className="app">
        <SushiContainer eatSushi={this.eatSushi} fourSushi={this.state.newSushi} getFourSushi={this.getFourSushi} allSushi={this.state.allSushi}/>
        <Table plates={this.state.plates} budget={this.state.budget}/>
        <WalletForm addBudget={this.addBudget}/>
      </div>
    );
  }
}

export default App;