import { fetchingData, fetchingDataFinished, alert } from './CommonActions';
import { loadCases, loadUseCase, setCases, setUseCase } from '../services/TestService';

export const loadCaseList = () => async dispatch => {
    dispatch(fetchingData());
    try {
        let botKey = localStorage.getItem('botKey');
        let data = await loadCases(botKey);
        if (data.status === 'success') {
            dispatch({
                type: 'LOAD_CASES',
                data: data.resource
            });
        } else {
            dispatch({
                type: 'LOAD_CASES',
                data: {}
            });
        }
    }
    catch (e) {
        alert("Falha ao carregar casos de uso", "error");
    }
    finally {
        dispatch(fetchingDataFinished());
    }
};

export const selectCase = useCaseId => async dispatch => {
    dispatch(fetchingData());
    try {
        let botKey = localStorage.getItem('botKey');
        let data = await loadUseCase(botKey, useCaseId);
        let useCase = data.resource;
        dispatch({
            type: 'SELECT_CASE',
            id: useCaseId,
            case: useCase
        });
    }
    catch (e) {
        alert('Falha ao carregar caso de uso', 'error');
    }
    finally {
        dispatch(fetchingDataFinished());
    }
}

export const newCase = (cases) => async dispatch => {
    dispatch(fetchingData());
    try {
        let botKey = localStorage.getItem('botKey');
        let useCaseId = new Date().getTime();
        cases[useCaseId] = "Novo caso de uso";
        let useCase = {
            id: useCaseId,
            flowTitle: "Novo caso de uso",
            setUp: '[]',
            userVariables: {},
            blocks: [],
            selected: '',
            showModal: true,
            aiScore: 6,
            error: '',
        }
        await setCases(botKey, cases);
        await setUseCase(botKey, useCase);
        dispatch({
            type: 'NEW_CASE',
            cases,
            useCase
        })
    }
    catch (e) {
        alert('Falha ao criar caso de uso', 'error');
    }
    finally {
        dispatch(fetchingDataFinished());
    }
}

export const saveCase = (useCase, cases) => async dispatch => {
    dispatch(fetchingData());
    try {
        let botKey = localStorage.getItem('botKey');
        let botId = useCase.id;
        if (cases[botId] !== useCase.flowTitle) {
            cases[botId] = useCase.flowTitle;
            await setCases(botKey, cases);
        }
        await setUseCase(botKey, useCase);
    }
    catch (e) {
        alert('Falha ao salvar caso de uso', 'error');
    }
    finally {
        dispatch(fetchingDataFinished());
    }
}