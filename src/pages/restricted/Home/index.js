import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    ...state,
});

class Home extends Component {
    render() {
        const { bot } = this.props;
        return (
            <div className="bp-ff-nunito" style={{ padding: '5px' }}>
                <h1 className="bp-fs-2">Observador de bots</h1>
                <h2 className="bp-fs-4">{bot.selected ? bot.selected.name : "Selecione um bot"}</h2>
                {bot.selected ?
                    <div className="botinfo">
                        <p>Identificador: {bot.selected.shortName} </p>
                        <p>Authorization: {bot.selected.authorization} </p>
                    </div>

                    : "Para visualizar informações de algum bot, selecione o bot escolhido na lista no menu à esquerda"
                }
            </div>
        );
    }
}

export default connect(
    mapStateToProps
)(Home);
