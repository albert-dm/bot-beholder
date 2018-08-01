export default (state = {}, action) => {
    switch (action.type) {
      case 'LOGIN_ACTION':
        return {
          UserRole: action.payload
        }
      case 'CHECK_LOGIN_ACTION':
        return {
          UserRole: action.payload
        }
      default:
        return state
    }
  }