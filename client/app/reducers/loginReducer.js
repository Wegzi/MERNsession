import {
  SIGNIN
} from '../actions/types';

const initialState = {
  session: [],
  loading: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SIGNIN:
      return {
        ...state,
        session: action.payload,
        loading: false
      }
    default:
      return state;
  }
}
