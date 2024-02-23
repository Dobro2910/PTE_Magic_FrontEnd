import axios from 'axios';

import { REQUEST, SUCCESS, FAILURE } from 'src/utils/action-type.util';

export const ACTION_TYPES = {
  FETCH_QUESTION_BY_TYPE_LIST: 'question/FETCH_QUESTION_BY_TYPE_LIST',
  FETCH_QUESTION_REPEATED_BY_TYPE_LIST: 'question/FETCH_QUESTION_REPEATED',
  RESET: 'question/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  updating: false,
  updateSuccess: false,
  questions: [] as ReadonlyArray<any>,
  question: null,
  questionsRepeated: [] as ReadonlyArray<any>,
  totalItems: 0,
  totalItemsRepeated: 0,
};

export type QuestionState = Readonly<typeof initialState>;

// Reducer

export default (state: QuestionState = initialState, action): QuestionState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_QUESTION_BY_TYPE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_QUESTION_REPEATED_BY_TYPE_LIST):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case FAILURE(ACTION_TYPES.FETCH_QUESTION_BY_TYPE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_QUESTION_REPEATED_BY_TYPE_LIST):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_QUESTION_BY_TYPE_LIST):
      return {
        ...state,
        loading: false,
        questions: action.payload.data,
        totalItems: action.payload.headers['x-total-count']
      };
    case SUCCESS(ACTION_TYPES.FETCH_QUESTION_REPEATED_BY_TYPE_LIST):
      return {
        ...state,
        loading: false,
        questions: action.payload.data,
        questionsRepeated: action.payload.data, 
        totalItemsRepeated: action.payload.headers['x-total-count']
      }
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiGetQuestionByTypeUrl = 'api/questions-by-type';

// Actions
export const getQuestionByType = (page, size, sort, type) => {
  const requestUrl = `${apiGetQuestionByTypeUrl}?page=${page}&size=${size}&sort=${sort}&type=${type}`;
  return {
    type: ACTION_TYPES.FETCH_QUESTION_BY_TYPE_LIST,
    payload: axios.get(requestUrl)
  };
};

export const getQuestionByTypeAsync = async (page, size, sort, type) => {
  const requestUrl = `${apiGetQuestionByTypeUrl}?page=${page}&size=${size}&sort=${sort}&type=${type}`;
  const result = await axios.get(requestUrl);
  return result.data;
};

export const getQuestionRepeatedByType = (page, size, sort, type) => {
  const requestUrl = `api/questions-repeated-by-type?page=${page}&size=${size}&sort=${sort}&type=${type}`;
  return {
    type: ACTION_TYPES.FETCH_QUESTION_REPEATED_BY_TYPE_LIST,
    payload: axios.get(requestUrl)
  };
};

export const getEntities = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_QUESTION_BY_TYPE_LIST,
  payload: axios.get(`${apiGetQuestionByTypeUrl}?cacheBuster=${new Date().getTime()}`)
});

export const resetQuestion = () => ({
  type: ACTION_TYPES.RESET
});