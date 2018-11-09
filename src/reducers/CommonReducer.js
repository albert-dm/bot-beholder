/*

common: {
  alerts: Alert,
  isLoading: Bool
}

*/

export default (state = {isLoading: false, alerts: []}, action) => {
    switch (action.type) {
      case 'LOADING_ACTION':
        return {
          ...state,
          isLoading: action.isLoading
        }
      case 'ALERT':
        return {
          alerts: [...state.alerts, action.alert]
        }
      default:
        return state
    }
  }