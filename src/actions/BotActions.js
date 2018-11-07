import { fetchingData, fetchingDataFinished, alert } from './CommonActions'
import { loadBots, loadBotInfo } from '../services/BotService'
import { getEntities, getIntents } from '../services/AiService'

export const loadList = () => dispatch => {
    dispatch(fetchingData());
    let token = JSON.parse(localStorage.getItem("token"));
    loadBots(token)
        .then(data => {
            dispatch({
                type: 'LOAD_LIST',
                data
            });
            dispatch(fetchingDataFinished());
        })
        .catch(err => {
            dispatch(fetchingDataFinished());
            dispatch(alert('Falha ao carregar bots', 'error'));
        });
}

export const selectBot = (bot) => dispatch => {
    dispatch(fetchingData());
    let token = JSON.parse(localStorage.getItem("token"));
    loadBotInfo(token, bot.shortName).then(
        (data) => {
            bot.key = data.accessKey;
            bot.authorization = btoa(`${bot.shortName}:${atob(bot.key)}`);
            getEntities(bot.authorization).then(
                (data) => {
                    if(data.status === "success"){
                        bot.entities = data.resource.items;
                    }
                    getIntents(bot.authorization).then(
                        (data) => {
                            if(data.status === "success"){
                                bot.intents = data.resource.items;
                            }
                            dispatch({
                                type: 'SELECT_BOT',
                                bot
                            });
                        }
                    ).catch(err => {
                        dispatch(fetchingDataFinished());
                        dispatch(alert('Falha ao carregar intenções do bot', 'error'));
                    });
                }
            ).catch(err => {
                dispatch(fetchingDataFinished());
                dispatch(alert('Falha ao carregar entidades do bot', 'error'));
            });
        }
    ).catch(err => {
        dispatch(fetchingDataFinished());
        dispatch(alert('Falha ao carregar info do bot', 'error'));
    });
}