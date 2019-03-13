import React, { Component } from 'react';
import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client';
import ReactJson from 'react-json-view';
import config from '../../../config';
import { getBotConfiguration, setBotConfiguration } from '../../../services/BotService';

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

    configureBotTracing = async () => {
        this.setState({
            configuringLabel: "Configurando..."
        });

        try {
            await Promise.all(["working", "published"].map(async v => {
                let { resource } = await getBotConfiguration(this.props.bot.selected.authorization, v);
                resource["TraceTargetType"] = "Http";
                resource["TraceMode"] = "All";
                resource["TraceTarget"] = `https://pretwebsocketprod.azurewebsites.net/trace/${this.props.bot.selected.shortName}`;
                return setBotConfiguration(this.props.bot.selected.authorization, v, resource);
            }));

            this.setState({
                configuringLabel: "Configurado com sucesso!"
            });
        } catch (e) {
            this.setState({
                configuringLabel: "Falha ao tentar configurar"
            });
        }
    }

    render() {
        const { traces, filter } = this.state;
        const { bot, showModal } = this.props;
        return (
            <div className="bp-ff-nunito Tracing" style={{ padding: '5px' }}>
                <div className="tracing-header">
                    <h1 className="bp-fs-2">Tracing</h1>
                    {
                        bot.selected &&
                        <div>
                            <button onClick={this.configureBotTracing} disabled={this.state.configuringLabel}>
                                { this.state.configuringLabel || "Configurar tracing no bot" }
                            </button>
                        </div>
                    }
                </div>
                {
                    bot.selected ? (
                        <>
                            <input type="text" name="filter" placeholder="Id do usuário" value={filter} onChange={e => { this.setState({ filter: e.target.value }) }} className="search-input" />
                            {
                                traces &&
                                traces.filter(trace => !filter || trace.user.includes(filter)).map(trace =>
                                    <Trace
                                        key={trace.timestamp}
                                        data={trace}
                                        showDetails={(data) => {
                                            showModal('Detalhes', <ReactJson src={data} displayDataTypes={false} />);
                                        }}
                                    />
                                )
                            }
                        </>
                    )
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
