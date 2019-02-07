import axios from 'axios';
import {
  SIGNIN,
} from './types';

export const signin = account => dispatch => {
  axios.post('api/account/signin', account).then(res =>
    dispatch({
      type: SIGNIN,
      payload: res.data
    })
  );
};

// export const signin = account => {
//   return{
//     type: LOGIN,
//     payload: account
//   }
// };
