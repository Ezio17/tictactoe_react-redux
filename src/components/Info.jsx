import React from 'react'
import { connect } from 'react-redux';

const Info = ({ count, winner }) => {
  let gameResult = ''
  if (winner === 'draw') {
    gameResult = 'Ничья'
  } else if (winner) {
    gameResult = `Победил: ${count % 2 === 0 ? 'O' : 'X'}`
  }
  else if (!winner) {
    gameResult = `Ход: ${count % 2 === 0 ? 'X' : 'O'}`
  }

  return <h1 className="info">{gameResult}</h1>
}

const mapStateToProps = state => ({
  count: state.count,
  winner: state.isWinner
})

export default connect(mapStateToProps)(Info)