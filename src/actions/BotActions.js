import { fetchingData, fetchingDataFinished, alert } from './CommonActions'
import { loadCaseList } from './TestActions';
import { loadBots, loadBotInfo, loadBotUsers } from '../services/BotService'
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

export const selectBot = (bot) => async dispatch => {
    dispatch(fetchingData());
    let token = JSON.parse(localStorage.getItem("token"));
    let botInfo = await loadBotInfo(token, bot.shortName);
    bot.key = botInfo.accessKey;
    bot.authorization = btoa(`${bot.shortName}:${atob(bot.key)}`);
    localStorage.setItem('botKey', bot.authorization);
    try {
        let entities = await getEntities(bot.authorization);
        if (entities.status === "success") {
            bot.entities = entities.resource.items;
        } else {
            bot.entities = [];
        }
        let intents = await getIntents(bot.authorization);
        if (intents.status === "success") {
            bot.intents = intents.resource.items;
        } else {
            bot.intents = [];
        }
        let users = await loadBotUsers(bot.authorization);
        if (users.status === "success") {
            bot.users = users.resource.items;
        } else {
            bot.users = [];
        }
        dispatch(loadCaseList(bot.authorization));
        dispatch({
            type: 'SELECT_BOT',
            bot
        });
    } catch (err) {
        dispatch(fetchingDataFinished());
        dispatch(alert('Falha ao carregar info do bot', 'error'));
    }
}