import React, { Component } from 'react'
import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client'
import { loginAction } from '../../../actions/LoginAction';
import ReactJson from 'react-json-view'

const socket = socketIOClient("http://localhost:4001");

const mapStateToProps = state => ({
    botId: 'gshowmalhacaobeta',
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
            traces: [],
        };
        socket.on(props.botId, trace => {
            trace.id = id++;
            this.setState(state => ({ traces: [trace, ...state.traces] }));
        })
    }
    render() {
        const {traces} = this.state;
        return (
            <div class="bp-ff-nunito">
                <h1 class="bp-fs-2">Tracing: {this.props.botId}</h1>
                {traces.map( (trace) => <ReactJson key={trace.id} src={trace} collapsed={true} displayDataTypes={false}/>)}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tracing)