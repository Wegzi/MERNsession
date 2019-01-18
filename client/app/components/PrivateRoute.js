import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {
  getFromStorage
} from '../utils/storage'
export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('the_main_app')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )} />
)
