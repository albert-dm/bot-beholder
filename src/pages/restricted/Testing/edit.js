import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import FlowDisplay from '../../../components/FlowDisplay';
import Properties from '../../../components/Properties';
import Block from '../../../components/Block';
import Config from '../../../components/Config';
import { saveCase, deleteCase } from '../../../actions/TestActions'

import ReactDragList from 'react-drag-list'

const mapStateToProps = state => ({
    ...state,
});

const mapDispatchToProps = dispatch => ({
    saveCase: (useCase, cases) => dispatch(saveCase(useCase, cases)),
    deleteCase: (useCaseId, cases) => dispatch(deleteCase(useCaseId, cases))
});

const guid = () => {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
};

const grid = {
    display: 'grid',
    gridTemplateColumns: '50% 50%',
    gridTemplateAreas: '"flow properties"',
};

const flow = {
    gridArea: 'flow',
};

const properties = {
    gridArea: 'properties',
};

class Testing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showConfigurations: false,
            selected: ''
        }
    }

    componentWillReceiveProps = (newProps) => {
        //console.log(newProps);
        if (newProps.test.selectedId !== this.props.test.selectedId) {
            console.log('troca');
            this.setState({
                showConfigurations: false,
                selected: ''
            });
        }
    }

    setTitle = newTitle => {
        let { test, saveCase } = this.props;
        let newCase = test.selectedCase;
        newCase.flowTitle = newTitle;
        saveCase(newCase, test.cases)
    };

    setConfig = (configKey, configValue) => {
        let { test, saveCase } = this.props;
        let newCase = test.selectedCase;
        newCase[configKey] = configValue;
        saveCase(newCase, test.cases)
    };

    clearFlow = () => {
        let { test, saveCase } = this.props;
        let newCase = test.selectedCase;
        if (window.confirm('Tem certeza que deseja limpar o fluxo?')) {
            newCase = {
                ...newCase,
                flowTitle: 'Novo Fluxo',
                setUp: '[]',
                userVariables: {},
                testCases: [],
                aiScore: 6,
                botIdentity: this.props.bot.selected.shortName,
                botKey: this.props.bot.selected.authorization
            };
            saveCase(newCase, test.cases)
        };
    }

    addBlock = block => {
        block.id = guid();
        let { test, saveCase } = this.props;
        let newCase = test.selectedCase;
        newCase.testCases = [...newCase.testCases, block];
        saveCase(newCase, test.cases)
    };

    deleteBlock = index => {
        let { test, saveCase } = this.props;
        let newCase = test.selectedCase;
        if (index === this.state.selected) {
            newCase.selected = '';
        }
        newCase.testCases.splice(index, 1);
        saveCase(newCase, test.cases)
    };

    selectBlock = index => {
        this.setState({ selected: index });
    };

    setBlock = block => {
        let { test, saveCase } = this.props;
        let { selected } = this.state;
        let newCase = test.selectedCase;
        newCase.testCases[selected] = block;
        saveCase(newCase, test.cases)
    };

    swapBlocks = (e) => {
        let { test, saveCase } = this.props;
        let newCase = test.selectedCase;
        let { newIndex, oldIndex } = e;
        newCase.testCases[newIndex] = newCase.testCases.splice(oldIndex, 1, newCase.testCases[newIndex])[0];
        saveCase(newCase, test.cases);
    }

    downloadJson = () => {
        let { test, bot } = this.props;
        let newCase = test.selectedCase;
        let json = {
            botIdentity: bot.selected.shortName,
            botKey: bot.selected.authorization,
            setUp: JSON.stringify(JSON.parse(newCase.setUp)),
            userVariables: newCase.userVariables,
            testCases: JSON.stringify(newCase.testCases),
            aiScore: Number(newCase.aiScore),
        };

        const blob = new Blob([JSON.stringify(json)], { type: 'text/json' });

        let e = document.createEvent('MouseEvents');

        const a = document.createElement('a');

        a.download = `${newCase.flowTitle}.json`;
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
        e.initMouseEvent(
            'click',
            true,
            false,
            window,
            0,
            0,
            0,
            0,
            0,
            false,
            false,
            false,
            false,
            0,
            null,
        );
        a.dispatchEvent(e);
    };

    uploadJson = (json, title) => {
        let { test, saveCase } = this.props;
        let newCase = test.selectedCase;
        //console.log(json);
        try {
            newCase = {
                ...newCase,
                id: newCase.id || new Date().getTime(),
                setUp: json.setUp,
                userVariables: json.userVariables,
                testCases: JSON.parse(json.testCases),
                aiScore: JSON.parse(json.aiScore),
                flowTitle: title
            };
            //console.log(newCase);
            saveCase(newCase, test.cases);
        } catch (error) {
            newCase.error = 'Arquivo JSON incompatível!';
        } finally {

        }
    };

    toggleConfigurations = () => {
        this.setState(prevstate => ({ showConfigurations: !prevstate.showConfigurations }));
    };

    render() {
        let { bot, deleteCase, test } = this.props;
        let { showConfigurations, selected } = this.state;
        return (
            <div style={grid}>
                {
                    test.selectedCase ?
                        <React.Fragment>
                            <FlowDisplay
                                style={flow}
                                flowTitle={test.selectedCase.flowTitle}
                                setTitle={this.setTitle}
                                addBlock={this.addBlock}
                                download={this.downloadJson}
                                uploadJson={this.uploadJson}
                                clearFlow={this.clearFlow}
                                openConfig={this.toggleConfigurations}
                                delete={() => window.confirm('Tem certeza que deseja excluir esse caso de uso?') && deleteCase(test.selectedId, test.cases)}
                            >
                                <ReactCSSTransitionGroup
                                    transitionName="blocks"
                                    transitionEnterTimeout={200}
                                    transitionLeaveTimeout={200}
                                >
                                    <ReactDragList
                                        className="Blocks"
                                        rowClassName="BlockItem"
                                        dragClass="dragging"
                                        ghostClass="drop"
                                        onUpdate={this.swapBlocks}
                                        dataSource={test.selectedCase.testCases}
                                        row={(block, index) => <Block
                                            selected={index === selected}
                                            block={block}
                                            onClick={() => this.selectBlock(index)}
                                            key={block.id}
                                            deleteBlock={e => {
                                                e.stopPropagation();
                                                this.deleteBlock(index);
                                            }}
                                        />}
                                    />
                                </ReactCSSTransitionGroup>
                            </FlowDisplay>
                            <Properties
                                style={properties}
                                {...test.selectedCase.testCases[selected]}
                                setBlock={this.setBlock}
                                selected={selected}
                                intents={bot.selected.intents}
                                entities={bot.selected.entities}
                            />
                            <Config
                                show={showConfigurations}
                                close={this.toggleConfigurations}
                                setConfig={this.setConfig}
                                parameters={test.selectedCase}
                            />
                        </React.Fragment>
                        :
                        <p>Selecione um caso de teste</p>

                }
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Testing);
