import React, { Component } from 'react';

class TextAnswer extends Component {
    handleChange = e => {
        const { name, value } = e.target;
        const newAnswer = { ...this.props.answer };
        newAnswer[name] = value;
        // (TODO)validar resposta, provavelmente usando um schema
        this.props.setAnswer(newAnswer, this.props.index);
    };

    render() {
        return (
            <div className="card bubble">
                <div className="wrap">
                    {(() => {
                        if (this.props.editing) {
                            return (
                                <React.Fragment>
                                    <h4>Mensagem de Texto</h4>
                                    <textarea
                                        onChange={this.handleChange}
                                        name="text"
                                        value={this.props.answer.text}
                                        required
                                    />
                                </React.Fragment>
                            );
                        }
                        return (
                            <React.Fragment>
                                <p>{this.props.answer.text}</p>
                            </React.Fragment>
                        );
                    })()}
                </div>
            </div>
        );
    }
}

export default TextAnswer;
