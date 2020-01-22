import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {getAccessToken} from "../redux/auth";

export const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => (
           getAccessToken()
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )} />
    )
}