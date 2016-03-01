
const EventsStore = require('../stores/MainStore')
const ReactDOM = require('react-dom')
const React = require('react')

class Main extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    return (
        <div>
          {{basename}} !
        </div>
      )
  }
}

module.exports = Main
