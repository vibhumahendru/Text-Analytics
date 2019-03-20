let initialState = {

  sortBy: "char",
  inputVal: ""
}

function reducer(state=initialState, action) {
  switch (action.type) {
    case "CHANGE_HELLO":
        return{...state, hello:action.payload}
    case 'CHANGE_SORTBY':
        return{...state, sortBy:action.payload}
    case 'CHANGE_INPUT':
        return{...state, inputVal:action.payload}

    default: return state

  }
}

export default reducer
