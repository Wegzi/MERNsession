import axios from 'axios';
import {
  LOGIN,
  GET_LOGIN
} from './types';

export const signin = account => {
  return{
    type: LOGIN,
    payload: account
  }
};

export const getLogin = account => {
  return{
    type: GET_LOGIN,
    payload: account
  }
};
