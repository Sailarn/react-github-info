import {createContext} from 'react';
import initialState from './initialState';

const StateContext = createContext({
  initialState,
  setListSpinner: () => {},
  setCardSpinner: () => {},
  setOpenList: () => {},
  setReposLinks: () => {
  },
  setUserInfo: () => {
  },
  setInputName: () => {
  },
});

export {StateContext};
