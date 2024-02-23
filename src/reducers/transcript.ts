export const ACTION_TYPES = {
  INIT_TRANSCRIPT: 'transcript/INIT',
  STORED_TRANSCRIPT: 'transcript/STORED',
  CLEAR_TRANSCRIPT: 'transcript/CLEAR',
};

const initialState = {
  transcript: "",
  loading: true,
  errorMessage: null,
};

export type TranscriptState = Readonly<typeof initialState>;

// Reducer
export default (state: TranscriptState = initialState, action): TranscriptState => {
  switch (action.type) {
    case ACTION_TYPES.INIT_TRANSCRIPT:
    case ACTION_TYPES.CLEAR_TRANSCRIPT:
      return {
        ...initialState
      };
    case ACTION_TYPES.STORED_TRANSCRIPT:
      return {
        ...state,
        transcript: action.payload
      };
    default:
      return state;
  }
};

export const initTranscript = (data) => ({
  type: ACTION_TYPES.INIT_TRANSCRIPT,
  payload: data
});

export const storedTranscript = (data) => (dispatch, getState) => {
  dispatch({
      type: ACTION_TYPES.STORED_TRANSCRIPT,
      payload: data
  })
};

