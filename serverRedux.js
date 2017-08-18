var i = 0;
var redux = require('redux');

var state = (state = {lightState: false}, action) => {
  return {
    lightState: action.payload
  }
  };
var store = redux.createStore(state);

exports.editStore = (status, type) => {
  store.dispatch({type: type,payload: status});
  return store.getState()
};