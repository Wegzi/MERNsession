import axios from 'axios';
import {
  SIGNIN,
  GET_SESSION
} from './types';
import { getFromStorage } from '../utils/storage'

export const signin = account => dispatch => {
  axios.post('api/account/signin', account)
  .then(res =>
    dispatch({
      type: SIGNIN,
      payload: res.data
    })
  )
}
export const getSession = () => dispatch => {

  if (getFromStorage('session')) {
    console.log('logado')
    const obj = getFromStorage('session')
    const { token } = obj
    if (obj && token) {
      axios.get('/api/account/verify?token=' + token)
      .then(res =>
        dispatch({
          type: GET_SESSION,
          payload: obj,
        })
      )
    }
  }
  else {
    dispatch({
      type: GET_SESSION,
      payload: {}
    })
  }
}
// export const signin = account => {
//   return{
//     type: LOGIN,
//     payload: account
//   }
// };
