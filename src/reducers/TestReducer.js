/*

test: {
  cases: {case_slug: Case},
  selectedCase: case_slug
}

*/

export default (state = {}, action) => {
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
        selectedSlug: action.slug,
        selectedCase: action.case
      }
    default:
      return state
  }
}