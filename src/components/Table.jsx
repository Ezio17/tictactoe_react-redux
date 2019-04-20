import React from 'react'
import { connect } from 'react-redux';

class Table extends React.Component {
  constructor(props) {
    super(props)

    this.xIndex = []
    this.oIndex = []

    this.handleMove = this.handleMove.bind(this)
    this.win = this.win.bind(this);
  }

  handleMove(index) {
    const { whoMove, cells, winner, count } = this.props;

    let copyCells = [...cells];

    if (copyCells[index] !== null || winner) {
      return;
    }

    if (count % 2 === 0) {
      copyCells[index] = 'X'
      this.xIndex.push(index)

    } else if (count % 2 === 1) {
      copyCells[index] = 'O'
      this.oIndex.push(index)
    }

    let counter = count + 1

    whoMove(copyCells, counter)
    this.win(this.xIndex, this.oIndex)
  }

  win(x, o) {
    const winComination = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

    const { isWinner } = this.props

    for (let win of winComination) {
      if (win.every(winner => x.includes(winner))) {
        isWinner()

      } else if (win.every(winner => o.includes(winner))) {
        isWinner()

      } else if (this.props.count === 8) {
        isWinner('draw')
      }
    }
  }

  render() {
    const { cells } = this.props
    return (
      <div className="table">
        {cells.map((item, index) => (
          <div
            key={index}
            className="cells"
            data-index={index}
            onClick={() => this.handleMove(index)}
          >
            {item}
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = ({ cells, count, isWinner }) =>
  ({ cells, count, winner: isWinner })

const mapDispatchToProps = dispatch => {
  return {
    whoMove(cells, count) {
      dispatch({ type: 'MOVE', payload: { cells, count } })
    },
    isWinner(result = true) {
      dispatch({ type: 'WINNER', payload: result })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table)