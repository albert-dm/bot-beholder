import React, { Component } from 'react';
import { SendNotification } from '../../services/ContactService';
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
    }
    async componentDidMount() {
        let { id } = this.props;
        let res = await SendNotification(id);
        let contact = res.resource;
        console.log(contact);
        this.setState({ contact });
    }
    render() {
        let { id, showModal } = this.props;
        let { contact } = this.state;
        return (
            <div className="Contact" onClick={() => showModal(contact.name ? contact.name : 'Usuário', <ReactJson src={contact} displayDataTypes={false} />)}>
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