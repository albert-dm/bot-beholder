import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './BotSideBar.scss'
import { selectBot } from '../../actions/BotActions'
import { selectCase, newCase } from '../../actions/TestActions'

const mapStateToProps = state => ({
    ...state,
});

const mapDispatchToProps = dispatch => ({
    selectBot: (bot) => dispatch(selectBot(bot)),
    selectCase: (slug) => dispatch(selectCase(slug)),
    newCase: (cases) => dispatch(newCase(cases))
});

class BotSideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCases: false,
            showBots: false
        }
    }
    render() {
        let { showCases, showBots } = this.state;
        let { bot, test, selectBot, selectCase, newCase } = this.props;
        return (
            <div className="BotSideBar bp-ff-nunito" style={{ padding: '5px' }}>
                <header>
                    <Link to="">
                        <div className="avatar">
                            {
                                bot.selected &&
                                bot.selected.imageUri &&
                                <img alt="Bot Beholder" src={bot.selected.imageUri} width="40px" height="40px" />
                            }
                        </div>
                        <h1 title={bot.selected ? bot.selected.name : "Selecione o Bot"}>{bot.selected ? bot.selected.name : "Selecione o Bot"}</h1>
                    </Link>

                    <i className="BotSelect fas fa-sync" onClick={() => this.setState((prevState) => ({ showBots: !prevState.showBots }))}></i>
                    {
                        showBots &&
                        <div className="Bots" onClick={() => this.setState({ showBots: false })}>
                            {
                                bot.list.map(bot => <div className="navItem" key={bot.id} onClick={() => selectBot(bot)}>{bot.name}</div>)
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
                                <div className="navItem" onClick={() => this.setState((prevState) => ({ showCases: !prevState.showCases }))}>
                                    Testes
                                    {
                                        showCases ?
                                            <i className="BotSelect fas fa-angle-up"></i>
                                            :
                                            <i className="BotSelect fas fa-angle-down"></i>
                                    }
                                </div>
                                {
                                    showCases &&
                                    <div className="UseCases">
                                        {
                                            Object.keys(test.cases).map((useCaseId) => <Link to="/testing" key={useCaseId} onClick={() => selectCase(useCaseId)}>{test.cases[useCaseId]}</Link>)
                                        }
                                        <div className="navItem" onClick={() => newCase(test.cases)} ><i className="fas fa-plus-circle"></i> Novo</div>
                                    </div>
                                }
                            </React.Fragment>
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