import axios from 'axios';

import { REQUEST, SUCCESS, FAILURE } from '../utils/action-type.util';

export const ACTION_TYPES = {
  CHANGE_PASSWORD: 'account/CHANGE_PASSWORD',
  RESET_PASSWORD_INIT: 'account/RESET_PASSWORD_INIT',
  RESET_PASSWORD_FINISH: 'account/RESET_PASSWORD_FINISH',
  ACTIVIT_EXAM: 'account/ACTIVIT_EXAM',
  EXAM_HISTORY: 'account/EXAM_HISTORY',
  HISTORY_PAYMENT: 'account/HISTORY_PAYMENT',
  RESET: 'account/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null as string,
  result: false,
  examHistory: [],
  examActivity: [],
  paymentHistory: []
};

export type AccountState = Readonly<typeof initialState>;

// Reducer
export default (state: AccountState = initialState, action): AccountState => {
  switch (action.type) {
    // REQUEST
    case REQUEST(ACTION_TYPES.CHANGE_PASSWORD):
    case REQUEST(ACTION_TYPES.RESET_PASSWORD_INIT):
    case REQUEST(ACTION_TYPES.RESET_PASSWORD_FINISH):
    case REQUEST(ACTION_TYPES.ACTIVIT_EXAM):
    case REQUEST(ACTION_TYPES.EXAM_HISTORY):
    case REQUEST(ACTION_TYPES.HISTORY_PAYMENT):
      return {
        ...state,
        loading: true
      };
    // FAILURE
    case FAILURE(ACTION_TYPES.CHANGE_PASSWORD):
    case FAILURE(ACTION_TYPES.RESET_PASSWORD_INIT):
    case FAILURE(ACTION_TYPES.RESET_PASSWORD_FINISH):
    case FAILURE(ACTION_TYPES.ACTIVIT_EXAM):
    case FAILURE(ACTION_TYPES.EXAM_HISTORY):
    case FAILURE(ACTION_TYPES.HISTORY_PAYMENT):
      return {
        ...state,
        loading: false,
        errorMessage: action.payload
      };
    // SUCCESS
    case SUCCESS(ACTION_TYPES.CHANGE_PASSWORD):
    case SUCCESS(ACTION_TYPES.RESET_PASSWORD_INIT):
    case SUCCESS(ACTION_TYPES.RESET_PASSWORD_FINISH):
      return {
        ...state,
        loading: false,
        result: true
      };
    case SUCCESS(ACTION_TYPES.EXAM_HISTORY):
        return {
          ...state,
          loading: false,
          examHistory: action.payload.data
        };
    case SUCCESS(ACTION_TYPES.ACTIVIT_EXAM):
      return {
        ...state,
        loading: false,
        examActivity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.HISTORY_PAYMENT):
        return {
          ...state,
          loading: false,
          paymentHistory: action.payload.data
      };
    default:
      return state;
  }
};

// Actions
export const handlePasswordResetInit = mail => ({
  type: ACTION_TYPES.RESET_PASSWORD_INIT,
  // If the content-type isn't set that way, axios will try to encode the body and thus modify the data sent to the server.
  payload: axios.post(`api/account/reset-password/init`, mail, { headers: { ['Content-Type']: 'text/plain' } }),
  meta: {
    successMessage: 'Check your emails for details on how to reset your password.',
    errorMessage: `Email address isn't registered! Please check and try again`
  }
});

export const handlePasswordResetFinish = (key, newPassword) => ({
  type: ACTION_TYPES.RESET_PASSWORD_FINISH,
  payload: axios.post(`api/account/reset-password/finish`, { key, newPassword }),
  meta: {
    successMessage: 'Your password has been reset.'
  }
});

export const changePassword = (password) => ({
  type: ACTION_TYPES.CHANGE_PASSWORD,
  payload: axios.post(`api/account/change-password`, {newPassword: password}),
  meta: {
    successMessage: 'Your password has been changed.'
  }
});

export const getExamHistory = (examTypeId) => ({
  type: ACTION_TYPES.EXAM_HISTORY,
  payload: axios.get(`api/exams-history?id=${examTypeId}`),
});

export const getExamActivity = () => ({
  type: ACTION_TYPES.ACTIVIT_EXAM,
  payload: axios.get(`api/account/exam-history`),
});


export const getPaymentHistory = () => ({
  type: ACTION_TYPES.HISTORY_PAYMENT,
  payload: axios.get(`api/account/payment-history`),
});

