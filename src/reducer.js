import { Map, List, fromJS } from 'immutable'
import * as actions from './actions'

const currentAlbum = function (state = Map(), action) {
  if (action.type === actions.SET_CURRENT_ALBUM) {
    return state.merge(action.album)
  }
  return state
}

const messages = function (state = List(), action) {
  if (action.type === actions.SET_GAME_STATUS && action.gameStatus == 'start_game') {
    return List()
  } else if (action.type === actions.SET_MESSAGES) {
    return state.update(action.messages)
  } else if (action.type === actions.UPDATE_MESSAGES) {
    return state.push(action.messages)
  }
  return state
}

const playerName = function (state = '', action) {
  if (action.type === actions.SET_PLAYER_NAME) {
    return action.playerName
  }
  return state
}

const gameStatus = function (state = '', action) {
  if (action.type === actions.SET_GAME_STATUS) {
    return action.gameStatus
  }
  return state
}

const scores = function (state = List(), action) {
  if (action.type === actions.SET_SCORES) {
    return fromJS(action.data)
  }
  return state
}

const reducer = function (state = Map(), action) {
  return state
    .set('playerName', playerName(state.get('playerName'), action))
    .set('gameStatus', gameStatus(state.get('gameStatus'), action))
    .set('currentAlbum', currentAlbum(state.get('currentAlbum'), action))
    .set('messages', messages(state.get('messages'), action))
    .set('scores', scores(state.get('scores'), action))
}

export default reducer
