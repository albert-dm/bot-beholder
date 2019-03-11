import React, { Component } from 'react';

import AnswerModels from '../../models/AnswerModels';

import textImg from '../ToolBar/img/text.png';
import imageImg from '../ToolBar/img/image.png';
import jsonImg from '../ToolBar/img/json.png';

import TextAnswer from '../AnswerBlock/TextAnswer';
import ImageAnswer from '../AnswerBlock/ImageAnswer';
import JsonAnswer from '../AnswerBlock/JsonAnswer';
import './InputBlock.scss';

class InputBlock extends Component {
    constructor(props) {
        super(props);
        let input;
        if (typeof props.input === 'string') {
            input = { type: 'text', text: props.input };
        } else {
            input = props.input;
        }
        this.state = {
            editing: false,
            input
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.input !== this.state.input) {
            this.setState({ input: nextProps.input, editing: false });
        }
    }

    changeInput = input => {
        this.setState({ input });
    }

    render() {
        let { input } = this.state;
        return (
            <div
                className="InputBlock"
                onDoubleClick={() => this.setState({ editing: true })}
            >
                {(() => {
                    if (this.state.editing) {
                        return (
                            <i
                                onClick={() => { this.setState({ editing: false }); this.props.setInput(input); }}
                                className="fas fa-check right icon-btn"
                            />
                        );
                    }
                    return (
                        <i
                            onClick={() => this.setState({ editing: true })}
                            className="far fa-edit right icon-btn"
                        />
                    );
                })()}
                <br />
                {(() => {
                    switch (input.type) {
                        case 'text':
                            return (
                                <TextAnswer
                                    answer={input}
                                    setAnswer={this.changeInput}
                                    editing={this.state.editing}
                                />
                            );
                        case 'image':
                            return (
                                <ImageAnswer
                                    answer={input}
                                    setAnswer={this.changeInput}
                                    editing={this.state.editing}
                                />
                            );
                        case 'json':
                            return (
                                <JsonAnswer
                                    answer={input}
                                    setAnswer={this.changeInput}
                                    editing={this.state.editing}
                                />
                            );
                        default:
                            return <p>Invalid Input</p>;
                    }
                })()}


                {
                    this.state.editing &&
                    <div className="ToolBar">
                        <img
                            className="action"
                            onClick={() => this.changeInput(AnswerModels.text)}
                            alt="Text"
                            title="Text"
                            src={textImg}
                        />
                        <img
                            className="action"
                            onClick={() => this.changeInput(AnswerModels.image)}
                            alt="Image"
                            title="Image"
                            src={imageImg}
                        />
                        <img
                            className="action"
                            onClick={() => this.changeInput(AnswerModels.json)}
                            alt="Json"
                            title="Json"
                            src={jsonImg}
                        />
                    </div>}
            </div>
        );
    }
}

export default InputBlock;
