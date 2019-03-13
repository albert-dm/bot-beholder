import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactJson from 'react-json-view';
import { hubConnection } from '../../../services/SocketService';

import './Tracing.scss';

import { showModal } from '../../../actions/CommonActions';

import Trace from '../../../components/Trace';

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
        hubConnection.on('AnswerCommand', (id, route, value) => this.setState({ traces: value }));
        hubConnection.on('trace', (trace) => this.setState(prevState => ({ traces: [trace, ...prevState.traces] })));
        //hubConnection.on('trace', (traces) => console.log(traces));

        if (props.bot.selected) {
            hubConnection.send('SendCommand', 'id', '/trace', [props.bot.selected.shortName]);
        }
    }

    componentWillUnmount = () => {
        hubConnection.send('SendCommand', 'id', '/trace/remove', [this.props.bot.selected.shortName]);
        hubConnection.off('AnswerCommand');
        hubConnection.off('trace');
    }

    componentWillReceiveProps = (newProps) => {
        if (newProps.bot.selected) {
            let currentShortName = this.props.bot.selected ? this.props.bot.selected.shortName : "";
            if (newProps.bot.selected.shortName !== currentShortName) {
                this.props.bot.selected && hubConnection.send('SendCommand', 'id', '/trace/remove', [this.props.bot.selected.shortName]);
                hubConnection.send('SendCommand', 'id', '/trace', [newProps.bot.selected.shortName]);
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
                            <input type="text" name="filter" placeholder="id do usuário" value={filter} onChange={e => { this.setState({ filter: e.target.value }) }} id="" />
                            {
                                traces &&
                                traces.filter(trace => filter ? trace.user === filter : true).map(trace =>
                                    <Trace
                                        key={trace.id}
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
