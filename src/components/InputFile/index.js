import React, { Component } from 'react';
import './InputFile.css';

class componentName extends Component {
    render() {
        return (
            <div className={`InputFile ${this.props.className}` || ''} title={this.props.label}>
                <label>
                    <span className="btn">
                        <i className="fas fa-upload" />
                    </span>
                    <input type="file" onChange={this.props.onChange} accept={this.props.accept} />
                </label>
            </div>
        );
    }
}

export default componentName;
