import React from 'react';
import { connect } from 'react-redux';

class Table extends React.Component {
  constructor(props) {
    super(props);

    this.handleMove = this.handleMove.bind(this);
    this.win = this.win.bind(this);
  }

  handleMove(index) {
    const { whoMove, cells, winner, count, setOIndex, setXIndex } = this.props;

    let copyCells = [...cells];

    if (copyCells[index] !== null || winner) {
      return;
    }

    if (count % 2 === 0) {
      copyCells[index] = 'X';
      setXIndex(index);
    } else if (count % 2 === 1) {
      copyCells[index] = 'O';
      setOIndex(index);
    }

    let counter = count + 1;

    whoMove(copyCells, counter);
  }

  componentDidUpdate() {
    this.win();
  }

  win() {
    const { xIndex, oIndex } = this.props;

    const winComination = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    const { isWinner } = this.props;

    for (let win of winComination) {
      if (win.every(winner => xIndex.includes(winner))) {
        isWinner();
        return;
      } else if (win.every(winner => oIndex.includes(winner))) {
        isWinner();
        return;
      } else if (this.props.count === 9 && !win.every(winner => xIndex.includes(winner))) {
        isWinner('draw');
      }
    }
  }

  render() {
    const { cells } = this.props;
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
    );
  }
}

const mapStateToProps = ({ cells, count, isWinner, xIndex, oIndex }) => ({
  cells,
  count,
  winner: isWinner,
  xIndex,
  oIndex,
});

const mapDispatchToProps = dispatch => {
  return {
    whoMove(cells, count) {
      dispatch({ type: 'MOVE', payload: { cells, count } });
    },
    isWinner(result = true) {
      dispatch({ type: 'WINNER', payload: result });
    },
    setXIndex(index) {
      dispatch({ type: 'ADD_X', payload: index });
    },
    setOIndex(index) {
      dispatch({ type: 'ADD_O', payload: index });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Table);
