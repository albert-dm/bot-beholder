import React, { Component } from 'react'
import { connect } from 'react-redux';
import { loginAction } from '../../../actions/LoginAction'

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    loginAction: (role) => dispatch(loginAction(role))
})

class Home extends Component {
    loginAction = (role) => {
        this.props.loginAction(role);
    }
    render () {
        return (
            <div>
                <h1>Admin Home</h1>
                <button onClick={() => { this.loginAction("NoUser") }}>Sair</button>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)