import React, { Component } from 'react';
import TextAnswer from './TextAnswer';
import MenuAnswer from './MenuAnswer';
import QuickReplyAnswer from './QuickReplyAnswer';
import ImageAnswer from './ImageAnswer';
import CarouselAnswer from './CarouselAnswer';
import TrackAnswer from './TrackAnswer';
import JsonAnswer from './JsonAnswer';
import './AnswerBlock.scss';
import AiAnswer from './AiAnswer';

class AnswerBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            answer: props.answer
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.answer !== this.state.answer) {
            this.setState({ answer: nextProps.answer, editing: false });
        }
    }

    setAnswer = answer => {
        this.setState({ answer });
    }

    render() {
        let { answer } = this.state;
        return (
            <div
                className={`AnswerBlock${this.props.selected ? ' selected' : ''}`}
                onDoubleClick={() => this.setState({ editing: true })}
            >
                <i
                    onClick={this.props.deleteAnswer}
                    className="far fa-trash-alt right icon-btn delete"
                />
                {(() => {
                    if (this.state.editing) {
                        return (
                            <i
                                onClick={() => { this.setState({ editing: false }); this.props.setAnswer(answer, this.props.index); }}
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
                    switch (answer.type) {
                        case 'text':
                            return (
                                <TextAnswer
                                    answer={answer}
                                    setAnswer={this.setAnswer}
                                    index={this.props.index}
                                    editing={this.state.editing}
                                />
                            );
                        case 'menu':
                            return (
                                <MenuAnswer
                                    answer={answer}
                                    setAnswer={this.setAnswer}
                                    index={this.props.index}
                                    editing={this.state.editing}
                                />
                            );
                        case 'quickreply':
                            return (
                                <QuickReplyAnswer
                                    answer={answer}
                                    setAnswer={this.setAnswer}
                                    index={this.props.index}
                                    editing={this.state.editing}
                                />
                            );
                        case 'carousel':
                            return (
                                <CarouselAnswer
                                    answer={answer}
                                    setAnswer={this.setAnswer}
                                    index={this.props.index}
                                    editing={this.state.editing}
                                    delete={this.props.deleteAnswer}
                                />
                            );
                        case 'image':
                            return (
                                <ImageAnswer
                                    answer={answer}
                                    setAnswer={this.setAnswer}
                                    index={this.props.index}
                                    editing={this.state.editing}
                                />
                            );
                        case 'track':
                            return (
                                <TrackAnswer
                                    answer={answer}
                                    setAnswer={this.setAnswer}
                                    index={this.props.index}
                                    editing={this.state.editing}
                                />
                            );
                        case 'ai':
                            return (
                                <AiAnswer
                                    answer={answer}
                                    setAnswer={this.setAnswer}
                                    index={this.props.index}
                                    editing={this.state.editing}
                                    intents={this.props.intents}
                                    entities={this.props.entities}
                                />
                            );
                        case 'json':
                            return (
                                <JsonAnswer
                                    answer={answer}
                                    setAnswer={this.setAnswer}
                                    index={this.props.index}
                                    editing={this.state.editing}
                                />
                            );
                        default:
                            return <p>Invalid Answer</p>;
                    }
                })()}
            </div>
        );
    }
}

export default AnswerBlock;
