import React, { Component } from 'react';
import './MenuAnswer.css';

class MenuAnswer extends Component {
    handleChange = e => {
        const { name, value } = e.target;
        const newAnswer = { ...this.props.answer };
        newAnswer[name] = value;
        this.updateAnswer(newAnswer);
    };

    handleKeyPress = event => {
        if (event.key === 'Enter') {
            const newAnswer = { ...this.props.answer };
            const newItem = { title: event.target.value };
            newAnswer.items = [...newAnswer.items, newItem];
            this.updateAnswer(newAnswer);
            event.target.value = '';
        }
    };

    deleteItem = index => {
        const newAnswer = { ...this.props.answer };
        newAnswer.items.splice(index, 1);
        this.updateAnswer(newAnswer);
    };

    updateAnswer = newAnswer => {
        // (TODO)validar resposta, provavelmente usando um schema
        this.props.setAnswer(newAnswer, this.props.index);
    };

    render() {
        return (
            <div className="MenuAnswer card bubble">
                {(() => {
                    if (this.props.editing) {
                        return (
                            <React.Fragment>
                                <div className="wrap">
                                    <h4>Mensagem de Menu</h4>
                                    <textarea
                                        onChange={this.handleChange}
                                        name="text"
                                        value={this.props.answer.text}
                                    />
                                </div>
                                <div>
                                    {this.props.answer.items.map((item, index) => (
                                        <p key={index} className="menuItem">
                                            {item.title}{' '}
                                            <span
                                                className="far fa-trash-alt delete right"
                                                onClick={() => {
                                                    this.deleteItem(index);
                                                }}
                                            />
                                        </p>
                                    ))}
                                    <p className="menuItem">
                                        <input
                                            onKeyPress={this.handleKeyPress}
                                            type="text"
                                            placeholder="+ Novo item do menu"
                                        />
                                    </p>
                                </div>
                            </React.Fragment>
                        );
                    }
                    return (
                        <React.Fragment>
                            <div className="wrap">
                                <p>{this.props.answer.text} </p>
                            </div>
                            <div>
                                {this.props.answer.items.map((item, index) => (
                                    <p key={index} className="menuItem">
                                        {item.title}{' '}
                                    </p>
                                ))}
                            </div>
                        </React.Fragment>
                    );
                })()}
            </div>
        );
    }
}

export default MenuAnswer;
