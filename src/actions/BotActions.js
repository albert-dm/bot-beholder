import { fetchingData, fetchingDataFinished, alert } from './CommonActions'
import { loadBots } from '../services/BotService'

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
    dispatch({
        type: 'SELECT_BOT',
        bot
    });
}