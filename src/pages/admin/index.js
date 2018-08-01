import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import Home from './Home/'

class AdminRoot extends Component {
    render () {
        return (
            <React.Fragment>
                <Route path="/" component={Home} />
            </React.Fragment>
        )
    }
}

export default AdminRoot