import React, {useReducer} from 'react';
import stateReducer from './reducer';
import {StateContext} from './context';
import initialState from './initialState';

function StateProvider(props) {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  function setUserInfo(userData) {
    dispatch({
      type: 'SET_INFO',
      payload: userData,
    });
  }

  function setInputName(name) {
    dispatch({
      type: 'SET_USERNAME',
      payload: name,
    });
  }

  function setReposLinks(array) {
    dispatch({
      type: 'SET_REPOS',
      payload: array,
    });
  }
  function setOpenList(boolean) {
    dispatch({
      type: 'SET_OPEN_LIST',
      payload: boolean,
    });
  }
  function setCardSpinner(boolean) {
    dispatch({
      type: 'SET_CARD_SPINNER',
      payload: boolean,
    });
  }

  function setListSpinner(boolean) {
    dispatch({
      type: 'SET_LIST_SPINNER',
      payload: boolean,
    });
  }

  return (
    <StateContext.Provider
      value={{
        inputName: state.inputName,
        userInfo: state.userInfo,
        reposLinks: state.reposLinks,
        open: state.open,
        cardSpinner: state.cardSpinner,
        listSpinner: state.listSpinner,
        setListSpinner,
        setCardSpinner,
        setOpenList,
        setReposLinks,
        setInputName,
        setUserInfo,
      }}
      {...props}
    />
  );
}

export default StateProvider;
