import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Tracing from './Tracing';
import Testing from './Testing';
import Icon from '../../static/img/Dark_Beholder.png';

import { logoutAction } from '../../actions/UserActions'

import BotSideBar from "../../components/BotSideBar/"

const mapStateToProps = state => ({
    ...state,
});

const mapDispatchToProps = dispatch => ({
    logoutAction: () => dispatch(logoutAction()),
});

const grid = {
    display: 'grid',
    gridTemplateColumns: '200px auto',
    gridTemplateRows: '125px minmax(calc(100vh - 175px), auto) 50px',
    gridTemplateAreas: `"header header header header"
        "tools main main main"
        "footer footer footer footer"`,
};

const header = {
    gridArea: 'header',
    textAling: 'center',
    display: 'grid',
    gridTemplateColumns: '150px auto',
    gridTemplateRows: '100px 25px',
    gridTemplateAreas: `"icon title"
        "icon nav"`,
};
const icon = {
    padding: '5px',
    gridArea: 'icon',
    display: 'block',
    justifySelf: 'stretch',
    alignSelf: 'stretch',
};
const title = {
    gridArea: 'title',
    justifySelf: 'center',
    alignSelf: 'center',
};

const nav = {
    gridArea: 'nav',
    justifySelf: 'end',
    paddingRight: '15px'
};

const tools = {
    gridArea: 'tools',
};

const main = {
    gridArea: 'main',
};

const footer = {
    gridArea: 'footer',
    borderTop: 'solid 2px #8ca0b3',
};

class AdminRoot extends Component {
    render() {
        let { logoutAction } = this.props;
        return (
            <div style={grid}>
                <header className="bp-bg-onix" style={header}>
                    <img src={Icon} alt="Bot Beholder" style={icon} />
                    <h1 className="bp-c-offwhite" style={title}>
                        Bot Beholder
                    </h1>
                    <div style={nav} className="bp-c-offwhite">
                        Olá Usuário (<a onClick={logoutAction}>Sair</a>)
                    </div>
                </header>
                <div className="bp-bg-offwhite" style={tools}>
                    <BotSideBar />
                </div>
                <div className="bp-bg-offwhite" style={main}>
                    <Route exact path="/" component={Tracing} />
                    <Route exact path="/testing" component={Testing} />
                </div>
                <div className="bp-bg-breeze" style={footer}>
                    footer
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AdminRoot);
