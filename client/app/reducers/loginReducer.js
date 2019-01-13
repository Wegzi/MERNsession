import {
  LOGIN
} from '../actions/types';

const initialState = {
  isLoading: false,
  account:[]
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        account: [action.payload]
      }
    default:
      return state;
  }
}
