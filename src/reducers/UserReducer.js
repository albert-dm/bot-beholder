export default (state = {role: "Admin"}, action) => {
  switch (action.type) {
    case 'LOGIN_ACTION':
      return {
        role: action.role,
        data: action.data
      }
    case 'CHECK_LOGIN_ACTION':
      return {
        role: action.role,
        data: action.data
      }
    case 'LOGOUT_ACTION':
      return {
        role: 'NoUser',
        data: ''
      }
    default:
      return state
  }
}