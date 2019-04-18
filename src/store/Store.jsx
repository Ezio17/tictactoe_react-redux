import { createStore } from 'redux'
import { restartGame } from './reducerLogic'

const game = {
  cells: Array(9).fill(null),
  move: 'X',
  info: 'Ход: X',
  count: 0,
  indexX: [],
  indexO: [],
}

const rootReducer = (state = game, action) => {
  switch (action.type) {
    case 'MOVE':
      return {
        ...state,
        move: action.payload.move,
        cells: action.payload.cells,
        count: action.payload.count,
        info: action.payload.info
      }
    case 'INFO':
      return {
        ...state,
        info: action.payload,
      }

    case 'ADD_INDEX_X':
      return {
        ...state,
        indexX: action.payload
      }

    case 'ADD_INDEX_O':
      return {
        ...state,
        indexO: action.payload
      }

    case 'RESTART_GAME':
      return state = restartGame

    default:
      return state
  }
}

const configureStore = () => createStore(rootReducer)

export default configureStore;