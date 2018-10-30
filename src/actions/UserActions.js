import { fetchingData, fetchingDataFinished } from './CommonActions'

export const checkLoginAction = () => dispatch => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        user = { role: "NoUser" }
    }
    dispatch({
        type: 'CHECK_LOGIN_ACTION',
        role: user.role,
        data: user
    });
}

export const loginAction = (username, password) => dispatch => {
    dispatch(fetchingData());
    let user = {name: "User", role: "Admin"};
    dispatch({
        type: 'LOGIN_ACTION',
        role: user.role,
        data: user
    });
    localStorage.setItem("user", JSON.stringify(user));
    dispatch(fetchingDataFinished());
}

export const logoutAction = () => dispatch => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    dispatch({
        type: 'LOGOUT_ACTION'
    })
}