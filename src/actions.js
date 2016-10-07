export const SET_PLAYER_NAME = 'SET_PLAYER_NAME'
export function setPlayerName (playerName) {
  return { type: SET_PLAYER_NAME, meta: { remote: true }, playerName }
}

export const SET_GAME_STATUS = 'SET_GAME_STATUS'
export function setGameStatus (gameStatus) {
  return { type: SET_GAME_STATUS, gameStatus }
}

export const SET_CURRENT_ALBUM = 'SET_CURRENT_ALBUM'
export function setCurrentAlbum (album) {
  return { type: SET_CURRENT_ALBUM, album }
}

export const SET_MESSAGES = 'SET_MESSAGES'
export function setMessages (messages) {
  return { type: SET_MESSAGES, messages }
}

export const UPDATE_MESSAGES = 'UPDATE_MESSAGES'
export function updateMessages (messages) {
  return { type: UPDATE_MESSAGES, messages }
}

export const START_GAME = 'START_GAME'
export function startGame (data) {
  return { type: START_GAME, data }
}

export const END_GAME = 'END_GAME'
export function endGame (data) {
  return { type: END_GAME, data }
}

export const START_ROUND = 'START_ROUND'
export function startRound (data) {
  return { type: START_ROUND, data }
}

export const END_ROUND = 'END_ROUND'
export function endRound (data) {
  return { type: END_ROUND, data }
}

export const SET_SCORES = 'SET_SCORES'
export function setScores (data) {
  return { type: SET_SCORES, data }
}

export const SEND_ANSWER = 'SEND_ANSWER'
export function sendAnswer (answer) {
  return { type: SEND_ANSWER, meta: { remote: true }, answer }
}
