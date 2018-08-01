export const loginAction = (role) => dispatch => {
    dispatch({
        type: 'LOGIN_ACTION',
        payload: role
    })
}