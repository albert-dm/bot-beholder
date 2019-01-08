/*

common: {
  alerts: Alert,
  isLoading: Bool
}

*/

export default (state = { isLoading: false, alerts: [], showModal: false }, action) => {
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
    case 'SHOW_MODAL': {
      return {
        ...state,
        modalTitle: action.title,
        modalContent: action.content,
        showModal: true
      }
    }
    case 'HIDE_MODAL': {
      return {
        ...state,
        modalTitle: '',
        modalContent: '',
        showModal: false
      }
    }
    default:
      return state
  }
}