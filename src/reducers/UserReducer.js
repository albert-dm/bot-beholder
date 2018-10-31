export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN_ACTION':
      return {
        data: action.data,
        logged: action.logged
      }
    case 'CHECK_LOGIN_ACTION':
      return {
        data: action.data,
        logged: action.logged
      }
    case 'LOGOUT_ACTION':
      return {
        data: '',
        logged: false
      }
    default:
      return state
  }
}