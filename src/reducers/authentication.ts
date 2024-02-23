import axios from 'axios';

import { REQUEST, SUCCESS, FAILURE } from '../utils/action-type.util';
import { AUTH_TOKEN_KEY } from '../config/constants';
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { getAccessControlList } from './acl';

export const ACTION_TYPES = {
  REGISTER: 'authentication/REGISTER',
  LOGIN: 'authentication/LOGIN',
  GET_SESSION: 'authentication/GET_SESSION',
  LOGOUT: 'authentication/LOGOUT',
  CLEAR_AUTH: 'authentication/CLEAR_AUTH',
  ERROR_MESSAGE: 'authentication/ERROR_MESSAGE',
  CLOSE_NOTIFICATION: 'authentication/CLOSE_NOTIFICATION',
  SAVE_FEEDBACK: 'authentication/SAVE_FEEDBACK'
};

const initialState = {
  loading: false,
  loginSuccess: false,
  loginError: false, // Errors returned from server side
  showModalLogin: false,
  isAuthenticated: false,
  isAdmin: false,
  user: {} as any,
  errorMessage: null as string, // Errors returned from server side
  successMessage: null as string,
  redirectMessage: null as string,
  sessionHasBeenFetched: false,
  result: false,
  notiOpen: false
};

export type AuthenticationState = Readonly<typeof initialState>;

// Reducer

export default (state: AuthenticationState = initialState, action): AuthenticationState => {
  switch (action.type) {
    // REQUEST
    case REQUEST(ACTION_TYPES.REGISTER):
    case REQUEST(ACTION_TYPES.LOGIN):
    case REQUEST(ACTION_TYPES.GET_SESSION):
    case REQUEST(ACTION_TYPES.SAVE_FEEDBACK):
      return {
        ...state,
        loading: true
      };
    // FAILURE
    case FAILURE(ACTION_TYPES.REGISTER):
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.response.data.message
      };
    case FAILURE(ACTION_TYPES.LOGIN):
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.response.data.message
      };
    case FAILURE(ACTION_TYPES.GET_SESSION):
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        sessionHasBeenFetched: true,
        errorMessage: action.payload
      };
    case FAILURE(ACTION_TYPES.SAVE_FEEDBACK):
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.response.data.message
      };
    // SUCCESS
    case SUCCESS(ACTION_TYPES.REGISTER):
      return {
        ...state,
        loading: false,
        result: true,
      };
    case SUCCESS(ACTION_TYPES.LOGIN):
      return {
        ...state,
        loading: false
      };
    case SUCCESS(ACTION_TYPES.GET_SESSION): {
      const isAuthenticated = action.payload && action.payload.data;
      return {
        ...state,
        isAuthenticated,
        loading: false,
        sessionHasBeenFetched: true,
        user: action.payload.data
      };
    }
    case SUCCESS(ACTION_TYPES.SAVE_FEEDBACK):
      return {
        ...state,
        loading: false,
        notiOpen: false,
      };
    // No axios
    case ACTION_TYPES.LOGOUT:
      return {
        ...initialState,
        loading: false,
        sessionHasBeenFetched: true
      };
    case ACTION_TYPES.CLOSE_NOTIFICATION:
      return {
        ...state,
        notiOpen: false
      };
    default:
      return state;
  }
};

export const getUserInfo = () => async (dispatch) => {
  // dispatch(showLoading())
  await dispatch({
    type: ACTION_TYPES.GET_SESSION,
    payload: axios.get('/api/account')
  });
};

// Login - Get User Token
export const loginUser = userData => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.LOGIN,
    payload: axios.post('/api/authenticate', userData),
    meta: {
      // errorMessage: "Bad credentials",
      successMessage: "Login success"
    }
  });

  const token = result.value.data.id_token;
  if (token) {
    const jwt = token;
    localStorage.setItem(AUTH_TOKEN_KEY, jwt);
  }

  await dispatch(getUserInfo());
  await dispatch(getAccessControlList());
};

export const clearAuthToken = () => {
  if (localStorage.getItem(AUTH_TOKEN_KEY)) {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
};

export const logout = () => dispatch => {
  clearAuthToken();
  dispatch({
    type: ACTION_TYPES.LOGOUT
  });
};

export const onCloseModal = () => dispatch => {
  dispatch({
    type: ACTION_TYPES.CLOSE_NOTIFICATION
  });
};

// Register
export const register = (email, password, fullName, phonenumber, socialNetwork?, socialToken?) => async (dispatch) => {
  const result = await dispatch({
    type: ACTION_TYPES.REGISTER,
    payload: axios.post('api/register', { email, password, fullName, phonenumber, socialNetwork, socialToken }),
    meta: {
      successMessage: "Registration saved! Please check your email for confirmation."
    }
  });
  return result;
};

export const saveFeedback = (data) => async (dispatch) => {
  const result = await dispatch({
    type: ACTION_TYPES.SAVE_FEEDBACK,
    payload: axios.post('api/feedback', data),
  });
  return result;
};

