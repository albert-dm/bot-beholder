import React, { Component } from 'react';
import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client';
import ReactJson from 'react-json-view';
import config from '../../../config';

import './Tracing.scss';

import { showModal } from '../../../actions/CommonActions';

import Trace from '../../../components/Trace';

const server = config.tracingUrl;

var socket;

const mapStateToProps = state => ({
    ...state,
});

const mapDispatchToProps = dispatch => ({
    showModal: (title, content) => dispatch(showModal(title, content)),
});

let id = 0;

class Tracing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            traces: [],
            filter: ""
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
        const { traces, filter } = this.state;
        const { bot, showModal } = this.props;
        return (
            <div className="bp-ff-nunito Tracing" style={{ padding: '5px' }}>
                <h1 className="bp-fs-2">Tracing</h1>
                {
                    bot.selected
                        ?
                        <React.Fragment>
                            <small> ({`${server}tracing/${bot.selected.shortName}`})</small>
                            <input type="text" name="filter" placeholder="id do usuário" value={filter} onChange={e => { this.setState({ filter: e.target.value }) }} id="" />
                            {
                                traces &&
                                traces.filter(trace => filter ? trace.user === filter : true).map(trace =>
                                    <Trace
                                        key={trace.timestamp}
                                        data={trace}
                                        showDetails={(data) => {
                                            showModal('Detalhes', <ReactJson src={data} displayDataTypes={false} />);
                                        }}
                                    />
                                )
                            }
                        </React.Fragment>
                        :
                        <p>Selecione um bot</p>
                }
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Tracing);
