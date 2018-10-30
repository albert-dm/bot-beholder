import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './BotSideBar.scss'

const mapStateToProps = state => ({
    ...state,
});

const mapDispatchToProps = dispatch => ({
});

class BotSideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCases: false
        }
    }
    render() {
        let { showNewBot, showCases } = this.state;
        return (
            <div className="BotSideBar bp-ff-nunito" style={{ padding: '5px' }}>
                <header>
                    <div class="avatar"></div>
                    <h1>Bot</h1>
                    <i className="BotSelect fas fa-angle-down"></i>
                    <div class="Bots">
                        <a>Bot 1</a>
                        <a>Bot 2</a>
                        <a>Bot 3</a>
                        <a>Bot 4</a>
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