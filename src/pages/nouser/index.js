import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import Login from './Login/'
import Register from './Register/'

class NoUserRoot extends Component {
    render () {
        return (
            <React.Fragment>
                <Route exact path="/" component={Login} />
                <Route exact path="/register" component={Register} />
            </React.Fragment>
        )
    }
}

export default NoUserRoot