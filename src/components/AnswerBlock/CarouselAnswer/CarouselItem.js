import React, { Component } from 'react';
import CarouselItemButton from './CarouselItemButton';

class CarouselItem extends Component {
    constructor() {
        super();
        this.state = {
            buttonForm: {
                text: '',
                payload: '',
                url: '',
            },
        };
    }

    handleChange = e => {
        const { name, value } = e.target;
        const newItem = { ...this.props.item };
        newItem[name] = value;
        this.updateItem(newItem);
    };

    handleButtonChange = e => {
        const { name, value } = e.target;
        const newButton = { ...this.state.buttonForm };
        newButton[name] = value;
        this.setState({
            buttonForm: newButton,
        });
    };

    addButton = () => {
        const newItem = { ...this.props.item };
        const newButton = {
            text: this.state.buttonForm.text,
            payload: this.state.buttonForm.payload,
            url: this.state.buttonForm.url,
        };
        newItem.buttons = [...newItem.buttons, newButton];
        this.updateItem(newItem);
        this.setState({
            buttonForm: {
                text: '',
                payload: '',
                url: '',
            },
        });
    };

    setButton = (button, index) => {
        const newItem = { ...this.props.item };
        newItem.buttons[index] = button;
        this.updateItem(newItem);
    };

    deleteButton = index => {
        const newItem = { ...this.props.item };
        newItem.buttons.splice(index, 1);
        this.updateItem(newItem);
    };

    updateItem = newItem => {
        // (TODO)validar resposta, provavelmente usando um schema
        this.props.setItem(newItem, this.props.index);
    };

    render() {
        return (
            <div className="card carousel">
                {(() => {
                    if (this.props.editing) {
                        return (
                            <div className="wrap">
                                <i
                                    onClick={this.props.delete}
                                    className="far fa-trash-alt right delete"
                                />
                                <p>
                                    <b>Título:</b>{' '}
                                    <input
                                        onChange={this.handleChange}
                                        type="text"
                                        name="title"
                                        value={this.props.item.title}
                                    />
                                </p>
                                <p>
                                    <b>Subtítulo:</b>{' '}
                                    <textarea
                                        onChange={this.handleChange}
                                        name="subtitle"
                                        value={this.props.item.subtitle}
                                    />
                                </p>
                                <p>
                                    <b>URL:</b>{' '}
                                    <input
                                        onChange={this.handleChange}
                                        type="text"
                                        name="url"
                                        value={this.props.item.url}
                                    />
                                </p>
                                <p>
                                    <b>Botões:</b>
                                </p>
                                {this.props.item.buttons.map((button, index) => (
                                    <CarouselItemButton
                                        button={button}
                                        key={index}
                                        index={index}
                                        delete={() => this.deleteButton(index)}
                                        setButton={this.setButton}
                                    />
                                ))}
                                <div className="block">
                                    <h4>Novo Botão</h4>
                                    <p>
                                        <b>Texto:</b>{' '}
                                        <input
                                            onChange={this.handleButtonChange}
                                            type="text"
                                            name="text"
                                            value={this.state.buttonForm.text}
                                        />
                                    </p>
                                    <p>
                                        <b>Payload:</b>{' '}
                                        <input
                                            onChange={this.handleButtonChange}
                                            type="text"
                                            name="payload"
                                            value={this.state.buttonForm.payload}
                                        />
                                    </p>
                                    <p>
                                        <b>URL:</b>{' '}
                                        <input
                                            onChange={this.handleButtonChange}
                                            type="text"
                                            name="url"
                                            value={this.state.buttonForm.url}
                                        />
                                    </p>
                                    <button onClick={this.addButton}>+ Adicionar</button>
                                </div>
                            </div>
                        );
                    }
                    return (
                        <React.Fragment>
                            {this.props.item.url ? (
                                <img src={this.props.item.url} alt="" />
                            ) : (
                                <div className="img-placeholder" />
                            )}
                            <br />
                            <div className="wrap">
                                <strong>{this.props.item.title}</strong>
                                <p>{this.props.item.subtitle}</p>
                            </div>
                            <div>
                                {this.props.item.buttons.map((button, index) => (
                                    <p key={index} className="menuItem">
                                        {button.text}{' '}
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

export default CarouselItem;
