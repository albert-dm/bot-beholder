import React, { Component } from 'react';

class State extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mouseX: 0,
            mouseY: 0,
        };
    }

    onHover = e => {
        let left = `${e.clientX + 20}px`;
        var top = `${e.target.offsetTop + 20}px`;
        this.setState({ mouseX: left, mouseY: top });
    };

    render() {
        let {
            extensionData,
            timestamp,
            elapsedMilliseconds,
            inputActions,
            outputActions,
            error,
        } = this.props.data;
        const { mouseX, mouseY } = this.state;
        return (
            <div className={`State block ${error ? 'error' : ''}`}>
                <span className="date">{new Date(timestamp).toLocaleString()}</span>
                <h1>{extensionData.name}</h1>
                <p className="elapsedTime" onMouseOver={this.onHover}>
                    <i className="fas fa-stopwatch" /> {elapsedMilliseconds}
                    ms
              </p>
                <div className="actions" style={{ left: mouseX, top: mouseY }}>
                    {
                        inputActions &&
                        inputActions.length > 0 && (
                            <ul>
                                <p>Entrada (bloco seguinte)</p>
                                {inputActions.map((action, idx) => (
                                    <li key={idx} className={action.error ? 'error' : ''}>
                                        {`${action.type} - ${action.elapsedMilliseconds}ms`}
                                    </li>
                                ))}
                            </ul>
                        )
                    }
                    {
                        outputActions &&
                        outputActions.length > 0 && (
                            <ul>
                                <p>Saída</p>
                                {outputActions.map((action, idx) => (
                                    <li key={idx} className={action.error ? 'error' : ''}>
                                        {`${action.type} - ${action.elapsedMilliseconds}ms`}
                                    </li>
                                ))}
                            </ul>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default State;
