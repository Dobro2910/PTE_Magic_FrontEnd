import axios from 'axios';
import { getAccessControlList } from 'src/reducers/acl';
import { REQUEST, SUCCESS, FAILURE } from '../utils/action-type.util';

export const ACTION_TYPES = {
  GET_ALL: 'mock_test/GET_ALL_EXAM',
  SCORE: 'mock_test/SCORE',
  // CREATE: 'device/CREATE',
  // UPDATE: 'device/UPDATE',
  // DELETE: 'device/DELETE',
};


const initialState = {
  loading: false,
  errorMessage: null as string,
  successMessage: null,
  mockTests: [], // as ReadonlyArray<IPteExamType>,
};

export type MockTestState = Readonly<typeof initialState>;

// Reducer
export default (state: MockTestState = initialState, action): MockTestState => {
  switch (action.type) {
    // REQUEST
    case REQUEST(ACTION_TYPES.GET_ALL):
    case REQUEST(ACTION_TYPES.SCORE):
      return {
        ...state,
        loading: true
      };
    // FAILURE
    case FAILURE(ACTION_TYPES.GET_ALL):
    case FAILURE(ACTION_TYPES.SCORE):
      return {
        ...state,
        loading: false,
        errorMessage: action.payload
      };
    // SUCCESS
    case SUCCESS(ACTION_TYPES.GET_ALL): {
      return {
        ...state,
        loading: false,
        mockTests: action.payload.data
      };
    }
    case SUCCESS(ACTION_TYPES.SCORE): {
      return {
        ...state,
        loading: false
      };
    }
    default:
      return state;
  }
};

export const getAll = () => async (dispatch) => {
  await dispatch({
    type: ACTION_TYPES.GET_ALL,
    payload: axios.get(`/api/get-exam-by-types/MOCK_TEST_FULL`)
  });
};

export const scoreMock = (examId) => async (dispatch) => {
  await dispatch({
    type: ACTION_TYPES.SCORE,
    payload: axios.get(`/api/test/score-exam/${examId}`)
  });

  dispatch(getAll());
  dispatch(getAccessControlList());
};


// export const saveOrUpdate = (data, device_type?) => async (dispatch) => {
//   if (data._id) {
//     await dispatch({
//       type: ACTION_TYPES.UPDATE,
//       payload: axios.put(`/api/devices/update/${data._id}`, data)
//     });
//   } else {
//     await dispatch({
//       type: ACTION_TYPES.CREATE,
//       payload: axios.post('/api/devices/create', data)
//     });
//   }
//   dispatch(getAll(device_type));
// }

// export const remove = (id, device_type) => async (dispatch) => {
//   const requestUrl = `/api/devices/${id}`;
//   const result = await dispatch({
//     type: ACTION_TYPES.DELETE,
//     payload: axios.delete(requestUrl)
//   });
//   dispatch(getAll(device_type));
//   return result;
// }