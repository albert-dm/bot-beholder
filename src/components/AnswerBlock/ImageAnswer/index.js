import React, { Component } from 'react';
import './ImageAnswer.scss';

class ImageAnswer extends Component {
    handleItemChange = e => {
        const { name, value } = e.target;
        const newAnswer = { ...this.props.answer };
        newAnswer.items[0][name] = value;
        this.updateAnswer(newAnswer);
    };

    updateAnswer = newAnswer => {
        this.props.setAnswer(newAnswer, this.props.index);
    };

    render() {
        return (
            <div className="ImageAnswer card bubble">
                {(() => {
                    if (this.props.editing) {
                        return (
                            <div className="wrap">
                                <h4>Mensagem de Imagem</h4>
                                <p>
                                    <b>Título:</b>{' '}
                                    <input
                                        onChange={this.handleItemChange}
                                        type="text"
                                        name="title"
                                        value={this.props.answer.items[0].title}
                                    />
                                </p>
                                <p>
                                    <b>Subtítulo:</b>
                                    <textarea
                                        onChange={this.handleItemChange}
                                        name="subtitle"
                                        value={this.props.answer.items[0].subtitle}
                                    />
                                </p>
                                <p>
                                    <b>URL:</b>{' '}
                                    <input
                                        onChange={this.handleItemChange}
                                        type="text"
                                        name="url"
                                        value={this.props.answer.items[0].url}
                                    />
                                </p>
                            </div>
                        );
                    }
                    return (
                        <React.Fragment>
                            <img src={this.props.answer.items[0].url} alt="" />
                            <br />
                            <div className="wrap">
                                <strong>{this.props.answer.items[0].title}</strong>
                                <p>{this.props.answer.items[0].subtitle}</p>
                            </div>
                        </React.Fragment>
                    );
                })()}
            </div>
        );
    }
}

export default ImageAnswer;
