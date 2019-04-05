const game = {
  cells: Array(9).fill(null),
  move: 'X',
  info: 'Ход: X',
  count: 0,
}

const move = (state = game, action) => {
  switch (action.type) {
    case 'MOVE':
      return {
        ...state,
        move: action.payload.move,
        cells: action.payload.cells,
        count: action.payload.count
      }
    case 'INFO':
      return {
        ...state,
        info: action.payload,
      }

    default:
      return state
  }
}

export default move