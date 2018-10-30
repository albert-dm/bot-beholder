import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginAction } from '../../../actions/UserActions';
import './Login.scss';

const mapStateToProps = state => ({
    ...state,
});

const mapDispatchToProps = dispatch => ({
    loginAction: (user, pass) => dispatch(loginAction(user, pass)),
});

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            pass: ""
        }
    }

    loginAction = () => {
        let { user, pass } = this.state;
        this.props.loginAction(user, pass);
    };

    handleChange = e => {
        const { name, value, required } = e.target;
        this.setState({
            [name]: value,
        });
    };

    render() {
        let { user, pass } = this.state;
        return (
            <div className="Login">
                <h1>Acessar Bot Beholder</h1>
                <form onSubmit={() => {
                    this.loginAction();
                }}>
                    <div>
                        <label>
                            <b>E-mail:</b>
                        </label>
                        <input
                            onChange={this.handleChange}
                            type="email"
                            name="user"
                            value={user}
                            required
                        />
                    </div>
                    <br />
                    <div>
                        <label>
                            <b>Senha:</b>
                        </label>
                        <input
                            onChange={this.handleChange}
                            type="password"
                            name="pass"
                            value={pass}
                            required
                        />
                    </div>
                    <br />
                    <button                >
                        Entrar
                </button>
                </form>

            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LoginPage);
