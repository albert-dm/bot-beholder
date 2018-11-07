import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './BotSideBar.scss'
import { selectBot } from '../../actions/BotActions'
import { selectCase } from '../../actions/TestActions'

const mapStateToProps = state => ({
    ...state,
});

const mapDispatchToProps = dispatch => ({
    selectBot: (bot) => dispatch(selectBot(bot)),
    selectCase: (slug) => dispatch(selectCase(slug))
});

class BotSideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCases: false
        }
    }
    render() {
        let { showCases } = this.state;
        let { bot, test, selectBot, selectCase } = this.props;
        return (
            <div className="BotSideBar bp-ff-nunito" style={{ padding: '5px' }}>
                <header>
                    <div class="avatar">
                        {
                            bot.selected &&
                            bot.selected.imageUri &&
                            <img alt="Bot Beholder" src={bot.selected.imageUri} width="40px" height="40px" />
                        }
                    </div>
                    <h1 title={bot.selected ? bot.selected.name : "Selecione o Bot"}>{bot.selected ? bot.selected.name : "Selecione o Bot"}</h1>
                    <i className="BotSelect fas fa-angle-down"></i>
                    {
                        bot.list &&
                        <div class="Bots">
                            {
                                bot.list.map(bot => <div className="navItem" key={bot.id} onClick={() => selectBot(bot)}>{bot.name}</div>)
                            }
                        </div>
                    }
                </header>
                <Link to="/tracing">Tracing</Link>
                <div className="navItem" onClick={() => this.setState((prevState) => ({ showCases: !prevState.showCases }))}>
                    Casos de uso
                    {showCases ?
                        <i className="BotSelect fas fa-angle-up"></i>
                        :
                        <i className="BotSelect fas fa-angle-down"></i>
                    }
                </div>
                {
                    showCases &&
                    <div className="UseCases">
                        {
                            Object.keys(test.cases).map((slug) => <Link to="/testing" key={slug} onClick={() => selectCase(slug)}>{test.cases[slug]}</Link>)
                        }
                        <div className="navItem" ><i class="fas fa-plus-circle"></i> Novo</div>
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