import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Modal.scss';

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
                        <div className="text">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            )
        );
    }
}

Modal.protoTypes = {
    show: PropTypes.bool.isRequired,
    close: PropTypes.func,
    title: PropTypes.string
}

export default Modal;
