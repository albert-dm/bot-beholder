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
    deleteCase: (useCaseId, cases) => dispatch(deleteCase(useCaseId, cases)),
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
            showConfigurations: false
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
                blocks: [],
                selected: '',
                showModal: true,
                aiScore: 6,
            };
            saveCase(newCase, test.cases)
        };
    }

    addBlock = block => {
        block.id = guid();
        let { test, saveCase } = this.props;
        let newCase = test.selectedCase;
        newCase.blocks = [...newCase.blocks, block];
        saveCase(newCase, test.cases)
    };

    deleteBlock = index => {
        let { test, saveCase } = this.props;
        let newCase = test.selectedCase;
        if (index === this.state.selected) {
            newCase.selected = '';
        }
        newCase.blocks.splice(index, 1);
        saveCase(newCase, test.cases)
    };

    selectBlock = index => {
        let { test, saveCase } = this.props;
        let newCase = test.selectedCase;
        newCase.selected = index;
        saveCase(newCase, test.cases)
    };

    setBlock = block => {
        let { test, saveCase } = this.props;
        let newCase = test.selectedCase;
        newCase.blocks[newCase.selected] = block;
        saveCase(newCase, test.cases)
    };

    swapBlocks = (e) => {
        let { test, saveCase } = this.props;
        let newCase = test.selectedCase;
        let { newIndex, oldIndex } = e;
        newCase.blocks[newIndex] = newCase.blocks.splice(oldIndex, 1, newCase.blocks[newIndex])[0];
        saveCase(newCase, test.cases);
    }

    downloadJson = () => {
        let { test } = this.props;
        let newCase = test.selectedCase;
        let json = {
            botIdentity: this.props.bot.selected.shortName,
            botKey: this.props.bot.selected.authorization,
            setUp: JSON.stringify(JSON.parse(newCase.setUp)),
            userVariables: newCase.userVariables,
            testCases: JSON.stringify(newCase.blocks),
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
        try {
            newCase = {
                setUp: json.setUp,
                userVariables: json.userVariables,
                blocks: JSON.parse(json.testCases),
                aiScore: JSON.parse(json.aiScore),
                flowTitle: title
            };
        } catch (error) {
            newCase.error = 'Arquivo JSON incompatível!';
        }
        saveCase(newCase, test.cases)
    };

    toggleConfigurations = () => {
        this.setState(prevstate => ({ showConfigurations: !prevstate.showConfigurations }));
    };

    render() {
        let { bot, deleteCase, test } = this.props;
        let { showConfigurations } = this.state;
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
                                        dataSource={test.selectedCase.blocks}
                                        row={(block, index) => <Block
                                            selected={index === test.selectedCase.selected}
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
                                {...test.selectedCase.blocks[test.selectedCase.selected]}
                                setBlock={this.setBlock}
                                selected={test.selectedCase.selected}
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
