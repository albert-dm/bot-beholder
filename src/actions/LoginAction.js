export const loginAction = role => dispatch => {
    localStorage.setItem('role', role);
    dispatch({
        type: 'LOGIN_ACTION',
        payload: role,
    });
};
