import React, { Component } from 'react';
import Modal from '../Modal';
import { getIntents, getEntities } from '../../services/AiService';

class Config extends Component {
    constructor() {
        super();
        this.state = {
            botIdentity: false,
            botKey: false,
            newProperty: {
                key: '',
                value: '',
            },
        };
        this.keyField = React.createRef();
    }

    checkErrors = () => {
        this.setState({
            botIdentity: !this.props.parameters.botIdentity,
            botKey: !this.props.parameters.botKey,
        });
    };

    close = () => {
        if (!this.props.close()) {
            this.checkErrors();
        }
    };

    handleChange = e => {
        const { name, value, required } = e.target;
        this.props.setConfig(name, value);
        if (required) {
            this.setState({
                [name]: !value,
            });
        }
    };

    handlePropertyChange = e => {
        const { name, value } = e.target;
        const newProperty = { ...this.state.newProperty };
        newProperty[name] = value;
        this.setState({
            newProperty,
        });
    };

    addUserVariable = e => {
        e.preventDefault();
        const newUserVariables = { ...this.props.parameters.userVariables };
        newUserVariables[this.state.newProperty.key] = this.state.newProperty.value;
        this.props.setConfig('userVariables', newUserVariables);
        this.setState({
            newProperty: {
                key: '',
                value: '',
            },
        });
        this.keyField.current.focus();
    };

    deleteUserVariable = key => {
        let newUserVariables = { ...this.props.parameters.userVariables };
        delete newUserVariables[key];
        this.props.setConfig('userVariables', newUserVariables);
        this.setState({
            newProperty: {
                key: '',
                value: '',
            },
        });
    };

    handleUserVariableChange = e => {
        const { name, value } = e.target;
        let newUserVariables = { ...this.props.parameters.userVariables };
        newUserVariables[name] = value;
        this.props.setConfig('userVariables', newUserVariables);
    };

    render() {
        return (
            <Modal title="Configurações" show={this.props.show} close={this.close}>
                <div>
                    <label>
                        <b>Set up:</b>
                    </label>{' '}
                    <br />
                    <textarea
                        onChange={this.handleChange}
                        type="text"
                        name="setUp"
                        value={this.props.parameters.setUp}
                        rows="5"
                    />
                </div>
                <br />
                <div>
                    <b>User Variables: </b>
                    <br />
                    <div className="block">
                        {Object.keys(this.props.parameters.userVariables).map((key, index) => (
                            <div key={index}>
                                <b>{key}:</b>
                                <input
                                    type="text"
                                    className="inputProperty"
                                    onChange={this.handleUserVariableChange}
                                    name={key}
                                    value={this.props.parameters.userVariables[key]}
                                />
                                <i
                                    className="far fa-trash-alt icon-btn delete"
                                    onClick={() => {
                                        this.deleteUserVariable(key);
                                    }}
                                />
                            </div>
                        ))}
                        <form onSubmit={this.addUserVariable}>
                            <div>
                                <input
                                    ref={this.keyField}
                                    type="text"
                                    onChange={this.handlePropertyChange}
                                    placeholder="key"
                                    name="key"
                                    className="inputProperty"
                                    value={this.state.newProperty.key}
                                    required
                                />
                                :
                            <input
                                    type="text"
                                    onChange={this.handlePropertyChange}
                                    placeholder="value"
                                    name="value"
                                    className="inputProperty"
                                    value={this.state.newProperty.value}
                                    required
                                />
                                <button title="Adicionar">
                                    <i className="fas fa-plus" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div>
                    <b>IA: </b>
                    <br />
                    <div className="block">
                        Score:{' '}
                        <input
                            onChange={this.handleChange}
                            type="number"
                            min="0"
                            max="100"
                            name="aiScore"
                            value={this.props.parameters.aiScore}
                        />
                    </div>
                </div>
            </Modal>
        );
    }
}

export default Config;
