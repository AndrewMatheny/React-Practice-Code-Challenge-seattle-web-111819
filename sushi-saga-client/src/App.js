import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

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

  // buySushi = (selectedSushi) => {
   
  //   this.setState({
  //     budget: newBudget
  //   })
  // }

  componentDidMount(){
    this.fetchSushi()
  }


  render() {
    return (
      <div className="app">
        <SushiContainer eatSushi={this.eatSushi} fourSushi={this.state.newSushi} getFourSushi={this.getFourSushi} allSushi={this.state.allSushi}/>
        <Table plates={this.state.plates} budget={this.state.budget}/>
      </div>
    );
  }
}

export default App;