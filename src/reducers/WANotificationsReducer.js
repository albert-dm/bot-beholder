/*

user: {
  sending: Bool,
  status: String
}

*/

export default (state = {}, action) => {
    switch (action.type) {
        case 'SENDING_NOTIFICATION':
            return {
                sending: action.sending,
                status: `${action.current}/${action.total}`
            }
        default:
            return state
    }
}