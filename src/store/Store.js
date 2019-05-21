import { createStore } from 'redux';
import { restartGame } from './reducerLogic';

const game = {
  cells: Array(9).fill(null),
  count: 0,
  isWinner: false,
  xIndex: [],
  oIndex: [],
};

const rootReducer = (state = game, action) => {
  switch (action.type) {
    case 'MOVE':
      const { cells, count } = action.payload;
      return {
        ...state,
        cells,
        count,
      };

    case 'RESTART_GAME':
      return (state = restartGame);

    case 'WINNER':
      return {
        ...state,
        isWinner: action.payload,
      };

    case 'ADD_X':
      return {
        ...state,
        xIndex: [...state.xIndex, action.payload],
      };

    case 'ADD_O':
      return {
        ...state,
        oIndex: [...state.oIndex, action.payload],
      };

    default:
      return state;
  }
};

const configureStore = () => createStore(rootReducer);

export default configureStore;
