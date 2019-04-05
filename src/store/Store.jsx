import { createStore, combineReducers } from 'redux'

import move from './StoreMove'
import setIndex from './StoreSetIndex'

const rootReducer = combineReducers({
  move,
  setIndex
})

const configureStore = () => createStore(rootReducer)

export default configureStore;