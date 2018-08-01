import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginAction } from '../../../actions/LoginAction'

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    loginAction: (role) => dispatch(loginAction(role))
})

class LoginPage extends Component {
    loginAction = (role) => {
        this.props.loginAction(role);
    }
    render() {
        return (
            <div>
                <h1>Login Page</h1>
                <button onClick={() => { this.loginAction("Admin") }}>Login (admin)</button>
                <Link to="/register">
                    Register
                </Link>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)