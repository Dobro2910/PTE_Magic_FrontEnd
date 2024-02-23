import axios from 'axios';

import { REQUEST, SUCCESS, FAILURE } from '../utils/action-type.util';

export const ACTION_TYPES = {
  GET_ALL_REPEATED: 'question_bank/GET_ALL_REPEATED',
  GET_ALL: 'question_bank/GET_INFO',
  GET_ALL_AI_SCORING: 'question_bank/GET_AI_SCORING_INFO',
  // UPDATE: 'device/UPDATE',
  // DELETE: 'device/DELETE',
  RESET: 'question_bank/RESET'
};


const initialState = {
  loading: false,
  errorMessage: null as string,
  successMessage: null,
  questionBanks: [], // as ReadonlyArray<IPteExamType>,
  questionBank: null
};

export type QuestionBankState = Readonly<typeof initialState>;

// Reducer
export default (state: QuestionBankState = initialState, action): QuestionBankState => {
  switch (action.type) {
    // REQUEST
    case REQUEST(ACTION_TYPES.GET_ALL_REPEATED):
    case REQUEST(ACTION_TYPES.GET_ALL):
    case REQUEST(ACTION_TYPES.GET_ALL_AI_SCORING):
      return {
        ...state,
        loading: true
      };
    // FAILURE
    case FAILURE(ACTION_TYPES.GET_ALL_REPEATED):
    case FAILURE(ACTION_TYPES.GET_ALL):
    case FAILURE(ACTION_TYPES.GET_ALL_AI_SCORING):
      return {
        ...state,
        loading: false,
        errorMessage: action.payload
      };
    // SUCCESS
    case SUCCESS(ACTION_TYPES.GET_ALL_AI_SCORING): {
      return {
        ...state,
        loading: false,
        questionBank: action.payload.data
      };
    }
    case SUCCESS(ACTION_TYPES.GET_ALL_REPEATED):
    case SUCCESS(ACTION_TYPES.GET_ALL): {
      return {
        ...state,
        loading: false,
        questionBanks: action.payload.data
      };
    }
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export const getAll = () => async (dispatch) => {
  await dispatch({
    type: ACTION_TYPES.GET_ALL,
    payload: axios.get(`/api/questions-count-info`)
  });
};

export const getAllRepeated = () => async (dispatch) => {
  await dispatch({
    type: ACTION_TYPES.GET_ALL_REPEATED,
    payload: axios.get(`/api/questions-repeated-count-info`)
  });
};


export const getAllAiScoring = () => async (dispatch) => {
  await dispatch({
    type: ACTION_TYPES.GET_ALL_AI_SCORING,
    payload: axios.get(`/api/questions-count-info-for-score`)
  });
};

export const getQuestionCountInfoByType = async (questionType) => {
  const result = await axios.get(`/api/questions-count-info?questionType=${questionType}`)
  return result.data;
}

export const reset = () => ({
  type: ACTION_TYPES.RESET
});