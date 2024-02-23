import axios from 'axios';

import { cleanEntity } from 'src/utils/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'src/utils/action-type.util';

export const ACTION_TYPES = {
  EXAM_DETAIL: 'exam/EXAM_DETAIL',
  FINISH_EXAM: 'exam/FINISH_EXAM',
  FETCH_EXAM_INFO: 'exam/FETCH_EXAM_INFO',
  SAVE_ANSWER: 'exam/SAVE_ANSWER',
  FETCH_RESUME_EXAM: 'exam/FETCH_RESUME_EXAM',
  RESET: 'exam/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  updating: false,
  updateSuccess: false,
  examInfos: [] as ReadonlyArray<any>,
  examInfo: null,
  answer: null,
  recorderLink: null
};

export type ExamState = Readonly<typeof initialState>;

// Reducer

export default (state: ExamState = initialState, action): ExamState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.EXAM_DETAIL):
    case REQUEST(ACTION_TYPES.FETCH_EXAM_INFO):
    case REQUEST(ACTION_TYPES.FETCH_RESUME_EXAM):
    case REQUEST(ACTION_TYPES.SAVE_ANSWER):
    case REQUEST(ACTION_TYPES.FINISH_EXAM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case FAILURE(ACTION_TYPES.EXAM_DETAIL):
    case FAILURE(ACTION_TYPES.FETCH_RESUME_EXAM):
    case FAILURE(ACTION_TYPES.FETCH_EXAM_INFO):
    case FAILURE(ACTION_TYPES.SAVE_ANSWER):
    case FAILURE(ACTION_TYPES.FINISH_EXAM):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_RESUME_EXAM):
    case SUCCESS(ACTION_TYPES.FETCH_EXAM_INFO):
    case SUCCESS(ACTION_TYPES.EXAM_DETAIL):
      return {
        ...state,
        loading: false,
        examInfo: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.SAVE_ANSWER):
      return {
        ...state,
        loading: false,
        answer: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FINISH_EXAM):
      return {
        ...state,
        loading: false
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiStartExam = 'api/start-exam-test';
const apiStartMockTest = 'api/start-exam';
const apiResumeMockTest = 'api/resume-exam';
const apiSaveAnswer = 'api/answers';
const apiUpload = '/api/file/upload/answer';
const apiFinishExam = 'api/finish-exam';
const apiExamDetail = 'api/exams';
const apiResetExam = 'api/reset-exam';

export const getExamDetail = id => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.EXAM_DETAIL,
    payload: axios.get(`${apiExamDetail}/${id}`)
  });
  return result;
};

export const finishExam = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.FINISH_EXAM,
    payload: axios.post(apiFinishExam, cleanEntity(entity))
  });
  return result;
};

export const startMockTest = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.FETCH_EXAM_INFO,
    payload: axios.post(apiStartMockTest, cleanEntity(entity))
  });
  return result;
};

export const resumeMockTest = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.FETCH_RESUME_EXAM,
    payload: axios.post(apiResumeMockTest, entity)
  });
  return result;
};

export const startExam = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.FETCH_EXAM_INFO,
    payload: axios.post(apiStartExam, cleanEntity(entity))
  });
  return result;
};

export const saveAnswer = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.SAVE_ANSWER,
    payload: axios.post(apiSaveAnswer, cleanEntity(entity))
  });
  return result;
};

export const uploadRecorder = (filename: string, blob: Blob) => async (dispatch: Response) => {
  let file = new File([blob], filename);

  // Get signed_url
  let signedData = {
    type: 'answer',
    contentType: 'audio/flac', // file.type
    filename: file.name
  };
  let signedResponse = await axios.post('api/file/signed_url', signedData);
  const signedUrl = signedResponse.data.signedUrl;

  const result = await fetch(signedUrl, {
    method: 'PUT',
    headers: { 'Access-Control-Allow-Origin': '*', 'content-type': 'audio/flac' },
    body: file
  });

  return result;
};

export const resetExam = entity => async dispatch => {
  await dispatch({
    type: ACTION_TYPES.RESET,
    payload: axios.post('api/reset-exam', cleanEntity(entity))
  });
};



export const saveExamProgress = async (examId: number, currentQuestion: number, remainTime: number) => {
  // Get signed_url
  let data = {
    examId,
    currentQuestion,
    remainTime
  };
  await axios.post('api/answers/update_progress', data);
};