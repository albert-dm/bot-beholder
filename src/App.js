import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import { checkLoginAction } from './actions/UserActions';

import NoUser from './pages/nouser';
import Restricted from './pages/restricted';

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
        let { user } = this.props;
        return (
            <Router>
                {
                    user.logged ?
                    <Route path="/" component={Restricted} />
                    :
                    <Route path="/" component={NoUser} />
                }
            </Router>
        );
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
