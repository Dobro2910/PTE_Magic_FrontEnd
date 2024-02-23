import axios from 'axios';
import { REQUEST, SUCCESS, FAILURE } from '../utils/action-type.util';

export const ACTION_TYPES = {
  GET_PACKS: 'pack/GET_PACKS',
  RESET_PACK: 'pack/RESET_PACK',
  GET_ONE: 'pack/GET_ONE'
};


const initialState = {
  packLoading: false,
  errorMessage: null as string,
  successMessage: null,
  packs: [],
  pack: null
};

export type PackState = Readonly<typeof initialState>;

// Reducer
export default (state: PackState = initialState, action): PackState => {
  switch (action.type) {
    // REQUEST
    case REQUEST(ACTION_TYPES.GET_PACKS):
    case REQUEST(ACTION_TYPES.GET_ONE):
      return {
        ...state,
        packLoading: true
      };
    // FAILURE
    case FAILURE(ACTION_TYPES.GET_PACKS):
    case FAILURE(ACTION_TYPES.GET_ONE):
      return {
        ...state,
        packLoading: false,
        errorMessage: action.payload
      };
    // SUCCESS
    case SUCCESS(ACTION_TYPES.GET_PACKS): {
      return {
        ...state,
        packLoading: false,
        packs: action.payload.data
      };
    }
    case SUCCESS(ACTION_TYPES.GET_ONE): {
      return {
        ...state,
        packLoading: false,
        pack: action.payload.data
      };
    }
    // no call axios
    case ACTION_TYPES.RESET_PACK:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export const getPackages = () => async (dispatch) => {
  await dispatch({
    type: ACTION_TYPES.GET_PACKS,
    payload: axios.get(`/api/package/all`)
  });
};


export const getProduct = (id) => async (dispatch) => {
  await dispatch({
    type: ACTION_TYPES.GET_ONE,
    payload: axios.get(`/api/package/product/${id}`)
  });
};

export const resetPackage = () => ({
  type: ACTION_TYPES.RESET_PACK
});