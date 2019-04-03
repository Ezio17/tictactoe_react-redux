let indexElements = {
  indexX: [],
  indexO: [],
}

const setIndex = (state = indexElements, action) => {
  switch (action.type) {
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

    default:
      return state
  }
}

export default setIndex