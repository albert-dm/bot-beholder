import React, { Component } from 'react'
import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client'
import { loginAction } from '../../../actions/LoginAction';

import Trace from '../../../components/Trace/'

const mapStateToProps = state => ({
    botId: 'gshowreceitashmg',
    ...state
});

const mapDispatchToProps = dispatch => ({
    loginAction: (role) => dispatch(loginAction(role))
});

var id = 0;

class Tracing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            traces: []
        };
        const socket = socketIOClient("http://localhost:4001?botid="+props.botId);
        socket.on(props.botId, trace => {
            trace.id = id++;
            this.setState(state => ({ traces: [trace, ...state.traces] }));
        });
        socket.on(props.botId + "Start", traces => {
            this.setState( () => ({ traces: traces }));
        })
    }

    render() {
        const { traces} = this.state;
        return (
            <div className="bp-ff-nunito" style={{ padding: '5px' }}>
                <h1 className="bp-fs-2">Tracing: {this.props.botId}</h1>
                {traces.map((trace) => <Trace key={trace.id} data={trace}/>)}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tracing)