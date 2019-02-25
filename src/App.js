import React, { Component } from 'react';
import logo from './logo.svg';
import ReactChartkick, { LineChart, PieChart, ColumnChart } from 'react-chartkick'
import Chart from 'chart.js'
import './App.css';

ReactChartkick.addAdapter(Chart)

class App extends Component {

  state={
    inputVal: null,
    chartArray:[]
  }

  handleInput=(event)=>{

    let lowCaseString = event.target.value.toLowerCase()
    let charAr = [...lowCaseString]
    let charObj={}
    let chartAr = []

      charAr.forEach((char) => {
        if(char !== " "){
        charObj[char] = 0
          }
      })
      charAr.forEach((char)=>{
        if(char !== " "){
        charObj[char] += 1
          }
      })

      for(var key in charObj){
        let elementAr = []
        elementAr.push(key)
        elementAr.push(charObj[key])
        chartAr.push(elementAr)
      }

      chartAr.sort(function(a,b) {
        return b[1]-a[1]
      });

      this.setState({
        chartArray:chartAr
      })
  }


  // handleSort=()=>{
  //   let lowCaseString = this.state.inputVal.toLowerCase()
  //   let charAr = [...lowCaseString]
  //   let charObj={}
  //   let chartAr = []
  //
  //     charAr.forEach((char) => {
  //       if(char !== " "){
  //       charObj[char] = 0
  //         }
  //     })
  //     charAr.forEach((char)=>{
  //       if(char !== " "){
  //       charObj[char] += 1
  //         }
  //     })
  //
  //     for(var key in charObj){
  //       let elementAr = []
  //       elementAr.push(key)
  //       elementAr.push(charObj[key])
  //       chartAr.push(elementAr)
  //     }
  //     this.setState({
  //       chartArray:chartAr
  //     })
  //
  // }

  render() {
    return (
      <div className="App">
      <input onChange={(event)=>this.handleInput(event)} type="text"></input>
      <button onClick={this.handleSort}>sort</button>
      <ColumnChart data={this.state.chartArray} />
      </div>
    );
  }
}

export default App;
