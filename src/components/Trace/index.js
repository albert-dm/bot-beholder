import React, { Component } from 'react'
import ReactJson from 'react-json-view'

import State from './State'
import './Trace.scss'

class Trace extends Component {
    render() {
        let { input, timestamp, elapsedMilliseconds, states, error } = this.props.data;
        return (
            <div className="Trace">
            <span class="date">{new Date(timestamp).toLocaleString()}</span>
                <header>
                    <h1 className={error ? "error" : ""}><i class="far fa-comment-dots"></i> {input}</h1>
                    <p><i class="fas fa-stopwatch"></i> {elapsedMilliseconds}ms</p>
                </header>
                <div class="states">
                    {states.map( (state) => <State data={state} key={state.id} />)}
                </div>
                {<ReactJson src={this.props.data} collapsed={true} displayDataTypes={false} />}
            </div>
        )
    }
}

export default Trace