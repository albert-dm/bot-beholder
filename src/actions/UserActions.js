import { fetchingData, fetchingDataFinished } from './CommonActions'

export const checkLoginAction = () => dispatch => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        user = { tipo: "NoUser" }
    }
    dispatch({
        type: 'CHECK_LOGIN_ACTION',
        role: user.tipo,
        data: user
    });
}

export const loginAction = (username, password) => dispatch => {
    dispatch(fetchingData());
    dispatch({
        type: 'LOGIN_ACTION',
        role: "Admin",
        data: {name: "User", role: "Admin"}
    })
    dispatch(fetchingDataFinished());
}

export const logoutAction = () => dispatch => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    dispatch({
        type: 'LOGOUT_ACTION'
    })
}