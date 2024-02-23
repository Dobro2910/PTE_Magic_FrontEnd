import axios from 'axios';

import { REQUEST, SUCCESS, FAILURE } from '../utils/action-type.util';
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const ACTION_TYPES = {
  GET_ALL: 'device/GET_ALL',
  CREATE: 'device/CREATE',
  UPDATE: 'device/UPDATE',
  DELETE: 'device/DELETE',
};

const initialState = {
  devices: [],
  device: {} as any,
  loading: false,
  errorMessage: null as string
};

export type DeviceState = Readonly<typeof initialState>;

// Reducer
export default (state: DeviceState = initialState, action): DeviceState => {
  switch (action.type) {
    // REQUEST
    case REQUEST(ACTION_TYPES.GET_ALL):
      return {
        ...state,
        loading: true
      };
    // FAILURE
    case FAILURE(ACTION_TYPES.GET_ALL):
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
        devices: action.payload.data
      };
    }
    default:
      return state;
  }
};

export const getAll = (device_type?) => async (dispatch) => {
  await dispatch({
    type: ACTION_TYPES.GET_ALL,
    payload: axios.get(`/api/devices/all${device_type ? `?device_type=${device_type}` : '' }`)
  });
};


export const saveOrUpdate = (data, device_type?) => async (dispatch) => {
  if (data._id) {
    await dispatch({
      type: ACTION_TYPES.UPDATE,
      payload: axios.put(`/api/devices/update/${data._id}`, data)
    });
  } else {
    await dispatch({
      type: ACTION_TYPES.CREATE,
      payload: axios.post('/api/devices/create', data)
    });
  }
  dispatch(getAll(device_type));
}

export const remove = (id, device_type) => async (dispatch) => {
  const requestUrl = `/api/devices/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getAll(device_type));
  return result;
}