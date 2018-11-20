import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginAction } from '../../../actions/UserActions';
import { popAlert } from '../../../actions/CommonActions';
import { debounceCall } from '../../../helpers/commonHelper';
import Icon from '../../../static/img/logo.svg';
import './Login.scss';

const mapStateToProps = state => ({
    ...state,
});

const mapDispatchToProps = dispatch => ({
    loginAction: (user, pass) => dispatch(loginAction(user, pass)),
    popAlert: () => dispatch(popAlert())
});

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            pass: ""
        }
    }

    loginAction = e => {
        e.preventDefault();
        let { user, pass } = this.state;
        this.props.loginAction(user, pass);
    };

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    };

    componentWillReceiveProps = newProps => {
        let { common, popAlert } = newProps;
        if (common.alerts.length > 0) {
            debounceCall(popAlert(), 10000);
        }
    }

    render() {
        let { user, pass } = this.state;
        let { common } = this.props;
        return (
            <div className="Login">
                <img src={Icon} width="300px" height="300px" alt="Bot Beholder" />
                <div>
                    <small>Use suas credenciais do BLiP</small>
                    <form onSubmit={this.loginAction}>
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
                        <button>
                            Entrar
                    </button>
                    </form>
                    {
                        common.alert &&
                        <small className={common.alert.level}>{common.alert.text}</small>
                    }
                </div>


            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LoginPage);
