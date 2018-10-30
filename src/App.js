import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import { checkLoginAction } from './actions/CheckLoginAction';

import NoUser from './pages/nouser';
import Admin from './pages/admin';

const mapStateToProps = state => ({
    ...state,
});

const mapDispatchToProps = dispatch => ({
    checkLoginAction: () => dispatch(checkLoginAction()),
});

class App extends Component {
    checkLoginAction = () => {
        this.props.checkLoginAction();
    };

    componentWillMount = () => {
        this.checkLoginAction();
    };

    render() {
        return (
            <Router>
                {(() => {
                    switch (this.props.loginReducer.UserRole) {
                        case 'Admin':
                            return <Route path="/" component={Admin} />;
                        default:
                            return <Route path="/" component={NoUser} />;
                    }
                })()}
            </Router>
        );
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
