import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

class NoUserRoot extends Component {
    render() {
        return (
            <Switch>
                <Route path="/register" component={Register} />
                <Route component={Login} />
            </Switch>
        );
    }
}

export default NoUserRoot;
