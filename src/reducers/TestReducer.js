/*

test: {
  cases: {case_slug: Case},
  selectedCase: case_slug
}

*/

export default (state = { queue: [], testing: false, log: {} }, action) => {
  let cases = state.cases;
  switch (action.type) {
    case 'LOAD_CASES':
      return {
        ...state,
        cases: action.data
      }
    case 'SET_CASE':
      cases[action.slug] = action.data;
      return {
        ...state,
        cases
      }
    case 'DELETE_CASE':
      delete cases[action.slug];
      return {
        ...state,
        cases
      }
    case 'SELECT_CASE':
      return {
        ...state,
        selectedId: action.id,
        selectedCase: action.case
      }
    case 'NEW_CASE':
      return {
        ...state,
        cases: action.cases,
        selectedId: action.useCase.id,
        selectedCase: action.useCase
      }
    case 'ADD_TO_QUEUE':
      return {
        ...state,
        queue: [...state.queue, action.testCaseId]
      }
    case 'REMOVE_FROM_QUEUE':
      let idx = state.queue.indexOf(action.testCaseId);
      state.queue.splice(idx, 1);
      return {
        ...state
      }
    case 'SET_QUEUE':
      return {
        ...state,
        queue: action.queue
      }
    case 'SET_LOG':
      state.log[action.testCaseId] = action.log;
      return {
        ...state
      }
    case 'START_TESTING':
      return {
        ...state,
        testing: true
      }
    case 'STOP_TESTING':
      return {
        ...state,
        testing: false
      }
    default:
      return state
  }
}