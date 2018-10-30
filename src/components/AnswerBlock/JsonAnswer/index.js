import React, { Component } from 'react';

class JsonAnswer extends Component {
    handleChange = e => {
        const { name, value } = e.target;
        const newAnswer = { ...this.props.answer };
        newAnswer[name] = value;
        this.props.setAnswer(newAnswer, this.props.index);
    };

    render() {
        return (
            <div className="card">
                <div className="wrap">
                    {(() => {
                        if (this.props.editing) {
                            return (
                                <React.Fragment>
                                    <h4>Mensagem de JSON (conteúdo dinâmico)</h4>
                                    <b>Texto:</b>
                                    <textarea
                                        onChange={this.handleChange}
                                        type="text"
                                        name="text"
                                        value={this.props.answer.text}
                                        required
                                    />
                                </React.Fragment>
                            );
                        }
                        return (
                            <React.Fragment>
                                <p>Conteúdo dinâmico (JSON)</p>
                            </React.Fragment>
                        );
                    })()}
                </div>
            </div>
        );
    }
}

export default JsonAnswer;
