import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleTestQueue, setQueue, finishTest } from '../../../actions/TestActions';
import { hubConnection } from '../../../services/SocketService';

import './testList.scss'

import { showModal, fetchingData, fetchingDataFinished } from '../../../actions/CommonActions';

const mapStateToProps = state => ({
    ...state,
});

const mapDispatchToProps = dispatch => ({
    toggleTestQueue: (testCaseId, queue) => dispatch(toggleTestQueue(testCaseId, queue)),
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
    componentDidMount = () => {
        hubConnection.on('AnswerCommand', (id, route, value) => this.setState({ traces: value }));
        //hubConnection.on('trace', (trace) => this.setState(prevState => ({ traces: [trace, ...prevState.traces] })));
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
        const { bot, test } = this.props;
        test.queue.forEach(testId => {
            hubConnection.send('SendCommand', 'id', '/test', bot.selected.authorization, testId)
        })
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
