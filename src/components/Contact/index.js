import React, { Component } from 'react';
import { SendNotification, ContextVariables, VariableValue } from '../../services/ContactService';
import { connect } from 'react-redux';
import './Contact.scss';

import { showModal } from '../../actions/CommonActions';

import ReactJson from 'react-json-view';

const mapStateToProps = state => ({
    ...state,
});

const mapDispatchToProps = dispatch => ({
    showModal: (title, content) => dispatch(showModal(title, content)),
});

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: {}
        };

        this.createModal = this.createModal.bind(this);
    }
    async componentDidMount() {
        let { id, bot } = this.props;

        let contactCommand = await SendNotification(id, bot.selected);

        this.setState({
            contact: contactCommand.resource
        });
    }

    async fetchVariableValue(key) {
        let { id, bot } = this.props;

        let variableValueCommand = await VariableValue(id, key, bot.selected);
        this.setState({ variable: { key, value: variableValueCommand.resource } })
        this.createModal();
    }

    async createModal() {
        let { id, bot } = this.props;
        let { contact, variable } = this.state;

        let contextCommand = await ContextVariables(id, bot.selected);
        const context = contextCommand.resource;

        let jsonVariable = null;
        if (variable) {
            try {
                jsonVariable = JSON.parse(variable.value);
                if (typeof jsonVariable !== 'object') {
                    throw new Error("Not a json object.");
                }
            } catch {
                jsonVariable = false
            }
        }

        this.props.showModal(contact.name ? contact.name : 'Usuário',
            <>
                <ReactJson src={contact} displayDataTypes={false} />
                <ul>
                    {
                        context.items.map(i => <li className="clicable" key={i} onClick={() => this.fetchVariableValue(i)}>{i}</li>)
                    }
                </ul>
                {
                    variable && (
                        <p><strong>{variable.key}: </strong>{
                            (jsonVariable && <ReactJson src={jsonVariable} displayDataTypes={false} />) || variable.value
                        }</p>
                    )
                }
            </>
        )
    }

    render() {
        let { contact } = this.state;
        let { id } = this.props;

        return (
            <div className="Contact" onClick={this.createModal}>
                <i className="fas fa-user" />
                <p>{contact.name ? contact.name : id}</p>
            </div>
        );
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Contact);