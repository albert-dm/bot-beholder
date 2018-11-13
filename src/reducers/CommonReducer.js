/*

common: {
  alerts: Alert,
  isLoading: Bool
}

*/

export default (state = { isLoading: false, alerts: [] }, action) => {
  switch (action.type) {
    case 'LOADING_ACTION':
      return {
        ...state,
        isLoading: action.isLoading
      }
    case 'ALERT':
      return {
        ...state,
        alerts: [...state.alerts, action.alert]
      }
    case 'POP_ALERT': {
      let alert = state.alerts.pop();
      return {
        ...state,
        alerts: [...state.alerts],
        alert
      }
    }
    default:
      return state
  }
}