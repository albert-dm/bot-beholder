import React, { Component } from 'react';

class TrackAnswer extends Component {
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
                                    <h4>Verificação de Tracking</h4>
                                    <p>
                                        <b>Categoria:</b>{' '}
                                        <input
                                            onChange={this.handleChange}
                                            type="text"
                                            name="category"
                                            value={this.props.answer.category}
                                            placeholder="Exatamente como no bot (case sensitive)"
                                            required
                                        />
                                    </p>
                                    <p>
                                        <b>Ação:</b>{' '}
                                        <input
                                            onChange={this.handleChange}
                                            type="text"
                                            name="action"
                                            value={this.props.answer.action}
                                            placeholder="Exatamente como no bot (case sensitive)"
                                            required
                                        />
                                    </p>
                                </React.Fragment>
                            );
                        }
                        return (
                            <React.Fragment>
                                <h4>Verificação de Tracking</h4>
                                <p>Categoria: {this.props.answer.category}</p>
                                <p>Ação: {this.props.answer.action}</p>
                            </React.Fragment>
                        );
                    })()}
                </div>
            </div>
        );
    }
}

export default TrackAnswer;
