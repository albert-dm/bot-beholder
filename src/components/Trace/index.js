import React, { Component } from 'react';
import ReactJson from 'react-json-view';

import State from './State';
import './Trace.scss';

class Trace extends Component {
    render() {
        const { input, timestamp, elapsedMilliseconds, states, error } = this.props.data;
        return (
            <div className="Trace">
                <span className="date">{new Date(timestamp).toLocaleString()}</span>
                <header>
                    <h1 className={error ? 'error' : ''}>
                        <i className="far fa-comment-dots" /> {input}
                    </h1>
                    <p>
                        <i className="fas fa-stopwatch" /> {elapsedMilliseconds}
                        ms
                    </p>
                </header>
                <div className="states">
                    {states.map(state => (
                        <State data={state} key={state.id} />
                    ))}
                </div>
                {<ReactJson src={this.props.data} collapsed displayDataTypes={false} />}
            </div>
        );
    }
}

export default Trace;
