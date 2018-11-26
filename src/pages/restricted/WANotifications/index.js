import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectMany from '../../../components/SelectMany';

const mapStateToProps = state => ({
    ...state,
});

const mapDispatchToProps = dispatch => ({
});

class WANotifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedUsers: []
        }
    }
    render() {
        const { bot } = this.props;
        return (
            <div className="bp-ff-nunito WANotificartion" style={{ padding: '5px' }}>
                <h1>Notificações do Whatsapp</h1>
                {
                    bot.selected ?
                        <SelectMany list={bot.selected.users} onChange={selected => this.setState({ selectedUsers: selected })} displayProperty='identity' keyProperty='identity' />
                        :
                        <p>Selecione um bot</p>
                }
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(WANotifications);
