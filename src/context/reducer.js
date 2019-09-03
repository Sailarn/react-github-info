function stateReducer(state, action) {
  switch (action.type) {
    case 'SET_INFO':
      return {
        ...state,
        userInfo: action.payload,
      };
    case 'SET_USERNAME':
      return {
        ...state,
        inputName: action.payload,
      };
    case 'SET_REPOS':
      return {
        ...state,
        reposLinks: action.payload,
      };
    case 'SET_OPEN_LIST':
      return {
        ...state,
        open: action.payload,
      };
    case 'SET_CARD_SPINNER':
      return {
        ...state,
        cardSpinner: action.payload,
      };
    case 'SET_LIST_SPINNER':
      return {
        ...state,
        listSpinner: action.payload,
      };
    default:
      return state;
  }
}

export default stateReducer;
