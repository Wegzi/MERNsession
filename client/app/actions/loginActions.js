import axios from 'axios';
import {
  LOGIN
} from './types';

export const signin = account => {
  return{
    type: LOGIN,
    payload: account
  }

};
