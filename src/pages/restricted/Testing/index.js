import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import { toggleTestQueue, runTests, setQueue, finishTest } from '../../../actions/TestActions';
import config from '../../../config';

import './testList.scss'

import { showModal, fetchingData, fetchingDataFinished } from '../../../actions/CommonActions';

var hubConnection;
const server = config.pretUrl;

const mapStateToProps = state => ({
    ...state,
});

const mapDispatchToProps = dispatch => ({
    toggleTestQueue: (testCaseId, queue) => dispatch(toggleTestQueue(testCaseId, queue)),
    runTests: () => dispatch(runTests()),
    finishTest: (testId, log) => dispatch(finishTest(testId, log)),
    setQueue: (queue) => dispatch(setQueue(queue)),
    showModal: (title, content) => dispatch(showModal(title, content)),
    fetchingData: () => dispatch(fetchingData()),
    fetchingDataFinished: () => dispatch(fetchingDataFinished()),
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
    componentDidMount() {
        let { fetchingData, fetchingDataFinished, finishTest } = this.props;
        hubConnection = new HubConnectionBuilder()
            .withUrl(server)
            .configureLogging(LogLevel.Information)
            .build();

        hubConnection
            .start(() => fetchingData())
            .then(() => fetchingDataFinished())
            .catch(err => console.log('Error while establishing connection :('));

        hubConnection.on('ReceiveMessage', (msg) => {
            finishTest(msg.testId, msg.testResult);
            finishTest();
        });
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
        runTests();
        let payload = {
            "botAuthorization": `Key ${bot.selected.authorization}`,
            "testsIds": test.queue
        }
        console.log("Enviando payload: ", payload);
        hubConnection.send('SendTestResultToCaller', payload);
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
        const { bot, test, showModal } = this.props;
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
                                disabled={test.testing}
                            >
                                Todos
                            </button>
                            <button
                                type="button"
                                onClick={this.clearQueue}
                                disabled={test.testing}
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
                                        showLog={(log) => showModal(log.title, <div className="breakLines">{log.value}</div>)}
                                    />
                                )
                            }
                        </div>

                        : "É necessário selecionar um bot que teha casos de teste cadastrados"
                }

            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Testing);
