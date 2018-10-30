export const checkLoginAction = () => dispatch => {
    let role = localStorage.getItem('role') || 'NoUser';
    dispatch({
        type: 'CHECK_LOGIN_ACTION',
        payload: role,
    });
};
