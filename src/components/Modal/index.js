import React, { Component } from 'react';
import './Modal.css';

class Modal extends Component {
    render() {
        return (
            this.props.show && (
                <div className="Modal overlay" onClick={this.props.close}>
                    <div
                        className="card content"
                        onClick={e => {
                            e.stopPropagation();
                        }}
                    >
                        <i
                            className="fas fa-times right icon-btn delete"
                            onClick={this.props.close}
                        />
                        <h2>{this.props.title}</h2>
                        {this.props.children}
                    </div>
                </div>
            )
        );
    }
}

export default Modal;
