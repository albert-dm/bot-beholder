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
    render() {
        return (
            <div class="bp-ff-nunito">
                <h1 class="bp-fs-1">Admin Home</h1>
                <table>
                    <tbody>
                        <tr>
                            <td class="bp-fs-5 tc">
                                <button class="bp-btn bp-btn--blip-dark bp-btn--small">Small</button>
                            </td>
                            <td class="bp-fs-5 tl">.bp-btn <span class="bp-c-blip-dark">.bp-btn--blip-dark</span> .bp-btn--small</td>
                        </tr>
                        <tr>
                            <td class="bp-fs-5 tc">
                                <button class="bp-btn bp-btn--blip-dark">Normal</button>
                            </td>
                            <td class="bp-fs-5 tl">.bp-btn <span class="bp-c-blip-dark">.bp-btn--blip-dark</span></td>
                        </tr>
                        <tr>
                            <td class="bp-fs-5 tc">
                                <button class="bp-btn bp-btn--blip-dark bp-btn--large">Large</button>
                            </td>
                            <td class="bp-fs-5 tl">.bp-btn <span class="bp-c-blip-dark">.bp-btn--blip-dark</span> .bp-btn--large</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)