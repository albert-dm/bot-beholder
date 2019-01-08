import React, { Component } from 'react';
import ReactJson from 'react-json-view';

import State from './State';
import Contact from '../Contact';
import './Trace.scss';

class Trace extends Component {
    render() {
        const { input, timestamp, elapsedMilliseconds, states, error, user } = this.props.data;
        let { showDetails } = this.props;
        return (
            <div className="Trace">
                <span className="date">{new Date(timestamp).toLocaleString()}</span>
                <header>
                    <h1 className={error ? 'error' : ''}>
                        <i className="far fa-comment-dots" /> {input}
                    </h1>
                    <p>
                        <i className="fas fa-stopwatch" /> {elapsedMilliseconds}ms
                    </p>
                    <Contact id={user} />
                </header>
                <div className="states">
                    {states.map(state => (
                        <State data={state} key={state.id} showDetails={() => showDetails(state)} />
                    ))}
                </div>
                <ReactJson src={this.props.data} collapsed displayDataTypes={false} />
            </div>
        );
    }
}

export default Trace;
