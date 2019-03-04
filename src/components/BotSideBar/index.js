import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './BotSideBar.scss'
import { selectBot } from '../../actions/BotActions'
import { logoutAction } from '../../actions/UserActions'
import { selectCase, newCase } from '../../actions/TestActions'
import Icon from '../../static/img/logo.svg';

const mapStateToProps = state => ({
    ...state,
});

const mapDispatchToProps = dispatch => ({
    selectBot: (bot) => dispatch(selectBot(bot)),
    selectCase: (slug, bot) => dispatch(selectCase(slug, bot)),
    logoutAction: () => dispatch(logoutAction()),
    newCase: (cases, bot) => dispatch(newCase(cases, bot))
});

const nav = {
    textAlign: 'center',
    margin: '5px 0px'
};

const icon = {
    display: 'flex',
    justifyContent: 'center'
};

const title = {
    margin: '-20px 0px 0px 0px',
    textAlign: 'center'
};

const head = {
    marginBottom: '10px'
}

class BotSideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCases: false,
            showBots: false,
            filter: ''
        }
    }

    toggleShowCases = () => {
        this.setState((prevState) => (
            {
                showCases: !prevState.showCases
            }));
    }

    render() {
        let { showCases, showBots, filter } = this.state;
        let { logoutAction, user, bot, test, selectBot, selectCase, newCase } = this.props;
        return (
            <div className="BotSideBar bp-ff-nunito" style={{ padding: '5px' }}>
                <div style={head}>
                    <div style={icon}>
                        <Link to="/">
                            <img src={Icon} width="150px" height="150px" alt="Bot Beholder" />
                        </Link>
                    </div>
                    <h2 className="bp-c-offwhite" style={title}>
                        <Link to="/">Bot Beholder</Link>
                    </h2>
                    <div style={nav} className="bp-c-offwhite">
                        Olá {user.data.name} (<div className="link" onClick={logoutAction}>Sair</div>)
                    </div>
                    <div className="bp-divider-h bp-divider divider bp-bg-suit"></div>
                </div>
                <header>
                    <Link to="">
                        <div className="avatar">
                            {
                                bot.selected &&
                                bot.selected.imageUri &&
                                <img alt="Bot Beholder" src={bot.selected.imageUri} width="40px" height="40px" />
                            }
                        </div>
                        <h1 onClick={() => bot.selected || this.setState((prevState) => ({ showBots: !prevState.showBots }))} title={bot.selected ? bot.selected.name : "Selecione o Bot"}>{bot.selected ? bot.selected.name : "Selecione o Bot"}</h1>
                    </Link>

                    <i className="BotSelect fas fa-sync" onClick={() => this.setState((prevState) => ({ showBots: !prevState.showBots, filter: '' }))}></i>
                    {
                        showBots &&
                        <div className="Bots" onClick={() => this.setState({ showBots: false })}>
                            <div className="navItem search" onClick={(e) => e.stopPropagation()}>
                                <input
                                    type="text"
                                    placeholder="Filtro"
                                    onChange={(e) => {
                                        let value = e.target.value;
                                        this.setState({ filter: value })
                                    }}
                                />
                            </div>
                            {
                                bot.list
                                    .filter(bot => bot.name.toLowerCase().includes(filter.toLowerCase()))
                                    .sort((bot1, bot2) => (bot1.name > bot2.name) ? 1 : ((bot2.name > bot1.name) ? -1 : 0))
                                    .map(bot => <div className="navItem" key={bot.id} onClick={() => selectBot(bot)}>{bot.name}</div>)
                            }
                        </div>
                    }
                </header>
                {
                    bot.selected &&
                    <React.Fragment>
                        <Link to="/tracing">Tracing</Link>
                        {
                            test.cases &&
                            <React.Fragment>
                                <div className="navItem">
                                    <Link to="/testing" onClick={this.toggleShowCases}>Testes
                                        <i className={`BotSelect fas fa-angle-${showCases ? 'up' : 'down'}`}></i>
                                    </Link>
                                </div>
                                {
                                    showCases &&
                                    <div className="UseCases">
                                        {
                                            Object.keys(test.cases).map((useCaseId) => <Link to="/testing/edit" key={useCaseId} onClick={() => selectCase(useCaseId, bot.selected)}>{test.cases[useCaseId]}</Link>)
                                        }
                                        <div className="navItem" onClick={() => newCase(test.cases, bot.selected)} ><i className="fas fa-plus-circle"></i> Novo</div>
                                    </div>
                                }
                            </React.Fragment>
                        }


                        {
                            /* bot.selected.users.filter(user => user.source === "WhatsApp").length > 0 && */
                            <Link to="/wanotifications">Notificações whatsapp</Link>
                        }
                    </React.Fragment>
                }
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BotSideBar);