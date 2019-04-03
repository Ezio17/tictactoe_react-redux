import React from 'react'
import { connect } from 'react-redux';

class Button extends React.Component {
  constructor(props) {
    super(props)

    this.handleClear = this.handleClear.bind(this)
  }

  handleClear() {
    const { whoMove, addIndexX, addIndexO, info } = this.props
    const cells = Array(9).fill(null);
    const move = 'X';
    const infoAboutMove = 'Ход: X'
    const counter = 0;

    whoMove(cells, move, counter)
    info(infoAboutMove)

    const indexX = [];
    const indexO = [];

    addIndexX(indexX)
    addIndexO(indexO)
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
    whoMove(cells, move, count) {
      dispatch({ type: 'MOVE', payload: { cells, move, count } })
    },
    info(info) {
      dispatch({ type: 'INFO', payload: info })
    },
    addIndexX(arr) {
      dispatch({ type: 'ADD_INDEX_X', payload: arr })
    },
    addIndexO(arr) {
      dispatch({ type: 'ADD_INDEX_O', payload: arr })
    }
  }
}

export default connect(null, mapDispatchToProps)(Button)