var redux = require('redux');

var state = (state = {lightState: false}, action) => {
  return {
    lightState: action.payload
  }
  };
var store = redux.createStore(state);
store.subscribe(() => {
  console.log(store.getState())
});

exports.getState = () => {
  return store.getState();
};

exports.editStore = (status, type) => {
  store.dispatch({type: type,payload: status});
  return store.getState()
};