import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './BotSideBar.scss'
import { selectBot } from '../../actions/BotActions'

const mapStateToProps = state => ({
    ...state,
});

const mapDispatchToProps = dispatch => ({
    selectBot: (bot) => dispatch(selectBot(bot))
});

class BotSideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCases: false
        }
    }
    render() {
        let {  showCases } = this.state;
        let { bot, selectBot } = this.props;
        return (
            <div className="BotSideBar bp-ff-nunito" style={{ padding: '5px' }}>
                <header>
                    <div class="avatar">
                        {
                            bot.selected &&
                            bot.selected.imageUri &&
                            <img src={bot.selected.imageUri} width="40px" height="40px" />
                        }
                    </div>
                    <h1 title={bot.selected ? bot.selected.name : "Selecione o Bot"}>{bot.selected ? bot.selected.name : "Selecione o Bot"}</h1>
                    <i className="BotSelect fas fa-angle-down"></i>
                    <div class="Bots">
                        {
                            bot.list.map(bot => <a key={bot.id} onClick={() => selectBot(bot)}>{bot.name}</a>)
                        }
                    </div>
                </header>
                <Link to="">Tracing</Link>
                <a onClick={() => this.setState((prevState) => ({ showCases: !prevState.showCases }))}>
                    Casos de uso
                    {showCases ?
                    <i className="BotSelect fas fa-angle-up"></i>
                    :
                    <i className="BotSelect fas fa-angle-down"></i>
                    }
                </a>
                {
                    showCases &&
                    <div className="UseCases">
                        <Link to="">Case 1</Link>
                        <Link to="">Case 2</Link>
                        <Link to="">Case 3</Link>
                        <Link to="">Case 4</Link>
                        <a><i class="fas fa-plus-circle"></i> Novo</a>
                    </div>
                }
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BotSideBar);