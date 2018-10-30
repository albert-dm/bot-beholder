import React, { Component } from 'react';
import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client';

import Trace from '../../../components/Trace';

const mapStateToProps = state => ({
    // botId: 'gshowreceitashmg',
    botId: 'gshowmalhacaobeta',
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
        const socket = socketIOClient(`https://3bcc731c.ngrok.io?botid=${props.botId}`);
        socket.on(props.botId, trace => {
            trace.id = id++;
            this.setState(state => ({ traces: [trace, ...state.traces] }));
        });
        socket.on(`${props.botId}Start`, traces => {
            this.setState(() => ({ traces: [...traces] }));
        });
    }

    render() {
        const { traces } = this.state;
        return (
            <div className="bp-ff-nunito" style={{ padding: '5px' }}>
                <h1 className="bp-fs-2">Tracing: {this.props.botId}</h1>
                {traces && traces.map(trace => <Trace key={trace.id} data={trace} />)}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Tracing);
