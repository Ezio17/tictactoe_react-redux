import React from 'react'
import { connect } from 'react-redux';

class Button extends React.Component {
  constructor(props) {
    super(props)

    this.handleClear = this.handleClear.bind(this)
  }

  handleClear() {
    this.props.restart()
  }

  render() {
    return (
      <button
        className="button"
        onClick={this.handleClear}
      >Restart Game</button>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    restart() {
      dispatch({ type: 'RESTART_GAME' })
    },
  }
}

export default connect(null, mapDispatchToProps)(Button)