import axios from 'axios';
import { getAccessControlList } from './acl';
import { REQUEST, SUCCESS, FAILURE } from '../utils/action-type.util';

export const ACTION_TYPES = {
  GET_INFO: 'voucher/GET_INFO',
  ACTIVE: 'voucher/ACTIVE',
  RESET: 'voucher/RESET'
};


const initialState = {
  voucherHasBeenFetched: false,
  voucherLoading: false,
  errorMessage: null as string,
  successMessage: null,
  voucher: null
};

export type VoucherState = Readonly<typeof initialState>;

// Reducer
export default (state: VoucherState = initialState, action): VoucherState => {
  switch (action.type) {
    // REQUEST
    case REQUEST(ACTION_TYPES.GET_INFO):
    case REQUEST(ACTION_TYPES.ACTIVE):
      return {
        ...state,
        voucherLoading: true
      };
    // FAILURE
    case FAILURE(ACTION_TYPES.GET_INFO):
    case FAILURE(ACTION_TYPES.ACTIVE):
      return {
        ...state,
        voucherLoading: false,
        errorMessage: action.payload,
        voucherHasBeenFetched: false
      };
    // SUCCESS
    case SUCCESS(ACTION_TYPES.ACTIVE): {
      return {
        ...initialState
      };
    }
    case SUCCESS(ACTION_TYPES.GET_INFO): {
      return {
        ...state,
        voucherLoading: false,
        voucher: action.payload.data,
        voucherHasBeenFetched: true
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

export const getVoucherInfo = (voucherType, code) => async (dispatch) => {
  await dispatch({
    type: ACTION_TYPES.GET_INFO,
    payload: axios.get(`/api/voucher/info/${voucherType}/${code}`)
  });
};

export const activeVoucher = (code) => async (dispatch) => {
  await dispatch({
    type: ACTION_TYPES.ACTIVE,
    payload: axios.get(`/api/voucher/active/${code}`),
    meta: {
      successMessage: "Apply voucher success ..."
    }
  });
  dispatch(getAccessControlList());
};

export const resetVoucher = () => ({
  type: ACTION_TYPES.RESET
});