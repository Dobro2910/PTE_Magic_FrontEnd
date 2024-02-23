import axios from 'axios';

import { REQUEST, SUCCESS, FAILURE } from 'src/utils/action-type.util';
import { EVENT } from 'src/config/constants';

export const ACTION_TYPES = {
  INIT_STORE: 'store/INIT_STORE',
  STORED_ANSWER: 'store/STORED_ANSWER',
  EVENT: 'store/EVENT',
  RESET_STORE: 'store/RESET',
  CLEAR_ANSWER: 'store/CLEAR_ANSWER'
};

const answerState = {
  answer: null,
  googleAnswer: null,
  audioSrc: null,
  uploadProgress: 0
};

const initialState = {
  statusRecord: null,
  loading: true,
  errorMessage: null,
  examGroup: null,
  question: null,
  gotoIndex: null,

  event: null,

  ...answerState
};

export type StoreState = Readonly<typeof initialState>;

// Reducer
export default (state: StoreState = initialState, action): StoreState => {
  switch (action.type) {
    case ACTION_TYPES.RESET_STORE:
      return {
        ...initialState
      };
    case ACTION_TYPES.EVENT:
      return {
        ...state,
        ...action.payload
      };
    case ACTION_TYPES.INIT_STORE:
        return {
          ...initialState,
          ...action.payload
        };  
    case ACTION_TYPES.STORED_ANSWER:
      return {
        // ...state,
        ...action.payload,
        loading: false,
        event: EVENT.STORED_ANSWER
      };
    case ACTION_TYPES.CLEAR_ANSWER:
      return {
        // ...state,
        ...action.payload,
        loading: false,
        event: EVENT.CLEAR_ANSWER
      };
    default:
      return state;
  }
};

export const initStore = (data) => ({
  type: ACTION_TYPES.INIT_STORE,
  payload: data
});

export const storedAnswer = (data) => (dispatch, getState) => {
  let storeAnswer = {... getState().store, ...data}
  dispatch({
      type: ACTION_TYPES.STORED_ANSWER,
      payload: storeAnswer
  })
};

export const clearAnswer = () => (dispatch, getState) => {
  let storeAnswer = {... getState().store, ...answerState}
  dispatch({
      type: ACTION_TYPES.CLEAR_ANSWER,
      payload: storeAnswer
  })
};

export const sendEvent = (event, extraData?) => dispatch => {
  let storeAnswer;
  if (extraData) {
    storeAnswer = { event, ...extraData };
  } else {
    storeAnswer = { event };
  }
  dispatch({
    type: ACTION_TYPES.EVENT,
    payload: storeAnswer
  })
};

export const storeRecordStatus = (statusRecord) => dispatch => {
  let storeAnswer = { statusRecord: statusRecord };
  dispatch({
    type: ACTION_TYPES.EVENT,
    payload: storeAnswer
  })
};

export const resetStore = () => ({
  type: ACTION_TYPES.RESET_STORE
});
