import React, { Component } from 'react';
import Select from 'react-select';
import './AiAnswer.scss';

class AiAnswer extends Component {
    constructor(props) {
        super(props);
        this.intents = this.props.intents.map(intent => ({ value: intent.id, label: intent.name }));
        this.entities = this.props.entities.map(entity => ({
            label: entity.name,
            options: entity.values.map(value => ({ label: value.name, value: value.name })),
        }));
    }

    handleEntityChange = values => {
        const newAnswer = { ...this.props.answer };
        newAnswer.entities = values.map(value => value.label);
        this.props.setAnswer(newAnswer, this.props.index);
    };

    handleIntentChange = value => {
        const newAnswer = { ...this.props.answer };
        newAnswer.intent = value;
        this.props.setAnswer(newAnswer, this.props.index);
    };

    render() {
        return (
            <div className="AiAnswer card">
                <div className="wrap">
                    {(() => {
                        if (this.props.editing) {
                            return (
                                <React.Fragment>
                                    <h4>Inteligência Artificial</h4>
                                    <p>
                                        <b>Intenção:</b>
                                        <Select
                                            defaultValue={this.props.answer.intent}
                                            options={this.intents}
                                            onChange={this.handleIntentChange}
                                        />
                                    </p>
                                    <p>
                                        <b>Entidades:</b>{' '}
                                        <Select
                                            defaultValue={this.props.answer.entities.map(value => ({
                                                label: value,
                                                value,
                                            }))}
                                            options={this.entities}
                                            isMulti
                                            closeMenuOnSelect={false}
                                            onChange={this.handleEntityChange}
                                        />
                                    </p>
                                </React.Fragment>
                            );
                        }
                        return (
                            <React.Fragment>
                                <h4>Inteligência Artificial</h4>
                                <p>Intenção: {this.props.answer.intent.label}</p>
                                <p>Entidades: {this.props.answer.entities.join(', ')}</p>
                            </React.Fragment>
                        );
                    })()}
                </div>
            </div>
        );
    }
}

export default AiAnswer;
