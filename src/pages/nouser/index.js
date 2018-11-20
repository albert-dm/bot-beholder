import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';

class NoUserRoot extends Component {
    render() {
        return (
            <Switch>
                <Route component={Login} />
            </Switch>
        );
    }
}

export default NoUserRoot;
