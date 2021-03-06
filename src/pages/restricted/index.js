import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './Home';
import Tracing from './Tracing';
import Testing from './Testing';
import EditTesting from './Testing/edit';
import { hubConnection } from '../../services/SocketService';

import { showModal, fetchingData, fetchingDataFinished } from '../../actions/CommonActions';

import './Restricted.scss'

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
    loadBots: () => dispatch(loadList()),
    hideModal: () => dispatch(hideModal()),
});

const grid = {
    display: 'grid',
    gridTemplateColumns: '250px auto',
    gridTemplateRows: '0px minmax(calc(100vh - 30px), auto) 30px',
    gridTemplateAreas: `
        "header header header header"
        "tools main main main"
        "tools footer footer footer"`,
};

const tools = {
    gridArea: 'tools',
    overflow: 'hidden'
};

const main = {
    gridArea: 'main',
    padding: '20px'
};

const footer = {
    gridArea: 'footer'
};

const footerText = {
    textAlign: 'center',
    margin: '0'
}

class Restricted extends Component {
    state = {};

    componentDidMount() {
        let { loadBots, finishTest } = this.props;

        loadBots();

        hubConnection
            .start()
            .then()
            .catch(err => console.log('Error while establishing connection :(', err));

        hubConnection.on('ReceiveMessage', (msg) => {
            finishTest(msg.testId, msg.testResult);
            finishTest();
        });
    }

    getCurrentYear = () => new Date().getFullYear();

    handleFooterHover = () => {
        this.setState(prevState => ({
            isFooterHovered: !prevState.isFooterHovered
        }));
    }

    render() {
        let { common, hideModal } = this.props;
        return (
            <React.Fragment>
                <div style={grid}>
                    <div className="bp-grad-suit" style={tools}>
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
                        <p style={footerText} onMouseEnter={this.handleFooterHover} onMouseLeave={this.handleFooterHover}>
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
