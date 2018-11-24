import React, { Component } from 'react';
import { connect } from 'react-redux';
import config from '../../../config';
import './SelectMany.scss';
import Select from '../../../components/Select';

const mapStateToProps = state => ({
    ...state,
});

const mapDispatchToProps = dispatch => ({
});

const Chip = (props) => {
    let { children, remove } = props;
    return <span className='chip'>{children}<i onClick={remove} class="fas fa-times-circle"></i></span>
}

class WANotifications extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedUsers: []
        }
        this.addUser.bind(this);
    }
    addUser = user => {
        this.setState( prevState => {
            return {selectedUsers: [...prevState.selectedUsers, user]};
        })
    }
    render() {
        const { bot } = this.props;
        let { selectedUsers } = this.state;
        return (
            <div className="bp-ff-nunito WANotificartion" style={{ padding: '5px' }}>
                <h1>Notificações do Whatsapp</h1>
                {
                    bot.selected ?
                    <div className="SelectMany">
                        <span>{selectedUsers.length>0 ? selectedUsers.map(user => <Chip key={user.identity} remove={() => console.log(user.identity)} >{user.identity}</Chip>) : 'Selecione'}</span>
                        <Select list={bot.selected.users} onChange={(user) => {this.addUser(user)}} displayProperty='identity' keyProperty='identity' />
                    </div>
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
