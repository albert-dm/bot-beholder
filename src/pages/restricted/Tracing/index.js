import React, { Component } from 'react';
import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client';

import Trace from '../../../components/Trace';

const server = "https://bot-beholder-serve.herokuapp.com/"

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
        const { traces } = this.state;
        return (
            <div className="bp-ff-nunito" style={{ padding: '5px' }}>
                <h1 className="bp-fs-2">Tracing</h1>
                {traces && traces.map(trace => <Trace key={trace.id} data={trace} />)}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Tracing);
