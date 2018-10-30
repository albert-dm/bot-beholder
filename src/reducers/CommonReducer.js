export default (state = {isLoading: false, alert: []}, action) => {
    switch (action.type) {
      case 'LOADING_ACTION':
        return {
          isLoading: action.isLoading
        }
      case 'ALERT':
        return {
          alerts: [...alert, action.alert]
        }
      default:
        return state
    }
  }