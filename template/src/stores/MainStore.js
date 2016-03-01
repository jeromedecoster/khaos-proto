
const Actions = require('../actions/Actions')
const Reflux = require('reflux')

var state = {
}

var MainStore = Reflux.createStore({

  listenables: Actions,

  init() {
  },

  getState() {
    return state
  }
})

module.exports = MainStore
