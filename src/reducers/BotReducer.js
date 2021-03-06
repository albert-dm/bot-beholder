/*

bot: {
  selected: Bot,
  list: [Bot]
}

*/

export default (state = { }, action) => {
  switch (action.type) {
    case 'LOAD_LIST':
      return {
        ...state,
        list: action.data
      }
    case 'SELECT_BOT':
      return {
        ...state,
        selected: action.bot
      }
    default:
      return state
  }
}