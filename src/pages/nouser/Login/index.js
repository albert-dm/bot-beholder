import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginAction } from '../../../actions/UserActions';

const mapStateToProps = state => ({
    ...state,
});

const mapDispatchToProps = dispatch => ({
    loginAction: (user, pass) => dispatch(loginAction(user, pass)),
});

class LoginPage extends Component {
    loginAction = (user, pass) => {
        this.props.loginAction(user, pass);
    };

    render() {
        return (
            <div>
                <h1>Login Page</h1>
                <button
                    onClick={() => {
                        this.loginAction("User", "Password");
                    }}
                >
                    Login (admin)
                </button>
                <Link to="/register">Register</Link>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LoginPage);
