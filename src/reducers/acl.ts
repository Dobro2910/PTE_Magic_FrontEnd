import axios from 'axios';

import { REQUEST, SUCCESS, FAILURE } from '../utils/action-type.util';

export const ACTION_TYPES = {
  GET_ACL: 'acl/GET_ACL',
  PLUS_ONE: 'PLUS_ONE',
  RESET: 'acl/RESET'
};


const initialState = {
  aclHasBeenFetched: false,
  loading: false,
  errorMessage: null as string,
  successMessage: null,
  acl: null
};

export type AclState = Readonly<typeof initialState>;

// Reducer
export default (state: AclState = initialState, action): AclState => {
  switch (action.type) {
    // REQUEST
    case REQUEST(ACTION_TYPES.GET_ACL):
      return {
        ...state,
        loading: true
      };
    // FAILURE
    case FAILURE(ACTION_TYPES.GET_ACL):
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
        aclHasBeenFetched: true
      };
    // SUCCESS
    case SUCCESS(ACTION_TYPES.GET_ACL): {
      return {
        ...state,
        loading: false,
        acl: action.payload.data,
        aclHasBeenFetched: true
      };
    }
    // no call axios
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    case ACTION_TYPES.PLUS_ONE: {
      let acl = state.acl;
      if (acl && acl.numberAiScoring > 0) {
        acl.numberAiScoring  = acl.numberAiScoring - 1;
      }
      return {
        ...state,
        acl: acl
      };
    }
    default:
      return state;
  }
};

export const getAccessControlList = () => async (dispatch) => {
  await dispatch({
    type: ACTION_TYPES.GET_ACL,
    payload: axios.get(`/api/payment/access-control-list`)
  });
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const aclPlusOne = () => ({
  type: ACTION_TYPES.PLUS_ONE
});