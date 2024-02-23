import axios from 'axios';
import { getAccessControlList } from './acl';
import { REQUEST, SUCCESS, FAILURE } from '../utils/action-type.util';

export const ACTION_TYPES = {
  GET_BANNER: 'banner/GET_BANNER',
  RESET: 'banner/RESET'
};


const initialState = {
  bannerLoading: false,
  errorMessage: null as string,
  successMessage: null,
  banner: null
};

export type BannerState = Readonly<typeof initialState>;

// Reducer
export default (state: BannerState = initialState, action): BannerState => {
  switch (action.type) {
    // REQUEST
    case REQUEST(ACTION_TYPES.GET_BANNER):
      return {
        ...state,
        bannerLoading: true
      };
    // FAILURE
    case FAILURE(ACTION_TYPES.GET_BANNER):
      return {
        ...state,
        bannerLoading: false,
        errorMessage: action.payload
      };
    // SUCCESS
    case SUCCESS(ACTION_TYPES.GET_BANNER): {
      return {
        ...state,
        bannerLoading: false,
        banner: action.payload.data
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

export const getBanner = () => async (dispatch) => {
  await dispatch({
    type: ACTION_TYPES.GET_BANNER,
    payload: axios.get(`/api/banner/`)
  });
};

export const resetVoucher = () => ({
  type: ACTION_TYPES.RESET
});