import React, { Component } from 'react'
import Modal from "../Modal/" 
import { getIntents, getEntities } from  "../../services/AiService"

class Config extends Component {
    constructor() {
        super();
        this.state = {
            botIdentity: false,
            botKey: false,
            newProperty: {
                key: "",
                value: ""
            }
        }
        this.keyField = React.createRef();
    }
    checkErrors = () => {
        this.setState({
            botIdentity: !this.props.parameters.botIdentity,
            botKey: !this.props.parameters.botKey
        })
    }
    close = () => {
        if (!this.props.close()) {
            this.checkErrors();
        }
    }
    handleChange = e => {
        const { name, value, required } = e.target;
        this.props.setConfig(name, value);
        if (required) {
            this.setState({
                [name]: !value
            })
        }
    }
    handlePropertyChange = e => {
        const { name, value } = e.target;
        let newProperty = { ...this.state.newProperty };
        newProperty[name] = value;
        this.setState({
            newProperty
        });
    }
    addUserVariable = e => {
        e.preventDefault();
        let newUserVariables = { ...this.props.parameters.userVariables }
        newUserVariables[this.state.newProperty.key] = this.state.newProperty.value;
        this.props.setConfig("userVariables", newUserVariables);
        this.setState({
            newProperty: {
                key: "",
                value: ""
            }
        });
        this.keyField.current.focus();
    }
    deleteUserVariable = (key) => {
        let newUserVariables = { ...this.props.parameters.userVariables }
        delete newUserVariables[key];
        this.props.setConfig("userVariables", newUserVariables);
        this.setState({
            newProperty: {
                key: "",
                value: ""
            }
        });
        
    }
    handleUserVariableChange = e => {
        const { name, value } = e.target;
        let newUserVariables = { ...this.props.parameters.userVariables }
        newUserVariables[name] = value;
        this.props.setConfig("userVariables", newUserVariables);
    }

    loadAiIntents = () => {
        getIntents(this.props.parameters.botKey)
        .then(response => response.json())
        .then(data => {
            this.props.setConfig("intents", data.resource.items);
        })
        .catch(err => ({
                msg: "Falha ao obter intenções",
                error: err
            })
        );
    } 
    loadAiEntities = () => {
        getEntities(this.props.parameters.botKey)
        .then(response => response.json())
        .then(data => {
            this.props.setConfig("entities", data.resource.items);
        })
        .catch(err => ({
                msg: "Falha ao obter entidades",
                error: err
            })
        );
    }
    loadAi = () => {
        this.loadAiEntities();
        this.loadAiIntents();
    } 
    render() {
        return (
            <Modal title="Configurações" show={this.props.show} close={this.close}>
                <div><label><b>Bot Identity: *</b></label>
                    <input onChange={this.handleChange} type="text" name="botIdentity" value={this.props.parameters.botIdentity} required />
                    {
                        this.state.botIdentity &&
                        <span className="error"> <br /> Campo obrigatório </span>
                    }
                </div>
                <br />
                <div><label><b>Bot Key: *</b></label>
                    <input onChange={this.handleChange} type="text" name="botKey" value={this.props.parameters.botKey} required />
                    {
                        this.state.botKey &&
                        <span className="error"> <br /> Campo obrigatório </span>
                    }
                </div>
                <br />
                <div><label><b>Set up:</b></label> <br />
                    <textarea onChange={this.handleChange} type="text" name="setUp" value={this.props.parameters.setUp} rows="5" />
                </div>
                <br />
                <div><b>User Variables: </b><br />
                    <div className="block">
                        {
                            Object.keys(this.props.parameters.userVariables).map((key, index) =>
                                <div key={index}>
                                    <b>{key}:</b>
                                    <input type="text" className="inputProperty" onChange={this.handleUserVariableChange} name={key} value={this.props.parameters.userVariables[key]} />
                                    <i className="far fa-trash-alt icon-btn delete" onClick={() => { this.deleteUserVariable(key) }}></i>
                                </div>
                            )
                        }
                        <form onSubmit={this.addUserVariable}>
                            <div>
                                <input ref={this.keyField} type="text" onChange={this.handlePropertyChange} placeholder="key" name="key" className="inputProperty" value={this.state.newProperty.key} required />:
                                <input type="text" onChange={this.handlePropertyChange} placeholder="value" name="value" className="inputProperty" value={this.state.newProperty.value} required />
                                <button title="Adicionar"><i className="fas fa-plus"></i></button>
                            </div>
                        </form>
                    </div>
                </div>
                    { this.props.parameters.botKey && <button className="right" onClick={this.loadAi}>Carregar IA</button> }
                <div><b>IA: </b><br />
                    <div className="block">
                        Score: <input onChange={this.handleChange} type="number" min="0" max="100" name="aiScore" value={this.props.parameters.aiScore} />
                        {this.props.parameters.intents.length>0 && <ul>
                            <b>Intenções:</b>
                            { this.props.parameters.intents.map( (intent, index) =>
                                <li key={index}>{intent.name}</li>
                            ) }
                        </ul>}
                        {this.props.parameters.entities.length>0 && <ul>
                            <b>Entidades: </b>
                            { this.props.parameters.entities.map( (entity, index) =>
                                <li key={index}>{entity.name}: {entity.values.reduce( (acc, value) => {acc.push(value.name); return acc}, []).join(", ")} </li>
                            ) }
                        </ul>}
                        {this.props.parameters.intents.length === 0 && this.props.parameters.entities.length === 0 && this.props.parameters.botKey &&
                            <p>Clique em "Carregar IA" para carregar as intenções e entidades existentes no bot</p>
                        }
                    </div>
                </div>
            </Modal>
        )
    }
}

export default Config