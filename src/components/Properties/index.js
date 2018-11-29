import React, { Component } from 'react';
import './Properties.scss';
import ToolBar from '../ToolBar';
import AnswerBlock from '../AnswerBlock';
import ReactDragList from 'react-drag-list'

class Properties extends Component {
    constructor(props) {
        super(props);
        this.div = React.createRef();
        this.state = {
            blockName: props.blockName,
            input: props.input
        }
    }

    handleChange = e => {
        const { name, value } = e.target;
        const newState = { ...this.state };
        newState[name] = value;
        this.setState(newState);
    };

    saveChange = e => {
        const { name, value } = e.target;
        const newBlock = { ...this.props };
        newBlock[name] = value;
        this.props.setBlock(newBlock);
    };

    addAnswer = answer => {
        const newBlock = { ...this.props };
        const expected = [...this.props.expected];
        newBlock.expected = expected;
        if (answer.type === 'ai') {
            newBlock.expected.unshift(answer);
        } else {
            newBlock.expected.push(answer);
        }
        this.props.setBlock(newBlock);
    };

    swapAnswer = (e) => {
        const newBlock = { ...this.props };
        const expected = [...this.props.expected];
        let { newIndex, oldIndex } = e;
        expected[newIndex] = expected.splice(oldIndex, 1, expected[newIndex])[0];
        newBlock.expected = expected;
        this.props.setBlock(newBlock);
    }

    deleteAnswer = index => {
        const newBlock = { ...this.props };
        const expected = [...this.props.expected];
        expected.splice(index, 1);
        newBlock.expected = expected;
        this.props.setBlock(newBlock);
    };

    setAnswer = (answer, index) => {
        const newBlock = { ...this.props };
        const expected = [...this.props.expected];
        expected[index] = answer;
        newBlock.expected = expected;
        this.props.setBlock(newBlock);
    };

    scrollBottom = () => {
        this.div.current.scrollTop = this.div.current.scrollHeight;
    };

    componentDidUpdate = () => {
        this.scrollBottom();
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.blockName !== this.state.blockName) {
            this.setState({ blockName: nextProps.blockName });
        }
        if (nextProps.input !== this.state.input) {
            this.setState({ input: nextProps.input });
        }
    }

    render() {
        let { expected } = this.props;
        let { blockName, input } = this.state
        return (
            <div className="Properties" ref={this.div} style={this.props.style}>
                <h2>Propriedades</h2>
                {this.props.selected !== '' ? (
                    <React.Fragment>
                        <form>
                            <b>Nome do bloco:</b>
                            <input
                                onChange={this.handleChange}
                                onBlur={this.saveChange}
                                type="text"
                                name="blockName"
                                value={blockName}
                                required
                            />
                            <br />
                            <br />
                            <b>Input que leva ao bloco:</b>
                            <input
                                onChange={this.handleChange}
                                onBlur={this.saveChange}
                                type="text"
                                name="input"
                                value={input}
                                required
                            />
                            <br />
                        </form>
                        <h3>Mensagens do bloco:</h3>
                        {
                            <ReactDragList
                                handles={false}
                                dataSource={expected}
                                onUpdate={this.swapAnswer}
                                row={(answer, index) => (
                                    <AnswerBlock
                                        key={blockName + input}
                                        answer={answer}
                                        index={index}
                                        deleteAnswer={() => {
                                            this.deleteAnswer(index);
                                        }}
                                        setAnswer={this.setAnswer.bind(this)}
                                        intents={this.props.intents}
                                        entities={this.props.entities}
                                    />
                                )}
                            />
                        }
                        <br />
                        <ToolBar
                            addAnswer={this.addAnswer.bind(this)}
                            answers={this.props.expected}
                        />
                    </React.Fragment>
                ) : (
                        <p>Selecione um bloco</p>
                    )}
            </div>
        );
    }
}

export default Properties;
