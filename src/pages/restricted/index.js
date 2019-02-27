import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './Home';
import Tracing from './Tracing';
import Testing from './Testing';
import EditTesting from './Testing/edit';
import Icon from '../../static/img/logo.svg';

import './Restricted.scss'

import { logoutAction } from '../../actions/UserActions'
import { loadList } from '../../actions/BotActions'
import { hideModal } from '../../actions/CommonActions';

import BotSideBar from "../../components/BotSideBar/"
import LoadingOverlay from "../../components/LoadingOverlay/"
import Modal from "../../components/Modal/"
import WANotifications from './WANotifications';

const mapStateToProps = state => ({
    ...state,
});

const mapDispatchToProps = dispatch => ({
    logoutAction: () => dispatch(logoutAction()),
    loadBots: () => dispatch(loadList()),
    hideModal: () => dispatch(hideModal()),
});

const grid = {
    display: 'grid',
    gridTemplateColumns: '250px auto',
    gridTemplateRows: '125px minmax(calc(100vh - 175px), auto) 50px',
    gridTemplateAreas: `"header header header header"
        "tools main main main"
        "tools footer footer footer"`,
};

const header = {
    gridArea: 'header',
    textAling: 'center',
    display: 'grid',
    gridTemplateColumns: '250px auto',
    gridTemplateRows: '100px 25px',
    gridTemplateAreas: `"icon title"
        "icon nav"`,
};
const icon = {
    padding: '5px',
    gridArea: 'icon',
    display: 'block',
    justifySelf: 'center',
    alignSelf: 'center',
    objectFit: 'cover'
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
    padding: '20px'
};

const footer = {
    gridArea: 'footer',
    borderTop: 'solid 2px #8ca0b3'
};

class Restricted extends Component {
    state = {};

    getCurrentYear = () => new Date().getFullYear();

    handleFooterHover = () => {
        this.setState(prevState => ({
            isFooterHovered: !prevState.isFooterHovered
        }));
    }

    componentDidMount = () => {
        let { loadBots } = this.props;
        loadBots();
    }

    render() {
        let { logoutAction, user, common, hideModal } = this.props;
        return (
            <React.Fragment>
                <div style={grid}>
                    <header className="bp-bg-onix" style={header}>
                        <img src={Icon} width="150px" height="150px" alt="Bot Beholder" style={icon} />
                        <h1 className="bp-c-offwhite" style={title}>
                            <Link to="/">Bot Beholder</Link>
                        </h1>
                        <div style={nav} className="bp-c-offwhite">
                            Olá {user.data.name} (<div className="link" onClick={logoutAction}>Sair</div>)
                    </div>
                    </header>
                    <div className="bp-bg-suit" style={tools}>
                        <BotSideBar />
                    </div>
                    <div className="bp-bg-offwhite" style={main}>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/tracing" component={Tracing} />
                        <Route exact path="/testing" component={Testing} />
                        <Route exact path="/testing/edit" component={EditTesting} />
                        <Route exact path="/wanotifications" component={WANotifications} />
                    </div>
                    <div className="bp-bg-offwhite" style={footer}>
                        <p style={{ textAlign: 'center' }} onMouseEnter={this.handleFooterHover} onMouseLeave={this.handleFooterHover}>
                            {this.state.isFooterHovered ? "Who beholds the beholder?" : `Bot Beholder ${this.getCurrentYear()}`}
                        </p>
                    </div>
                </div>
                {
                    common.isLoading &&
                    <LoadingOverlay />
                }
                <Modal title={common.modalTitle} close={hideModal} show={common.showModal}>
                    {common.modalContent}
                </Modal>
            </React.Fragment>

        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Restricted);
