import { SET_PLAYER_NAME, SEND_ANSWER } from './actions'

export default socket => store => next => action => {
  console.log('Dispatching: ', action)

  if (action.meta && action.meta.remote) {
    if (action.type === SEND_ANSWER) {
      socket.send(JSON.stringify(['answer', action.answer]))
    } else if (action.type === SET_PLAYER_NAME) {
      socket.send(action.playerName)
    }
  }
  return next(action)
}
