import React, { Component } from 'react';
import logo from './logo.svg';
import ReactChartkick, { LineChart, PieChart, ColumnChart } from 'react-chartkick'
import Chart from 'chart.js'
import './App.css';
import {connect} from 'react-redux'
import SampleText from './SampleText'

ReactChartkick.addAdapter(Chart)

class App extends Component {

  state={
    inputVal: null,
    chartArray:[]
  }

  nameAr = ["vibhu mahendru", "checklist", "hello"]

  handleInput=(event)=>{
    this.props.changeInputVal(event.target.value)
    if (this.props.sortBy === "char") {
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

    else {
      let wordAr = event.target.value.split(" ")
    let sortObj = {}
    wordAr.forEach((el)=> {
      if (el!== "") {
        sortObj[el]=0
      }
    })

    wordAr.forEach((el)=>{
      if (el!=="") {
        sortObj[el] += 1
      }

    })
    let chartWordAr = []
    for(var key in sortObj){
      let elementAr = []
      elementAr.push(key)
      elementAr.push(sortObj[key])
      chartWordAr.push(elementAr)
    }
    chartWordAr.sort(function(a,b) {
      return b[1]-a[1]
    });
    console.log(chartWordAr);
    this.setState({
      chartArray:chartWordAr.slice(0,20)
    })
    }
  }

  handleWordSort = (string)=> {
      let wordAr = string.toLowerCase().split(" ")
    let sortObj = {}
    wordAr.forEach((el)=> {
      if (el!== "") {
        sortObj[el]=0
      }
    })

    wordAr.forEach((el)=>{
      if (el!=="") {
        sortObj[el] += 1
      }

    })
    let chartWordAr = []
    for(var key in sortObj){
      let elementAr = []
      elementAr.push(key)
      elementAr.push(sortObj[key])
      chartWordAr.push(elementAr)
    }
    chartWordAr.sort(function(a,b) {
      return b[1]-a[1]
    });
    console.log(chartWordAr);
    this.setState({
      chartArray:chartWordAr.slice(0,20)
    })
  }

  handleCharSort = (string)=> {
    let lowCaseString = string.toLowerCase()
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

  handleChangeSorter=(event)=>{
    this.props.changeSortBy(event.target.value)
    if (this.props.sortBy === "char") {
      this.handleWordSort(this.props.inputVal)
    }
    else {this.handleCharSort(this.props.inputVal)}

    // {this.props.sortBy === "char" ? <input onChange={(event)=>this.handleInput(event)} type="textarea"></input>: <input onChange={(event)=>this.handleWordSort(event)} type="textarea"></input>  }

  }

  handleUpdateVal=(event)=>{
    this.props.changeInputVal(event.target.value)
    this.handleSort()
  }

  handleSort=()=>{
    if (this.props.sortBy === "char") {
        this.handleInput(this.props.inputVal)
    }

    if (this.props.sortBy === "word") {
        this.handleWordSort(this.props.inputVal)
    }

  }

  handleSampleText=(string)=>{
    this.props.changeInputVal(string)
    if (this.props.sortBy === "char") {
      this.handleCharSort(string)
    }
    else {this.handleWordSort(string)}

  }

  render() {
    
    return (
      <>
      <nav>
        <div className="navbar">
          <h3 className="nav-item">Help</h3>
          <h3 className="nav-item">Why</h3>
        </div>
      </nav>
      <div className="main-bar">
        <div className="chart-box">
            <input value={this.props.inputVal} type="text" onChange={(event)=>this.handleInput(event)}></input>
            <button onClick={this.handleSort}>sort</button>
            <select onChange={(event)=> this.handleChangeSorter(event)}>
              <option>char</option>
              <option>word</option>
            </select>
            <ColumnChart id="users-chart" width="600px" height="300px" data={this.state.chartArray} />
            <LineChart width="600px" height="300px" data={this.state.chartArray} />
        </div>
          <div className="sample-text">
          <h3>Sample Texts</h3>
          <ol>{this.nameAr.map((name)=> <li><SampleText handleSampleText={this.handleSampleText} name={name}/></li>)}</ol>
          </div>
      </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    sortBy: state.sortBy,
    inputVal: state.inputVal

  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeHello: (string)=> dispatch({type: 'CHANGE_HELLO', payload: string}),
    changeSortBy: (sortType)=> dispatch({type: 'CHANGE_SORTBY', payload: sortType}),
    changeInputVal: (input)=> dispatch({type: "CHANGE_INPUT", payload: input})

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
