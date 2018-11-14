import React, { Component } from 'react';
import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client';
import ReactJson from 'react-json-view';
import config from '../../../config';

import './Tracing.scss';

import Trace from '../../../components/Trace';
import Modal from '../../../components/Modal'

const server = config.tracingUrl;

var socket;

const mapStateToProps = state => ({
    ...state,
});

const mapDispatchToProps = dispatch => ({
});

let id = 0;

class Tracing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            traces: [],
            showDetails: false,
            dataDetails: {}
        };
        if (props.bot.selected) {
            socket = socketIOClient(`${server}?botid=${props.bot.selected.shortName}`);
            socket.on("tracing", trace => {
                trace.id = id++;
                this.setState(state => ({ traces: [trace, ...state.traces] }));
            });
            socket.on("start", traces => {
                this.setState(() => ({ traces: [...traces] }));
            });
        }
    }

    componentWillReceiveProps = (newProps) => {
        if (newProps.bot.selected) {
            let currentShortName = this.props.bot.selected ? this.props.bot.selected.shortName : "";
            if (newProps.bot.selected.shortName !== currentShortName) {
                if (socket) socket.close();
                socket = socketIOClient(`${server}?botid=${newProps.bot.selected.shortName}`);
                socket.on("tracing", trace => {
                    trace.id = id++;
                    this.setState(state => ({ traces: [trace, ...state.traces] }));
                });
                socket.on("start", traces => {
                    this.setState(() => ({ traces: [...traces] }));
                });
            }
        }
    }

    render() {
        const { traces, showDetails, dataDetails } = this.state;
        const { bot } = this.props;
        return (
            <div className="bp-ff-nunito Tracing" style={{ padding: '5px' }}>
                <h1 className="bp-fs-2">Tracing</h1>
                {
                    bot.selected
                        ?
                        <React.Fragment>
                            <small> ({`${server}?botid=${bot.selected.shortName}`})</small>
                            {
                                traces &&
                                traces.map(trace =>
                                    <Trace
                                        key={trace.timestamp}
                                        data={trace}
                                        showDetails={(data) => {
                                            this.setState({ dataDetails: data, showDetails: true });
                                        }}
                                    />
                                )
                            }
                        </React.Fragment>
                        :
                        <p>Selecione um bot</p>
                }
                <Modal title="Detalhes" show={showDetails} close={() => this.setState({ showDetails: false })}>
                    <ReactJson src={dataDetails} displayDataTypes={false} />
                </Modal>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Tracing);
