import axios from 'axios';

import { REQUEST, SUCCESS, FAILURE } from '../utils/action-type.util';

export const ACTION_TYPES = {
  GET_ALL: 'cart/GET_ALL',
  SAVE_ONE: 'cart/SAVE_ONE',
  SAVE_ALL: 'cart/SAVE_ALL',
  CHANGE_ONE: 'cart/CHANGE',
  DELETE: 'cart/DELETE',
  RESET: 'cart/RESET'
};


const initialState = {
  loading: false,
  errorMessage: null as string,
  successMessage: null,
  carts: [], // as ReadonlyArray<IPteExamType>,
  cart: null
};

export type CartState = Readonly<typeof initialState>;

// Reducer
export default (state: CartState = initialState, action): CartState => {
  switch (action.type) {
    // REQUEST
    case REQUEST(ACTION_TYPES.GET_ALL):
    case REQUEST(ACTION_TYPES.SAVE_ONE):
    case REQUEST(ACTION_TYPES.SAVE_ALL):
    case REQUEST(ACTION_TYPES.CHANGE_ONE):
    case REQUEST(ACTION_TYPES.DELETE):
      return {
        ...state,
        loading: true
      };
    // FAILURE
    case FAILURE(ACTION_TYPES.GET_ALL):
    case FAILURE(ACTION_TYPES.SAVE_ONE):
    case FAILURE(ACTION_TYPES.SAVE_ALL):
    case FAILURE(ACTION_TYPES.CHANGE_ONE):
    case FAILURE(ACTION_TYPES.DELETE):
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
        carts: action.payload.data
      };
    }
    case SUCCESS(ACTION_TYPES.CHANGE_ONE): 
    case SUCCESS(ACTION_TYPES.SAVE_ONE): {
      return {
        ...state,
        loading: false,
        cart: action.payload.data
      };
    }
    case SUCCESS(ACTION_TYPES.SAVE_ALL): {
      return {
        ...state,
        loading: false,
        carts: action.payload.data
      };
    }
    case SUCCESS(ACTION_TYPES.DELETE): {
      return {
        ...state,
        loading: false
      };
    }
    // no call axios
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
    payload: axios.get(`/api/payment/cart/all`)
  });
};

export const saveOne = (data) => async (dispatch) => {
  await dispatch({
    type: ACTION_TYPES.SAVE_ONE,
    payload: axios.post(`/api/payment/cart/add`, data),
    // meta: {
    //   successMessage: "Add item into cart success"
    // }
  });
  await dispatch(getAll());
  return true;
}

export const changeQuantity = (data) => async (dispatch) => {
  await dispatch({
    type: ACTION_TYPES.CHANGE_ONE,
    payload: axios.post(`/api/payment/cart/change-quantity`, data)
  });
  dispatch(getAll());
}

export const saveAll = (data) => async (dispatch) => {
  await dispatch({
    type: ACTION_TYPES.SAVE_ALL,
    payload: axios.post(`/api/payment/cart/add-all`, data)
  });
}

export const reset = () => ({
  type: ACTION_TYPES.RESET
});