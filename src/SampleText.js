import React, { Component } from 'react';
import {connect} from 'react-redux'
class SampleText extends Component {

  render() {
  
    return (
      <button onClick={()=>this.props.handleSampleText(this.props.name)}>{this.props.name}</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(SampleText);
