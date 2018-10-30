import React, { Component } from 'react';
import QuickReplyItem from './QuickReplyItem';
import './QuickReplyAnswer.css';

class QuickReplyAnswer extends Component {
    constructor() {
        super();
        this.state = {
            itemForm: {
                title: '',
                payload: '',
            },
        };
    }

    handleChange = e => {
        const { name, value } = e.target;
        const newAnswer = { ...this.props.answer };
        newAnswer[name] = value;
        this.updateAnswer(newAnswer);
    };

    handleItemChange = e => {
        const { name, value } = e.target;
        const newItemForm = { ...this.state.itemForm };
        newItemForm[name] = value;
        this.setState({
            itemForm: newItemForm,
        });
    };

    addItem = () => {
        const newAnswer = { ...this.props.answer };
        const newItem = {
            title: this.state.itemForm.title,
        };
        if (this.state.itemForm.payload) {
            newItem.payload = this.state.itemForm.payload;
        }
        newAnswer.items = [...newAnswer.items, newItem];
        this.updateAnswer(newAnswer);
        this.setState({
            itemForm: {
                title: '',
                payload: '',
            },
        });
    };

    setItem = (item, index) => {
        const newAnswer = { ...this.props.answer };
        newAnswer.items[index] = item;
        this.updateAnswer(newAnswer);
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
            <div className="QuickReplyAnswer">
                {(() => {
                    if (this.props.editing) {
                        return (
                            <React.Fragment>
                                <div className="card bubble">
                                    <div className="wrap">
                                        <h4>QuickReply</h4>
                                        <textarea
                                            onChange={this.handleChange}
                                            name="text"
                                            value={this.props.answer.text}
                                        />
                                    </div>
                                </div>
                                <div className="chips-container">
                                    {this.props.answer.items.map((item, index) => (
                                        <QuickReplyItem
                                            item={item}
                                            index={index}
                                            setItem={this.setItem}
                                            key={index}
                                            delete={() => this.deleteItem(index)}
                                        />
                                    ))}
                                </div>
                                <div
                                    className="card"
                                    style={{ marginLeft: 'auto', marginRight: 'auto' }}
                                >
                                    <div className="wrap">
                                        <h4>Novo item</h4>
                                        <p>
                                            <b>Título:</b>{' '}
                                            <input
                                                onChange={this.handleItemChange}
                                                type="text"
                                                name="title"
                                                value={this.state.itemForm.title}
                                            />
                                        </p>
                                        <p>
                                            <b>Payload:</b>{' '}
                                            <input
                                                onChange={this.handleItemChange}
                                                type="text"
                                                name="payload"
                                                value={this.state.itemForm.payload}
                                            />
                                        </p>
                                        <button onClick={this.addItem}>+ Adicionar</button>
                                    </div>
                                </div>
                            </React.Fragment>
                        );
                    }
                    return (
                        <React.Fragment>
                            <div className="card bubble">
                                <div className="wrap">
                                    <p>{this.props.answer.text} </p>
                                </div>
                            </div>
                            <div className="chips-container">
                                {this.props.answer.items.map((item, index) => (
                                    <p key={index} className="chip">
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

export default QuickReplyAnswer;
