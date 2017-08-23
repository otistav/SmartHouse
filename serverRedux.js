var redux = require('redux');
var db = require('./models');

var state = (state = {}, action) => {

  return Object.assign({}, state, action.payload);

};

var store = redux.createStore(state);

exports.getState = () => {
  return store.getState();
};

exports.subscribe = (cb) =>  {
  let prevState;
  store.subscribe(() => {
    const state = store.getState();
    if (prevState !== state) {
      prevState = state;
      cb(state)
    }
  })
};

function isChanged(newProps, prevState) {
  for (let item in newProps) {
    if (prevState === undefined)
      return true
    if (newProps[item] !== prevState[item.toString()]){
      return true
    }

  }
  return false

}

exports.subscribeDeviceChanges = (cb) => {
  let prevState = {};
  store.subscribe(() => {
    db.device.findAll().then(devices => {
      devices.forEach(device => {
        if (device.propFunction !== ''){
          let func = new Function('state', device.propFunction);
          const state = store.getState();
          const newProps = func(state);
          if (isChanged(newProps, prevState[(device.id).toString()], device)) {
            cb(device.id, newProps)
          }
          console.log("this is prevstate", prevState);

          // Object.assign(prevState, {[device.id]: newProps});
          prevState[device.id] = newProps;
        }

      })
    })
  })
};

exports.dispatchActionFromDevice = (data) => {
  return db.rule.findAll({where: {sourceID: data.id, sourceType: 'device'}}).then((rules) => {
    rules.forEach(rule => {
      let func = new Function('device', 'payload', 'state', rule.func);
      let result = func(data.device, data.payload, store.getState());
      store.dispatch({type: '', payload: result})
    })
  })
  // store.dispatch({type: '', payload: data.payload})
};

exports.dispatchActions = (id, element, event, payload) => {
  return db.rule.findAll({where: {sourceID: id, sourceType: 'control'} }).then((rules) => {
    rules.forEach(item => {
      let func = new Function('item', 'event', 'payload', 'state', item.func);
      let result = func(element, event, payload, store.getState());
      console.log("Dispatch");
      store.dispatch({type: '',payload:result});
    })
  })
};