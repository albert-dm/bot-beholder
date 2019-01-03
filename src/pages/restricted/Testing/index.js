import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import { toggleTestQueue, runTests, setQueue } from '../../../actions/TestActions';
import Modal from '../../../components/Modal';
import config from '../../../config';

import './testList.scss'

var hubConnection;
const server = config.pretUrl;

const mapStateToProps = state => ({
    ...state,
});

const mapDispatchToProps = dispatch => ({
    toggleTestQueue: (testCaseId, queue) => dispatch(toggleTestQueue(testCaseId, queue)),
    runTests: (botKey, queue) => dispatch(runTests(botKey, queue)),
    setQueue: (queue) => dispatch(setQueue(queue))
});

const getIconClass = (selected, log) => {
    let iconClass;

    if (selected) {
        iconClass = "far fa-clock";
    } else if (log) {
        iconClass = log.status === 'success' ? 'success fas fa-check' : 'fail fas fa-times';
    }

    return iconClass;
}

const TestCase = (props) => {
    let { caseName, selected, onClick, log, showLog } = props;
    return (
        <div onClick={onClick} className="testItem">
            <i className={'status ' + getIconClass(selected, log)}></i>
            {caseName}
            {
                log &&
                <i className="more fas fa-search-plus" onClick={(e) => { e.stopPropagation(); showLog({ title: caseName, value: log.value }) }} />
            }
        </div>
    );
}

class Testing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLog: null
        }

        if (props.bot.selected) {
            hubConnection = new HubConnectionBuilder()
                .withUrl(server)
                .configureLogging(LogLevel.Information)
                .build();

            hubConnection
                .start()
                .then(() => console.log('Connection started!'))
                .catch(err => console.log('Error while establishing connection :('));
        }
    }

    componentWillReceiveProps = (newProps) => {
        if (newProps.bot.selected) {
            let currentShortName = this.props.bot.selected ? this.props.bot.selected.shortName : "";
            if (newProps.bot.selected.shortName !== currentShortName) {
                if (hubConnection) hubConnection.close();
                hubConnection = new HubConnectionBuilder()
                    .withUrl(server)
                    .configureLogging(LogLevel.Information)
                    .build();

                hubConnection
                    .start()
                    .then(() => console.log('Connection started!'))
                    .catch(err => console.log('Error while establishing connection :('));
            }
        }
    }

    isSelected = (testCaseId) => {
        const { test } = this.props;
        return test.queue.indexOf(testCaseId) !== -1;
    }

    toggleSelect = (testCaseId) => {
        const { test, toggleTestQueue } = this.props;
        toggleTestQueue(testCaseId, test.queue);
    }

    runTests = () => {
        const { bot, test, runTests } = this.props;
        runTests(bot.selected.authorization, [...test.queue]);
    }

    selectAll = () => {
        let { test, setQueue } = this.props;
        let queue = Object.keys(test.cases).map((testCaseId) => testCaseId);
        setQueue(queue);
    }

    clearQueue = () => {
        this.props.setQueue([]);
    }

    render() {
        const { bot, test, setQueue } = this.props;
        let { selectedLog } = this.state;
        return (
            <div className="tests bp-ff-nunito" style={{ padding: '5px' }}>
                <header>
                    <h1 className="bp-fs-2">Testes</h1>
                    <h2 className="bp-fs-4">{bot.selected ? bot.selected.name : "Selecione um bot"}</h2>
                    {
                        bot.selected && test.cases &&
                        <div className="testButtons">
                            <button
                                type="button"
                                onClick={this.runTests}
                                disabled={test.queue.length === 0 || test.testing}
                            >
                                {test.testing ? 'Executando testes...' : 'Iniciar testes!'}
                            </button>
                            <button
                                type="button"
                                onClick={this.selectAll}
                            >
                                Todos
                            </button>
                            <button
                                type="button"
                                onClick={this.clearQueue}
                            >
                                Nenhum
                            </button>
                        </div>
                    }
                </header>

                {
                    bot.selected && test.cases ?
                        <div className="testList">
                            {
                                Object.keys(test.cases).map((testCaseId) =>
                                    <TestCase
                                        key={testCaseId}
                                        selected={this.isSelected(testCaseId)}
                                        log={test.log ? test.log[testCaseId] : null}
                                        onClick={() => this.toggleSelect(testCaseId)} caseName={test.cases[testCaseId]}
                                        showLog={(log) => this.setState({ selectedLog: log })}
                                    />
                                )
                            }
                        </div>

                        : "É necessário selecionar um bot que teha casos de teste cadastrados"
                }
                {
                    selectedLog &&
                    <Modal title={selectedLog.title} close={() => this.setState({ selectedLog: null })} show={Boolean(selectedLog)}>
                        <div className="breakLines">
                            {selectedLog.value}
                        </div>
                    </Modal>
                }

            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Testing);
