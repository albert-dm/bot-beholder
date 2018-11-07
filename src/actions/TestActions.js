import { fetchingData, fetchingDataFinished, alert } from './CommonActions';

export const loadCaseList = () => dispatch => {
    /* dispatch(fetchingData());
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
    }); */
    let data = {
        teste: "Teste 1",
        teste2: "Teste 2"
    }
    dispatch({
        type: 'LOAD_CASES',
        data
    });
};

export const selectCase = slug => dispatch => {
    let useCase = 
    slug == 'teste' ?
    {
        flowTitle: 'teste',
        botIdentity: '',
        botKey: '',
        setUp: '[]',
        userVariables: {},
        blocks: [],
        selected: '',
        showModal: true,
        intents: [],
        entities: [],
        aiScore: 6,
        error: '',
    }
    :
    {
        flowTitle: 'teste2',
        botIdentity: '',
        botKey: '',
        setUp: '[]',
        userVariables: {},
        blocks: [],
        selected: '',
        showModal: true,
        intents: [],
        entities: [],
        aiScore: 6,
        error: '',
    }
    ;
    dispatch({
        type: 'SELECT_CASE',
        slug,
        case: useCase
    });
}