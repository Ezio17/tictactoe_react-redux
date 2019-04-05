import React from 'react'
import { connect } from 'react-redux';

class Table extends React.Component {
  constructor(props) {
    super(props)

    this.handleMove = this.handleMove.bind(this)
    this.win = this.win.bind(this);
  }

  handleMove(index) {
    const { whoMove, move, indexX, indexO, cells,
      addIndexX, addIndexO, info, moveInfo, count } = this.props;

    let copyCells = [...cells];
    let copyIndexX = [...indexX];
    let copyIndexO = [...indexO];

    if (copyCells[index] !== null
      || moveInfo === 'Победил: X'
      || moveInfo === 'Победил: O'
    ) {
      return;
    }

    let element = ''
    let infoAboutMove = ''

    if (move === 'X') {
      copyCells[index] = 'X'
      element = 'O'
      copyIndexX = [...copyIndexX, index]
      infoAboutMove = 'Ход: О'
      addIndexX(copyIndexX)

    } else if (move === 'O') {
      copyCells[index] = 'O'
      element = 'X'
      copyIndexO = [...copyIndexO, index]
      infoAboutMove = 'Ход: X'
      addIndexO(copyIndexO)
    }

    let counter = count + 1

    whoMove(copyCells, element, counter)
    info(infoAboutMove)
    this.win(copyIndexX, copyIndexO)
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

    for (let win of winComination) {
      const { info } = this.props
      if (win.every(winner => x.includes(winner))) {
        info('Победил: X')
        return;

      } else if (win.every(winner => o.includes(winner))) {
        info('Победил: O')

      } else if (this.props.count === 8) {
        info('Ничья')
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

const mapStateToProps = state => ({
  cells: state.move.cells,
  move: state.move.move,
  indexX: state.setIndex.indexX,
  indexO: state.setIndex.indexO,
  moveInfo: state.move.info,
  count: state.move.count,
})

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

export default connect(mapStateToProps, mapDispatchToProps)(Table)