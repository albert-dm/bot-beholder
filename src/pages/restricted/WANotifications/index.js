import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectMany from '../../../components/SelectMany';
import Modal from '../../../components/Modal';
import { buildWANotification } from '../../../helpers/notificationHelper'
import { sendNotifications } from '../../../actions/WANotificationsActions'
import { getIdentifier } from '../../../services/WANotificationsService'

import './WANotifications.scss'

const mapStateToProps = state => ({
    ...state,
});

const mapDispatchToProps = dispatch => ({
    send: (notifications, botKey) => dispatch(sendNotifications(notifications, botKey))
});

class WANotifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddPhone: false,
            phoneNumber: '',
            foundIdentity: null,
            outerNumbers: [],
            selectedUsers: [],
            template: '',
            params: []
        }
    }
    sendNotifications = (e) => {
        e.preventDefault();
        let { params, template, selectedUsers } = this.state;
        if (selectedUsers.length === 0) {
            alert('Selecione ao menos um usuário');
            return;
        }
        let notifications = selectedUsers.map(user => buildWANotification(user, template, params));
        this.props.send(notifications, this.props.bot.selected.authorization);
    }
    changeParam = (idx, value) => {
        this.setState(
            prevState => {
                let params = prevState.params;
                params[idx] = value;
                return { params };
            }
        )
    }
    removeParam = (idx) => {
        this.setState(
            prevState => {
                let params = prevState.params;
                params.splice(idx, 1);
                return { params };
            }
        )
    }

    findIdentity = async (phone) => {
        let response = await getIdentifier(phone, this.props.bot.selected.authorization);
        if (response.status === "success") {
            console.log(response);
            this.setState({ foundIdentity: response.resource.alternativeAccount });
        }
        else {
            alert('Não foi possível encontrar o número!');
        }
    }

    addOuterUser = (identity) => {
        let user = {
            identity,
            outer: true
        }
        console.log(user);
        this.setState((prevState) => ({ outerNumbers: [...prevState.outerNumbers, user] }))
    }
    render() {
        let { template, params, showAddPhone, phoneNumber, foundIdentity, outerNumbers } = this.state;
        const { bot, WANotifications } = this.props;
        return (
            <div className="bp-ff-nunito WANotificartion" style={{ padding: '5px' }}>
                <h1>Notificações do Whatsapp</h1>
                {
                    bot.selected ?
                        <form onSubmit={this.sendNotifications}>
                            <SelectMany
                                label="Usuários a serem notificados"
                                list={bot.selected.users.filter(user => user.source === "WhatsApp").concat(outerNumbers)}
                                onChange={selected => this.setState({ selectedUsers: selected })}
                                customButtons={[
                                    <button key="addOuterNumber" type="button" onClick={() => this.setState({ showAddPhone: true, foundIdentity: null })}><i className="fas fa-plus-circle" /> Telefone</button>
                                ]}
                                displayProperty='identity'
                                keyProperty='identity'
                            />
                            <div className="textField">
                                <label htmlFor="template">Template</label>
                                <input
                                    type="text"
                                    placeholder="Nome do template"
                                    onChange={(e) => this.setState({ template: e.target.value })}
                                    value={template}
                                    required />
                            </div>

                            <div className="params">
                                <p className="label">Parâmetros</p>
                                {
                                    params.map(
                                        (param, idx) =>
                                            <div className="item textField" key={idx}>
                                                <label>Parâmetro {idx + 1}:</label>
                                                <input
                                                    type="text"
                                                    placeholder="Valor"
                                                    value={param}
                                                    onChange={(e) => this.changeParam(idx, e.target.value)}
                                                    required
                                                />
                                                <i
                                                    onClick={() => this.removeParam(idx)}
                                                    className="fas fa-times-circle clicable"
                                                ></i>
                                            </div>
                                    )
                                }
                                <button
                                    type="button"
                                    onClick={() => this.setState(prevState => ({ params: [...prevState.params, ''] }))}
                                >
                                    Adicionar parâmetro
                                </button>
                            </div>
                            <button type='submit' disabled={WANotifications.sending}>{WANotifications.sending ? 'Enviando...' : 'Enviar notificações'}</button>
                            {
                                WANotifications.sending &&
                                <div className="progress">
                                    <div className="bar" style={{ width: `${(eval(WANotifications.status) * 100)}%` }}></div>
                                    <span className="label">{WANotifications.status}</span>
                                </div>
                            }
                        </form>
                        :
                        <p>Selecione um bot</p>
                }
                <Modal title="Obter identificador do número" show={showAddPhone} close={() => this.setState({ showAddPhone: false })}>
                    <div className="textField">
                        <label>Telefone</label>
                        <input
                            type="text"
                            placeholder="(XX) XXXXX-XXXX"
                            onChange={(e) => this.setState({ phoneNumber: e.target.value })}
                            value={phoneNumber}
                            required />
                    </div>
                    {
                        foundIdentity ?
                            <React.Fragment>
                                <h1>Identificador: {foundIdentity}</h1>
                                <button type='button' onClick={() => { this.addOuterUser(foundIdentity) }}>Adicionar</button>
                                <button type='button' onClick={() => { this.setState({ foundIdentity: null, phoneNumber: '' }) }}>Outro número</button>
                            </React.Fragment>

                            :
                            <button type='button' onClick={() => this.findIdentity(phoneNumber)} disabled={phoneNumber === ''}>Obter identificador</button>
                    }
                </Modal>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(WANotifications);
